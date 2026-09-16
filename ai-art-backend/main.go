package main

import (
	"ai-art-backend/config"
	"ai-art-backend/database"
	"ai-art-backend/routes"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Config load karo
	config.Load()

	// Database connect karo
	database.Connect()

	// Gin mode set karo
	if config.AppConfig.Env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.Default()

	// CORS setup
	router.Use(cors.New(cors.Config{
		AllowOriginFunc: func(origin string) bool {
			return true // Allow all origins to fix 403 OAuth error
		},
		AllowMethods: []string{
			"GET",
			"POST",
			"PUT",
			"DELETE",
			"OPTIONS",
		},
		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Authorization",
			"Accept",
		},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Routes setup
	routes.Setup(router)

	// Server start karo
	port := config.AppConfig.Port
	log.Printf("🚀 AI ART Backend running on port %s", port)
	log.Printf("📍 API:    http://localhost:%s/api", port)
	log.Printf("❤️  Health: http://localhost:%s/api/health", port)

	if err := router.Run(":" + port); err != nil {
		log.Fatal("❌ Failed to start server:", err)
	}
}