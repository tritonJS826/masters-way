package services

// import (
// 	"context"
// 	db "mwserver/internal/db/sqlc"
// 	"mwserver/internal/schemas"
// )

// type IFromUserMentoringRequestRepository interface {
// 	CreateFromUserMentoringRequest(ctx context.Context, arg db.CreateFromUserMentoringRequestParams) (db.FromUserMentoringRequest, error)
// 	DeleteFromUserMentoringRequest(ctx context.Context, arg db.DeleteFromUserMentoringRequestParams) error
// }

// type FromUserMentoringRequestService struct {
// 	fromUserMentoringRequestRepository IFromUserMentoringRequestRepository
// }

// func NewFromUserMentoringRequestService(fromUserMentoringRequestRepository IFromUserMentoringRequestRepository) *FromUserMentoringRequestService {
// 	return &FromUserMentoringRequestService{fromUserMentoringRequestRepository}
// }

// func (fumrs *FromUserMentoringRequestService) CreateFromUserMentoringRequest(ctx context.Context, userID, wayID string) (*schemas.FromUserMentoringRequestResponse, error) {
// }

// func (fumrs *FromUserMentoringRequestService) DeleteFromUserMentoringRequestById(ctx context.Context, userID, wayID string) error {
// }
