package schemas

type AddWayToCompositeWayPayload struct {
	ChildWayUuid  string `json:"childWayUuid" validate:"required"`
	ParentWayUuid string `json:"parentWayUuid" validate:"required"`
}

type CompositeWayRelation struct {
	ChildWayUuid  string `json:"childWayUuid" validate:"required"`
	ParentWayUuid string `json:"parentWayUuid" validate:"required"`
}
