package routes

import (
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type ProblemJobTagRoutes struct {
	problemJobTagController controllers.ProblemJobTagController
}

func NewRouteProblemJobTag(problemJobTagController controllers.ProblemJobTagController) ProblemJobTagRoutes {
	return ProblemJobTagRoutes{problemJobTagController}
}

func (cr *ProblemJobTagRoutes) ProblemJobTagRoute(rg *gin.RouterGroup) {
	router := rg.Group("problemJobTags")
	router.POST("/", cr.problemJobTagController.CreateProblemJobTag)
	router.DELETE("/:jobTagId/:problemId", cr.problemJobTagController.DeleteProblemJobTagById)
}
