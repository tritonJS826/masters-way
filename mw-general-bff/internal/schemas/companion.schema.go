package schemas

type CompanionCharacter string

const (
	CompanionCharacterArmySergeant   CompanionCharacter = "army_sergeant"
	CompanionCharacterCreativeArtist CompanionCharacter = "creative_artist"
	CompanionCharacterWarmSister     CompanionCharacter = "warm_sister"
	CompanionCharacterWiseMentor     CompanionCharacter = "wise_mentor"
	CompanionCharacterCheerfulFriend CompanionCharacter = "cheerful_friend"
)

type CompanionFeedbackResponse struct {
	UUID          string             `json:"uuid" validate:"required"`
	WayUUID       string             `json:"wayUuid" validate:"required"`
	Status        int                `json:"status" validate:"required"`
	Comment       string             `json:"comment" validate:"required"`
	Character     CompanionCharacter `json:"character" validate:"required"`
	LastUpdatedAt string             `json:"lastUpdatedAt" validate:"required"`
}
