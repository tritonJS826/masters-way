package schemas

type PostSurveyUserIntroPayload struct {
	DeviceUuid                 string `json:"deviceId" validate:"required"`
	Role                       string `json:"role" validate:"required"`
	PreferredInterfaceLanguage string `json:"preferredInterfaceLanguage" validate:"required"`
	StudentGoals               string `json:"studentGoals" validate:"required"`
	StudentExperience          string `json:"studentExperience" validate:"required"`
	WhyRegistered              string `json:"whyRegistered" validate:"required"`
	Source                     string `json:"source" validate:"required"`
}

type PostSurveyLookingForMentorPayload struct {
	UserEmail         string `json:"userEmail" validate:"required"`
	SkillsToLearn     string `json:"skillsToLearn" validate:"required"`
	CurrentExperience string `json:"currentExperience" validate:"required"`
	MentorDescription string `json:"mentorDescription" validate:"required"`
	IsHandled         bool   `json:"isHandled" validate:"required"`
}
