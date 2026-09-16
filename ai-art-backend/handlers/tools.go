package handlers

import (
	"ai-art-backend/database"
	"ai-art-backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetTools(c *gin.Context) {
	var tools []models.Tool

	query := database.DB.Where("is_active = ?", true)

	if category := c.Query("category"); category != "" && category != "All" {
		query = query.Where("category = ?", category)
	}

	if featured := c.Query("featured"); featured == "true" {
		query = query.Where("is_featured = ?", true)
	}

	if search := c.Query("search"); search != "" {
		query = query.Where(
			"name ILIKE ? OR description ILIKE ?",
			"%"+search+"%",
			"%"+search+"%",
		)
	}

	if err := query.Find(&tools).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to fetch tools",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"count":   len(tools),
		"data":    tools,
	})
}

func GetToolByID(c *gin.Context) {
	id := c.Param("id")

	var tool models.Tool
	if err := database.DB.Where(
		"id = ? AND is_active = ?", id, true,
	).First(&tool).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "Tool not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    tool,
	})
}

func CreateTool(c *gin.Context) {
	var req models.CreateToolRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid input",
			"errors":  err.Error(),
		})
		return
	}

	tool := models.Tool{
		Name:        req.Name,
		Description: req.Description,
		Category:    req.Category,
		Icon:        req.Icon,
		Gradient:    req.Gradient,
		Features:    req.Features,
		Pricing:     req.Pricing,
		Rating:      req.Rating,
		Users:       req.Users,
		IsNew:       req.IsNew,
		IsFeatured:  req.IsFeatured,
		IsActive:    true,
	}

	if err := database.DB.Create(&tool).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"message": "Failed to create tool",
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"message": "Tool created successfully",
		"data":    tool,
	})
}

func UpdateTool(c *gin.Context) {
	id := c.Param("id")

	var tool models.Tool
	if err := database.DB.First(&tool, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "Tool not found",
		})
		return
	}

	var req models.CreateToolRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "Invalid input",
		})
		return
	}

	database.DB.Model(&tool).Updates(models.Tool{
		Name:        req.Name,
		Description: req.Description,
		Category:    req.Category,
		Icon:        req.Icon,
		Gradient:    req.Gradient,
		Features:    req.Features,
		Pricing:     req.Pricing,
		Rating:      req.Rating,
		Users:       req.Users,
		IsNew:       req.IsNew,
		IsFeatured:  req.IsFeatured,
	})

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Tool updated successfully",
		"data":    tool,
	})
}

func DeleteTool(c *gin.Context) {
	id := c.Param("id")

	var tool models.Tool
	if err := database.DB.First(&tool, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"message": "Tool not found",
		})
		return
	}

	database.DB.Delete(&tool)

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Tool deleted successfully",
	})
}