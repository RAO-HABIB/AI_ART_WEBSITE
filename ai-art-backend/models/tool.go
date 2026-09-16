package models

import (
	"time"

	"gorm.io/gorm"
)

type Tool struct {
	ID          uint           `json:"id" gorm:"primaryKey;autoIncrement"`
	Name        string         `json:"name" gorm:"not null"`
	Description string         `json:"description" gorm:"not null"`
	Category    string         `json:"category" gorm:"not null"`
	Icon        string         `json:"icon" gorm:"not null"`
	Gradient    string         `json:"gradient" gorm:"not null"`
	Features    string         `json:"features"`
	Pricing     string         `json:"pricing" gorm:"not null"`
	Rating      float64        `json:"rating" gorm:"default:0"`
	Users       string         `json:"users" gorm:"default:'0'"`
	IsNew       bool           `json:"is_new" gorm:"default:false"`
	IsFeatured  bool           `json:"is_featured" gorm:"default:false"`
	IsActive    bool           `json:"is_active" gorm:"default:true"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"-" gorm:"index"`
}

type Subscription struct {
	ID        uint      `json:"id" gorm:"primaryKey;autoIncrement"`
	UserID    uint      `json:"user_id" gorm:"not null"`
	Plan      string    `json:"plan" gorm:"default:'free'"`
	Status    string    `json:"status" gorm:"default:'active'"`
	ExpiresAt time.Time `json:"expires_at"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type CreateToolRequest struct {
	Name        string  `json:"name" binding:"required"`
	Description string  `json:"description" binding:"required"`
	Category    string  `json:"category" binding:"required"`
	Icon        string  `json:"icon" binding:"required"`
	Gradient    string  `json:"gradient" binding:"required"`
	Features    string  `json:"features"`
	Pricing     string  `json:"pricing" binding:"required"`
	Rating      float64 `json:"rating"`
	Users       string  `json:"users"`
	IsNew       bool    `json:"is_new"`
	IsFeatured  bool    `json:"is_featured"`
}