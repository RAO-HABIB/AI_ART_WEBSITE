package routes

import (
	"ai-art-backend/handlers"
	"ai-art-backend/middleware"

	"github.com/gin-gonic/gin"
)

func Setup(router *gin.Engine) {
	api := router.Group("/api")
	{
		// Health Check
		api.GET("/health", func(c *gin.Context) {
			c.JSON(200, gin.H{
				"success": true,
				"message": "AI ART Backend is running 🚀",
				"version": "1.0.0",
			})
		})

		// Auth Routes
		auth := api.Group("/auth")
		{
			// Email Auth
			auth.POST("/signup", handlers.SignUp)
			auth.POST("/signin", handlers.SignIn)
			auth.POST("/signout", handlers.SignOut)
			auth.GET("/me", middleware.AuthMiddleware(), handlers.GetMe)

			// Google OAuth
			auth.GET("/google", handlers.GoogleLogin)
			auth.GET("/google/callback", handlers.GoogleCallback)

			// GitHub OAuth
			auth.GET("/github", handlers.GithubLogin)
			auth.GET("/github/callback", handlers.GithubCallback)
		}

		// Tools Routes
		tools := api.Group("/tools")
		{
			tools.GET("", handlers.GetTools)
			tools.GET("/:id", handlers.GetToolByID)

			adminTools := tools.Group("")
			adminTools.Use(
				middleware.AuthMiddleware(),
				middleware.AdminMiddleware(),
			)
			{
				adminTools.POST("", handlers.CreateTool)
				adminTools.PUT("/:id", handlers.UpdateTool)
				adminTools.DELETE("/:id", handlers.DeleteTool)
			}
		}

		// User Routes
		users := api.Group("/users")
		users.Use(middleware.AuthMiddleware())
		{
			users.GET("/profile", handlers.GetProfile)
			users.PUT("/profile", handlers.UpdateProfile)
			users.GET(
				"",
				middleware.AdminMiddleware(),
				handlers.GetAllUsers,
			)
		}
	}
}
