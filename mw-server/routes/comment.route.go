package routes

import (
	"mwserver/auth"
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
	router.POST("", auth.AuthMiddleware(), cr.commentController.CreateComment)
	router.PATCH("/:commentId", auth.AuthMiddleware(), cr.commentController.UpdateComment)
	router.DELETE("/:commentId", auth.AuthMiddleware(), cr.commentController.DeleteCommentById)
}
