package controllers

import (
	"net/http"

	"mwserver/internal/schemas"
	"mwserver/internal/services"
	"mwserver/pkg/util"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type ProjectController struct {
	projectService *services.ProjectService
	wayService     *services.WayService
	userService    *services.UserService
}

func NewProjectController(projectService *services.ProjectService, wayService *services.WayService, userService *services.UserService) *ProjectController {
	return &ProjectController{projectService, wayService, userService}
}

// Create Project handler
// @Summary Create a new project
// @Description
// @Tags project
// @ID create-project
// @Accept  json
// @Produce  json
// @Param request body schemas.CreateProjectPayload true "query params"
// @Success 200 {object} schemas.ProjectResponse
// @Router /projects [post]
func (pc *ProjectController) CreateProject(ctx *gin.Context) {
	var payload *schemas.CreateProjectPayload

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	project, err := pc.projectService.CreateProject(ctx, payload)
	util.HandleErrorGin(ctx, err)

	users, err := pc.userService.GetPlainUserWithInfoByIDs(ctx, project.ID)
	util.HandleErrorGin(ctx, err)

	response := schemas.ProjectResponse{
		ID:        project.ID,
		Name:      project.Name,
		OwnerID:   project.OwnerID,
		IsPrivate: project.IsPrivate,
		Users:     users,
		Ways:      []schemas.WayPlainResponse{},
	}

	ctx.JSON(http.StatusOK, response)
}

// Update Project handler
// @Summary Update project by id
// @Description
// @Tags project
// @ID update-project
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateProjectPayload true "query params"
// @Param projectId path string true "project id"
// @Success 200 {object} schemas.ProjectResponse
// @Router /projects/{projectId} [patch]
func (pc *ProjectController) UpdateProject(ctx *gin.Context) {
	var payload *schemas.UpdateProjectPayload
	projectID := ctx.Param("projectId")

	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "Failed payload", "error": err.Error()})
		return
	}

	project, err := pc.projectService.UpdateProject(ctx, &services.UpdateProjectParams{
		ID:        projectID,
		Name:      payload.Name,
		IsPrivate: payload.IsPrivate,
	})
	util.HandleErrorGin(ctx, err)

	users, err := pc.userService.GetPlainUserWithInfoByIDs(ctx, project.ID)
	util.HandleErrorGin(ctx, err)

	ways := make([]schemas.WayPlainResponse, 0, len(project.WayIDs))
	for _, wayID := range project.WayIDs {
		way, err := pc.wayService.GetPlainWayById(ctx, uuid.MustParse(wayID))
		util.HandleErrorGin(ctx, err)

		ways = append(ways, *way)
	}

	response := schemas.ProjectResponse{
		ID:        project.ID,
		Name:      project.Name,
		OwnerID:   project.OwnerID,
		IsPrivate: project.IsPrivate,
		Users:     users,
		Ways:      ways,
	}

	ctx.JSON(http.StatusOK, response)
}

// Get Project handler
// @Summary Get project by id
// @Description
// @Tags project
// @ID get-project
// @Accept  json
// @Produce  json
// @Param projectId path string true "project id"
// @Success 200 {object} schemas.ProjectResponse
// @Router /projects/{projectId} [get]
func (pc *ProjectController) GetProjectByID(ctx *gin.Context) {
	projectID := ctx.Param("projectId")

	project, err := pc.projectService.GetProjectByID(ctx, projectID)
	util.HandleErrorGin(ctx, err)

	users, err := pc.userService.GetPlainUserWithInfoByIDs(ctx, project.ID)
	util.HandleErrorGin(ctx, err)

	ways := make([]schemas.WayPlainResponse, 0, len(project.WayIDs))
	for _, wayID := range project.WayIDs {
		way, err := pc.wayService.GetPlainWayById(ctx, uuid.MustParse(wayID))
		util.HandleErrorGin(ctx, err)

		ways = append(ways, *way)
	}

	response := schemas.ProjectResponse{
		ID:        project.ID,
		Name:      project.Name,
		OwnerID:   project.OwnerID,
		IsPrivate: project.IsPrivate,
		Users:     users,
		Ways:      ways,
	}

	ctx.JSON(http.StatusOK, response)
}

// Delete Project handler
// @Summary Delete project by id
// @Description
// @Tags project
// @ID delete-project
// @Accept  json
// @Produce  json
// @Param projectId path string true "project id"
// @Success 204
// @Router /project/{projectId} [delete]
func (pc *ProjectController) DeleteProject(ctx *gin.Context) {
	projectID := ctx.Param("projectId")

	_, err := pc.projectService.UpdateProject(ctx, &services.UpdateProjectParams{
		ID:        projectID,
		Name:      nil,
		IsPrivate: nil,
	})
	util.HandleErrorGin(ctx, err)

	ctx.Status(http.StatusNoContent)
}
