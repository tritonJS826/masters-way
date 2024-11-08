package services

// import (
// 	"context"
// 	db "mwserver/internal/db/sqlc"
// 	"mwserver/internal/schemas"
// )

// type ICompositeWayRepository interface {
// 	AddWayToCompositeWay(ctx context.Context, arg db.AddWayToCompositeWayParams) (db.CompositeWay, error)
// 	DeleteWayFromCompositeWay(ctx context.Context, arg db.DeleteWayFromCompositeWayParams) error
// }

// type CompositeWayService struct {
// 	compositeWayRepository ICompositeWayRepository
// }

// func NewCompositeWayService(compositeWayRepository ICompositeWayRepository) *CompositeWayService {
// 	return &CompositeWayService{compositeWayRepository}
// }

// type AddWayToCompositeWayParams struct {
// 	ChildWayID  string
// 	ParentWayID string
// }

// func (cws *CompositeWayService) AddWayToCompositeWay(ctx context.Context, params *AddWayToCompositeWayParams) (*schemas.CompositeWayRelation, error) {
// }

// func (cws *CompositeWayService) DeleteCompositeWayRelation(ctx context.Context, parentWayID, childWayID string) error {
// }
