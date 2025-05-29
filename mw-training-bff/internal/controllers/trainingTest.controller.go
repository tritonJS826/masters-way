package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"mw-training-bff/internal/auth"
	"mw-training-bff/internal/schemas"
	"mw-training-bff/internal/services"
	util "mw-training-bff/internal/utils"
)

type TrainingTestsController struct {
	generalService      *services.GeneralService
	trainingTestService *services.TrainingTestService
}

func NewTrainingTestsController(
	generalService *services.GeneralService,
	trainingTestService *services.TrainingTestService,
) *TrainingTestsController {
	return &TrainingTestsController{
		generalService:      generalService,
		trainingTestService: trainingTestService,
	}
}

// CreateTrainingTest
// @Summary Create TrainingTest
// @Description Create TrainingTest
// @Tags TrainingTests
// @Accept json
// @Produce json
// @Param request body schemas.CreateTrainingTestRequest true "body"
// @Success 200
// @Router /trainingTest [post]
func (c *TrainingTestsController) CreateTrainingTest(ctx *gin.Context) {
	userId := ctx.Value(auth.ContextKeyUserID).(string)
	var payload schemas.CreateTrainingTestRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	params := &services.CreateTrainingTestParams{
		TrainingUuid:  payload.TrainingUUID,
		TestUuid:      payload.TestUUID,
		TestOwnerUuid: userId,
	}

	err := c.trainingTestService.CreateTrainingTest(ctx, params)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusOK)
}
