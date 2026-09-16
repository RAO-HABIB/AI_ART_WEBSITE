package handlers

import (
	"ai-art-backend/config"
	"ai-art-backend/database"
	"ai-art-backend/models"
	"ai-art-backend/utils"
	"encoding/json"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
	githuboauth "golang.org/x/oauth2/github"
	"golang.org/x/oauth2/google"
)

// ─── Google OAuth Config ───
func getGoogleConfig() *oauth2.Config {
	return &oauth2.Config{
		ClientID:     config.AppConfig.GoogleClientID,
		ClientSecret: config.AppConfig.GoogleClientSecret,
		RedirectURL:  config.AppConfig.GoogleRedirectURL,
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
		},
		Endpoint: google.Endpoint,
	}
}

// ─── GitHub OAuth Config ───
func getGithubConfig() *oauth2.Config {
	return &oauth2.Config{
		ClientID:     config.AppConfig.GithubClientID,
		ClientSecret: config.AppConfig.GithubClientSecret,
		RedirectURL:  config.AppConfig.GithubRedirectURL,
		Scopes:       []string{"user:email", "read:user"},
		Endpoint:     githuboauth.Endpoint,
	}
}

// ─── Google OAuth ───

// GET /api/auth/google
func GoogleLogin(c *gin.Context) {
	googleConfig := getGoogleConfig()
	url := googleConfig.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	c.Redirect(http.StatusTemporaryRedirect, url)
}

// GET /api/auth/google/callback
func GoogleCallback(c *gin.Context) {
	googleConfig := getGoogleConfig()
	code := c.Query("code")

	if code == "" {
		c.Redirect(http.StatusTemporaryRedirect,
			config.AppConfig.FrontendURL+"/signin?error=no_code")
		return
	}

	// Exchange code for token
	token, err := googleConfig.Exchange(c, code)
	if err != nil {
		c.Redirect(http.StatusTemporaryRedirect,
			config.AppConfig.FrontendURL+"/signin?error=exchange_failed")
		return
	}

	// Get user info from Google
	client := googleConfig.Client(c, token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		c.Redirect(http.StatusTemporaryRedirect,
			config.AppConfig.FrontendURL+"/signin?error=userinfo_failed")
		return
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	var googleUser struct {
		ID        string `json:"id"`
		Email     string `json:"email"`
		FirstName string `json:"given_name"`
		LastName  string `json:"family_name"`
		Picture   string `json:"picture"`
	}

	if err := json.Unmarshal(body, &googleUser); err != nil {
		c.Redirect(http.StatusTemporaryRedirect,
			config.AppConfig.FrontendURL+"/signin?error=parse_failed")
		return
	}

	// Find or create user
	user := findOrCreateOAuthUser(
		googleUser.Email,
		googleUser.FirstName,
		googleUser.LastName,
		googleUser.Picture,
		"google",
	)

	// Generate JWT
	jwtToken, err := utils.GenerateToken(user.ID, user.Email, user.Role)
	if err != nil {
		c.Redirect(http.StatusTemporaryRedirect,
			config.AppConfig.FrontendURL+"/signin?error=token_failed")
		return
	}

	// Set cookie
	setAuthCookie(c, jwtToken)

	// Redirect to frontend
	c.Redirect(http.StatusTemporaryRedirect,
		config.AppConfig.FrontendURL+"/?auth=success")
}

// ─── GitHub OAuth ───

// GET /api/auth/github
func GithubLogin(c *gin.Context) {
	githubConfig := getGithubConfig()
	url := githubConfig.AuthCodeURL("state-token")
	c.Redirect(http.StatusTemporaryRedirect, url)
}

// GET /api/auth/github/callback
func GithubCallback(c *gin.Context) {
	githubConfig := getGithubConfig()
	code := c.Query("code")

	if code == "" {
		c.Redirect(http.StatusTemporaryRedirect,
			config.AppConfig.FrontendURL+"/signin?error=no_code")
		return
	}

	// Exchange code for token
	token, err := githubConfig.Exchange(c, code)
	if err != nil {
		c.Redirect(http.StatusTemporaryRedirect,
			config.AppConfig.FrontendURL+"/signin?error=exchange_failed")
		return
	}

	// Get user info from GitHub
	client := githubConfig.Client(c, token)
	resp, err := client.Get("https://api.github.com/user")
	if err != nil {
		c.Redirect(http.StatusTemporaryRedirect,
			config.AppConfig.FrontendURL+"/signin?error=userinfo_failed")
		return
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	var githubUser struct {
		ID        int    `json:"id"`
		Login     string `json:"login"`
		Name      string `json:"name"`
		Email     string `json:"email"`
		AvatarURL string `json:"avatar_url"`
	}

	if err := json.Unmarshal(body, &githubUser); err != nil {
		c.Redirect(http.StatusTemporaryRedirect,
			config.AppConfig.FrontendURL+"/signin?error=parse_failed")
		return
	}

	// GitHub email private ho sakti hai — separate call
	if githubUser.Email == "" {
		emailResp, err := client.Get("https://api.github.com/user/emails")
		if err == nil {
			defer emailResp.Body.Close()
			emailBody, _ := io.ReadAll(emailResp.Body)

			var emails []struct {
				Email    string `json:"email"`
				Primary  bool   `json:"primary"`
				Verified bool   `json:"verified"`
			}

			if json.Unmarshal(emailBody, &emails) == nil {
				for _, email := range emails {
					if email.Primary && email.Verified {
						githubUser.Email = email.Email
						break
					}
				}
			}
		}
	}

	if githubUser.Email == "" {
		c.Redirect(http.StatusTemporaryRedirect,
			config.AppConfig.FrontendURL+"/signin?error=no_email")
		return
	}

	// Parse name
	firstName := githubUser.Name
	lastName := ""
	if githubUser.Name == "" {
		firstName = githubUser.Login
	}

	// Find or create user
	user := findOrCreateOAuthUser(
		githubUser.Email,
		firstName,
		lastName,
		githubUser.AvatarURL,
		"github",
	)

	// Generate JWT
	jwtToken, err := utils.GenerateToken(user.ID, user.Email, user.Role)
	if err != nil {
		c.Redirect(http.StatusTemporaryRedirect,
			config.AppConfig.FrontendURL+"/signin?error=token_failed")
		return
	}

	// Set cookie
	setAuthCookie(c, jwtToken)

	// Redirect to frontend
	c.Redirect(http.StatusTemporaryRedirect,
		config.AppConfig.FrontendURL+"/?auth=success")
}

// ─── Helper: Find or Create OAuth User ───
func findOrCreateOAuthUser(
	email, firstName, lastName, avatar, _ string,
) *models.User {
	var user models.User

	result := database.DB.Where("email = ?", email).First(&user)

	if result.Error != nil {
		// User nahi mila — naya banao
		user = models.User{
			FirstName: firstName,
			LastName:  lastName,
			Email:     email,
			Password:  "", // OAuth users ka password nahi hota
			Avatar:    avatar,
			Role:      "user",
			IsActive:  true,
		}

		database.DB.Create(&user)

		// Free subscription
		subscription := models.Subscription{
			UserID: user.ID,
			Plan:   "free",
			Status: "active",
		}
		database.DB.Create(&subscription)
	} else {
		// User exists — avatar update karo
		if avatar != "" && user.Avatar != avatar {
			database.DB.Model(&user).Update("avatar", avatar)
		}
	}

	return &user
}
