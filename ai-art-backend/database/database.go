package database

import (
	"ai-art-backend/config"
	"ai-art-backend/models"
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func Connect() {
	cfg := config.AppConfig

	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s TimeZone=Asia/Karachi",
		cfg.DBHost,
		cfg.DBPort,
		cfg.DBUser,
		cfg.DBPassword,
		cfg.DBName,
		cfg.DBSSLMode,
	)

	var logLevel logger.LogLevel
	if cfg.Env == "development" {
		logLevel = logger.Info
	} else {
		logLevel = logger.Error
	}

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logLevel),
	})

	if err != nil {
		log.Fatal("❌ Failed to connect to database:", err)
	}

	err = db.AutoMigrate(
		&models.User{},
		&models.Tool{},
		&models.Subscription{},
	)

	if err != nil {
		log.Fatal("❌ Failed to migrate database:", err)
	}

	DB = db
	log.Println("✅ Database connected and migrated successfully")
}