package routes

import (
	"mwserver/controllers"

	"github.com/gin-gonic/gin"
)

type CommentRoutes struct {
	commentController controllers.CommentController
}

func NewRouteComment(commentController controllers.CommentController) CommentRoutes {
	return CommentRoutes{commentController}
}

func (cr *CommentRoutes) CommentRoute(rg *gin.RouterGroup) {
	router := rg.Group("comments")
	router.POST("", cr.commentController.CreateComment)
	router.PATCH("/:commentId", cr.commentController.UpdateComment)
	router.DELETE("/:commentId", cr.commentController.DeleteCommentById)
}
