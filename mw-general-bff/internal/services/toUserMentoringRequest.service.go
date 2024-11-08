package services

// import (
// 	"context"
// 	db "mwserver/internal/db/sqlc"
// 	"mwserver/internal/schemas"
// )

// type IToUserMentoringRequestRepository interface {
// 	CreateToUserMentoringRequest(ctx context.Context, arg db.CreateToUserMentoringRequestParams) (db.ToUserMentoringRequest, error)
// 	DeleteToUserMentoringRequestByIds(ctx context.Context, arg db.DeleteToUserMentoringRequestByIdsParams) error
// }

// type ToUserMentoringRequestService struct {
// 	toUserMentoringRequestRepository IToUserMentoringRequestRepository
// }

// func NewToUserMentoringRequestService(toUserMentoringRequestRepository IToUserMentoringRequestRepository) *ToUserMentoringRequestService {
// 	return &ToUserMentoringRequestService{toUserMentoringRequestRepository}
// }

// func (ts *ToUserMentoringRequestService) CreateToUserMentoringRequest(ctx context.Context, payload *schemas.CreateToUserMentoringRequestPayload) (*schemas.ToUserMentoringRequestResponse, error) {
// }

// func (ts *ToUserMentoringRequestService) DeleteToUserMentoringRequestById(ctx context.Context, userID, wayID string) error {
// }
