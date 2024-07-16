package routes

import (
	"github.com/gin-gonic/gin"
	"mwserver/controllers"
)

type MentorRequestRoutes struct {
	mentorRequestController controllers.MentorRequestController
}

func NewRouteMentorRequest(mentorRequestController controllers.MentorRequestController) MentorRequestRoutes {
	return MentorRequestRoutes{
		mentorRequestController: mentorRequestController,
	}
}

func (mr *MentorRequestRoutes) MentorRequestRoute(rg *gin.RouterGroup) {
	router := rg.Group("mentorRequest")
	router.GET("", mr.mentorRequestController.GetMentorRequestsByUserId)
}
