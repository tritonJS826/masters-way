package services

type IP2PRoomsService interface {
}

type IGroupRoomsService interface {
}

type Service struct {
	IP2PRoomsService
	IGroupRoomsService
}

func NewService() *Service {
	return &Service{
		IP2PRoomsService:   "123",
		IGroupRoomsService: "123",
	}
}
