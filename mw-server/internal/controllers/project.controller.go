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
// @Tags metric
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

// Update Metric handler
// @Summary Update metric by UUID
// @Description
// @Tags metric
// @ID update-metric
// @Accept  json
// @Produce  json
// @Param request body schemas.UpdateMetricPayload true "query params"
// @Param metricId path string true "metric UUID"
// @Success 200 {object} schemas.MetricResponse
// @Router /metrics/{metricId} [patch]
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
