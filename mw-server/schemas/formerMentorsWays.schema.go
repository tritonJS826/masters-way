package schemas

type CreateFormerMentorWayPayload struct {
	WayUuid          string `json:"wayUuid" validate:"required"`
	FormerMentorUuid string `json:"formerMentorUuid" validate:"required"`
}
