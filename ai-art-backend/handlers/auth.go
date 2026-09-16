package handlers

import (
	"ai-art-backend/config"
	"ai-art-backend/database"
	"ai-art-backend/models"
	"ai-art-backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// Cookie settings
func setAuthCookie(c *gin.Context, token string) {
	isProduction := config.AppConfig.Env == "production"

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie(
		"ai_art_token", // name
		token,          // value
		86400*7,        // maxAge (7 days)
		"/",            // path
		"",             // domain
		isProduction,   // secure (true in production)
		true,           // httpOnly (JavaScript cannot access)
	)
}

func clearAuthCookie(c *gin.Context) {
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie(
		"ai_art_token",
		"",
		-1,
		"/",
		"",
		false,
		true,
	)
}

// POST /api/auth/signup
func SignUp(c *gin.Context) {
	var req models.SignUpRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid input",
			"errors":  err.Error(),
		})
		return
	}

	// Email check
	var existingUser models.User
	if err := database.DB.Where("email = ?", req.Email).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusConflict, gin.H{
			"success": false,
			"message": "Email already registered",
		})
		return
	}

	// Password hash
	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(req.Password),
		bcrypt.DefaultCost,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to process password",
		})
		return
	}

	// Create user
	user := models.User{
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Email:     req.Email,
		Password:  string(hashedPassword),
		Role:      "user",
		IsActive:  true,
	}

	if err := database.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to create account",
		})
		return
	}

	// Free subscription
	subscription := models.Subscription{
		UserID: user.ID,
		Plan:   "free",
		Status: "active",
	}
	database.DB.Create(&subscription)

	// Generate token
	token, err := utils.GenerateToken(user.ID, user.Email, user.Role)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to generate token",
		})
		return
	}

	// Set httpOnly cookie
	setAuthCookie(c, token)

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Account created successfully",
		"data": gin.H{
			"user": user.ToResponse(),
		},
	})
}

// POST /api/auth/signin
func SignIn(c *gin.Context) {
	var req models.SignInRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid input",
			"errors":  err.Error(),
		})
		return
	}

	// Find user
	var user models.User
	if err := database.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"message": "Invalid email or password",
			})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Something went wrong",
		})
		return
	}

	if !user.IsActive {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "Account is deactivated",
		})
		return
	}

	// Verify password
	if err := bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(req.Password),
	); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"message": "Invalid email or password",
		})
		return
	}

	// Generate token
	token, err := utils.GenerateToken(user.ID, user.Email, user.Role)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to generate token",
		})
		return
	}

	// Set httpOnly cookie
	setAuthCookie(c, token)

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Signed in successfully",
		"data": gin.H{
			"user": user.ToResponse(),
		},
	})
}

// GET /api/auth/me
func GetMe(c *gin.Context) {
	userID, _ := c.Get("user_id")

	var user models.User
	if err := database.DB.Preload("Subscription").First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "User not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"user": user.ToResponse(),
		},
	})
}

// POST /api/auth/signout
func SignOut(c *gin.Context) {
	clearAuthCookie(c)

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Signed out successfully",
	})
}
