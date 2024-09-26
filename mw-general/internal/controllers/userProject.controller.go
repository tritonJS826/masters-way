package controllers

import (
	"mwgeneral/internal/schemas"
	"mwgeneral/internal/services"
	"mwgeneral/pkg/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserProjectController struct {
	limitService       *services.LimitService
	userProjectService *services.UserProjectService
}

func NewUserProjectController(limitService *services.LimitService, userProjectService *services.UserProjectService) *UserProjectController {
	return &UserProjectController{limitService, userProjectService}
}

// Create userProject handler
// @Summary Add user to project
// @Description
// @Tags userProject
// @ID create-userProject
// @Accept json
// @Produce json
// @Param request body schemas.CreateUserProjectPayload true "query params"
// @Success 204
// @Router /userProjects [post]
func (uc *UserProjectController) CreateUsersProject(ctx *gin.Context) {
	var payload *schemas.CreateUserProjectPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	// err := uc.limitService.CheckIsLimitReachedByPricingPlan(ctx, &services.LimitReachedParams{
	// 	LimitName: services.MaxUserProjects,
	// 	UserID:    payload.OwnerUuid,
	// })
	// util.HandleErrorGin(ctx, err)

	// permissions

	err := uc.userProjectService.CreateUserProject(ctx, payload.UserID, payload.ProjectID)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}

// Deleting userProject handlers
// @Summary Delete userProject by UUID
// @Description
// @Tags userProject
// @ID delete-userProject
// @Accept  json
// @Produce  json
// @Param projectId path string true "project ID"
// @Param userId path string true "user ID"
// @Success 204
// @Router /userProjects/{projectId}/{userId} [delete]
func (uc *UserProjectController) DeleteUserProject(ctx *gin.Context) {
	projectID := ctx.Param("projectId")
	userID := ctx.Param("userId")

	// permissions

	err := uc.userProjectService.DeleteUserProject(ctx, userID, projectID)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
