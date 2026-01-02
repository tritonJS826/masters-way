package schemas

type CompanionCharacter string

const (
	CompanionCharacterArmySergeant   CompanionCharacter = "army_sergeant"
	CompanionCharacterCreativeArtist CompanionCharacter = "creative_artist"
	CompanionCharacterWarmSister     CompanionCharacter = "warm_sister"
	CompanionCharacterWiseMentor     CompanionCharacter = "wise_mentor"
	CompanionCharacterCheerfulFriend CompanionCharacter = "cheerful_friend"
)

type CompanionFeedback struct {
	UUID          string             `json:"uuid" validate:"required"`
	WayUUID       string             `json:"wayUuid" validate:"required"`
	Status        int                `json:"status" validate:"required"`
	Comment       string             `json:"comment" validate:"required"`
	Character     CompanionCharacter `json:"character" validate:"required"`
	LastUpdatedAt string             `json:"lastUpdatedAt" validate:"required"`
}

type CompanionAnalyzePayload struct {
	WayUUID        string            `json:"wayUuid" validate:"required"`
	WayName        string            `json:"wayName" validate:"required"`
	Goal           string            `json:"goal" validate:"required"`
	Character      string            `json:"character" validate:"required"`
	Language       string            `json:"language" validate:"required" example:"ru|en|ua"`
	DayReportsData string            `json:"dayReportsData" validate:"required"`
	TriggerType    string            `json:"triggerType" validate:"required"`
	Metrics        []CompanionMetric `json:"metrics"`
}

type CompanionAnalyzeResponse struct {
	Status  int    `json:"status" validate:"required"`
	Comment string `json:"comment" validate:"required"`
}

type CompanionCharacterPayload struct {
	Character string `json:"character" validate:"required"`
}

type CompanionMetric struct {
	Description string  `json:"description"`
	IsDone      bool    `json:"isDone"`
	DoneDate    *string `json:"doneDate"`
}
