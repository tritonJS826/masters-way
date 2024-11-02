package controllers

import (
	"mw-general-bff/internal/schemas"
	"mw-general-bff/pkg/utils"
	"net/http"

	//"fmt"
	//"mw-general-bff/internal/auth"
	//"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
	//"mw-general-bff/pkg/utils"

	//"net/http"

	"github.com/gin-gonic/gin"
)

type UserProjectController struct {
	generalService *services.GeneralService
}

func NewUserProjectController(generalService *services.GeneralService) *UserProjectController {
	return &UserProjectController{generalService}
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

	//currentUserIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	//currentUserID := currentUserIDRaw.(string)
	//
	//isUserHavingPermissionsForProject, err := uc.generalService.GetIsUserHavingPermissionsForProject(ctx, currentUserID, payload.ProjectID)
	//utils.HandleErrorGin(ctx, err)
	//
	//if !isUserHavingPermissionsForProject {
	//	utils.HandleErrorGin(ctx, fmt.Errorf("no rights for adding user"))
	//}

	err := uc.generalService.CreateUserProject(ctx, payload.UserID, payload.ProjectID)
	utils.HandleErrorGin(ctx, err)

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

	//currentUserIDRaw, _ := ctx.Get(auth.ContextKeyUserID)
	//currentUserID := currentUserIDRaw.(string)
	//
	//isUserHavingPermissionsForProject, err := uc.generalService.GetIsUserHavingPermissionsForProject(ctx, currentUserID, projectID)
	//utils.HandleErrorGin(ctx, err)
	//
	//if !isUserHavingPermissionsForProject {
	//	utils.HandleErrorGin(ctx, fmt.Errorf("no rights for deleting user"))
	//}

	err := uc.generalService.DeleteUserProject(ctx, userID, projectID)
	utils.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
