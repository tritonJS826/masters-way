package controllers

import (
	"fmt"
	"mwserver/internal/auth"
	"mwserver/internal/schemas"
	"mwserver/internal/services"
	"mwserver/pkg/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

type UserProjectController struct {
	permissionService  *services.PermissionService
	userProjectService *services.UserProjectService
}

func NewUserProjectController(permissionService *services.PermissionService, userProjectService *services.UserProjectService) *UserProjectController {
	return &UserProjectController{permissionService, userProjectService}
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

	currentUserIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	currentUserID := currentUserIDRaw.(string)

	isUserHavingPermissionsForProject, err := uc.permissionService.GetIsUserHavingPermissionsForProject(ctx, currentUserID, payload.ProjectID)
	util.HandleErrorGin(ctx, err)

	if !isUserHavingPermissionsForProject {
		util.HandleErrorGin(ctx, fmt.Errorf("no rights for adding user"))
	}

	err = uc.userProjectService.CreateUserProject(ctx, payload.UserID, payload.ProjectID)
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

	currentUserIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	currentUserID := currentUserIDRaw.(string)

	isUserHavingPermissionsForProject, err := uc.permissionService.GetIsUserHavingPermissionsForProject(ctx, currentUserID, projectID)
	util.HandleErrorGin(ctx, err)

	if !isUserHavingPermissionsForProject {
		util.HandleErrorGin(ctx, fmt.Errorf("no rights for deleting user"))
	}

	err = uc.userProjectService.DeleteUserProject(ctx, userID, projectID)
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
