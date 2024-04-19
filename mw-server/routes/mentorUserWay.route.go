package routes

import (
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type MentorUserWayRoutes struct {
	mentorUserWayController controllers.MentorUserWayController
}

func NewRouteMentorUserWay(mentorUserWayController controllers.MentorUserWayController) MentorUserWayRoutes {
	return MentorUserWayRoutes{mentorUserWayController}
}

func (cr *MentorUserWayRoutes) MentorUserWayRoute(rg *gin.RouterGroup) {
	router := rg.Group("mentorUserWays")
	router.POST("", cr.mentorUserWayController.AddMentorUserWayByName)
	router.DELETE("", cr.mentorUserWayController.DeleteMentorUserWayByFromUserByTag)
}
