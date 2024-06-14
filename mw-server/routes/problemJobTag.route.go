package routes

import (
	"mwserver/auth"
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
	router.POST("", auth.AuthMiddleware(), cr.problemJobTagController.CreateProblemJobTag)
	router.DELETE("/:jobTagId/:problemId", auth.AuthMiddleware(), cr.problemJobTagController.DeleteProblemJobTagById)
}
