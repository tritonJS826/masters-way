package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"mw-training-bff/internal/auth"
	"mw-training-bff/internal/schemas"
	"mw-training-bff/internal/services"
	util "mw-training-bff/internal/utils"
)

type TestSessionResultsController struct {
	generalService            *services.GeneralService
	testSessionResultsService *services.TestSessionResultsService
}

func NewTestSessionResultsController(
	generalService *services.GeneralService,
	testSessionResultsService *services.TestSessionResultsService,
) *TestSessionResultsController {
	return &TestSessionResultsController{
		generalService:            generalService,
		testSessionResultsService: testSessionResultsService,
	}
}

// GetTestSessionResult
// @Summary Get TestSessionResult
// @Description Get TestSessionResult
// @Tags test-session-result
// @Accept json
// @Produce json
// @Param request body schemas.GetTestSessionResultRequest true "body"
// @Success 200 {object} schemas.GetTestSessionResultResponse
// @Router /testSessionResult [get]
func (c *TestSessionResultsController) GetTestSessionResult(ctx *gin.Context) {
	requestOwnerUuid := ctx.Value(auth.ContextKeyUserID).(string)

	var payload *schemas.GetTestSessionResultRequest
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	params := &services.GetTestSessionResultParams{
		SessionUuid: payload.SessionUUID,
		UserUuid:    requestOwnerUuid,
	}

	testSessionResult, err := c.testSessionResultsService.GetTestSessionResult(ctx, params)
	util.HandleErrorGin(ctx, err)

	ctx.JSON(http.StatusOK, testSessionResult)
}
