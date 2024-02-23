package routes

import (
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type FormerMentorWayRoutes struct {
	formerMentorWayController controllers.FormerMentorWayController
}

func NewRouteFormerMentorWay(formerMentorWayController controllers.FormerMentorWayController) FormerMentorWayRoutes {
	return FormerMentorWayRoutes{formerMentorWayController}
}

func (cr *FormerMentorWayRoutes) FormerMentorWayRoute(rg *gin.RouterGroup) {
	router := rg.Group("formerMentorWayWays")
	router.POST("/", cr.formerMentorWayController.CreateFormerMentorWay)
}
