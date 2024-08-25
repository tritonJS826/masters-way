package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type MentorUserWayRouter struct {
	mentorUserWayController *controllers.MentorUserWayController
}

func NewMentorUserWayRouter(mentorUserWayController *controllers.MentorUserWayController) *MentorUserWayRouter {
	return &MentorUserWayRouter{mentorUserWayController}
}

func (mr *MentorUserWayRouter) setMentorUserWayRoutes(rg *gin.RouterGroup) {
	router := rg.Group("mentorUserWays")
	router.POST("", auth.AuthMiddleware(), mr.mentorUserWayController.AddMentorUserWay)
	router.DELETE("", auth.AuthMiddleware(), mr.mentorUserWayController.DeleteMentorUserWay)
}
