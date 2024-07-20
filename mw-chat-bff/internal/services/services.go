package services

import "github.com/gin-gonic/gin"

type IP2PRoomsService interface {
	GetP2PRoomById(ctx *gin.Context)
}

type IGroupRoomsService interface {
}

type Service struct {
	IP2PRoomsService
	IGroupRoomsService
}

func NewService(ctx *gin.Context) *Service {
	return &Service{
		IP2PRoomsService:   NewP2PRoomsService(),
		IGroupRoomsService: NewGroupRoomsService(),
	}
}
