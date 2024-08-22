package routers

import (
	"mwserver/auth"
	"mwserver/internal/controllers"

	"github.com/gin-gonic/gin"
)

type CommentRouter struct {
	commentController *controllers.CommentController
}

func NewCommentRouter(commentController *controllers.CommentController) *CommentRouter {
	return &CommentRouter{commentController}
}

func (cr *CommentRouter) SetCommentRoutes(rg *gin.RouterGroup) {
	router := rg.Group("comments")
	router.POST("", auth.AuthMiddleware(), cr.commentController.CreateComment)
	router.PATCH("/:commentId", auth.AuthMiddleware(), cr.commentController.UpdateComment)
	router.DELETE("/:commentId", auth.AuthMiddleware(), cr.commentController.DeleteCommentById)
}
