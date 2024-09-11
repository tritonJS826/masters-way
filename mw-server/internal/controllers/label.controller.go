package controllers

import (
	"mwserver/internal/schemas"
	"mwserver/internal/services"
	"mwserver/pkg/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

type LabelController struct {
	labelService *services.LabelService
}

func NewLabelController(labelService *services.LabelService) *LabelController {
	return &LabelController{labelService}
}

// Create wayTag  handler
// @Summary Create a new label
// @Description
// @Tags label
// @ID create-label
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateLabelPayload true "query params"
// @Success 200 {object} schemas.LabelResponse
// @Router /labels [post]
func (jc *LabelController) CreateLabel(ctx *gin.Context) {
	var payload *schemas.CreateLabelPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	label, err := jc.labelService.CreateLabel(ctx, payload)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, label)
}

// Update label handler
// @Summary Update label by UUID
// @Description
// @Tags label
// @ID update-label
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateLabelPayload true "query params"
// @Param labelId path string true "label UUID"
// @Success 200 {object} schemas.LabelResponse
// @Router /labels/{labelId} [patch]
func (jc *LabelController) UpdateLabel(ctx *gin.Context) {
	var payload *schemas.UpdateLabelPayload
	labelID := ctx.Param("labelId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	label, err := jc.labelService.UpdateLabel(ctx, &services.UpdateLabelParams{
		LabelID:     labelID,
		Name:        payload.Name,
		Description: payload.Description,
		Color:       payload.Color,
	})
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, label)
}

// Deleting wayTag handlers
// @Summary Delete label by UUID
// @Description Delete a label by its UUID.
// @Tags label
// @ID delete-label
// @Accept  json
// @Produce  json
// @Param labelId path string true "label ID"
// @Success 204 "Label deleted successfully"
// @Failure 400 "Invalid label ID"
// @Failure 404 "Label not found"
// @Router /labels/{labelId} [delete]
func (jc *LabelController) DeleteLabelById(ctx *gin.Context) {
	labelID := ctx.Param("labelId")

	err := jc.labelService.DeleteLabelById(ctx, labelID)
	if err != nil {
		util.HandleErrorGin(ctx, err)
		return
	}

	ctx.Status(http.StatusNoContent)
}
