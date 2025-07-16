package facades

import (
	"context"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
)

type QuestionResultFacade struct {
	generalService       *services.GeneralService
	trainingService      *services.TrainingService
	testWebsocketService *services.TestWebsocketService
}

func newQuestionResultFacade(generalService *services.GeneralService, trainingService *services.TrainingService, testWebsocketService *services.TestWebsocketService) *QuestionResultFacade {
	return &QuestionResultFacade{generalService, trainingService, testWebsocketService}
}

func (gs *QuestionResultFacade) CreateAndCheckQuestionResult(ctx context.Context, payload *schemas.CreateQuestionResultRequest, userId string) (*schemas.QuestionResult, error) {
	question, err := gs.trainingService.GetQuestionById(ctx, &services.GetQuestionByIdParams{
		QuestionUuid: payload.QuestionUUID,
		UserUuid:     userId,
	})
	if err != nil {
		return nil, err
	}

	generatedQuestionResult, err := gs.generalService.AiGenerateQuestionResult(ctx, &services.AiGenerateQuestionResultParams{
		QuestionName:    question.Name,
		QuestionText:    question.QuestionText,
		AnswerByCreator: question.Answer,
		AnswerFromUser:  payload.UserAnswer,
		Language:        payload.Language,
	})
	if err != nil {
		return nil, err
	}

	questionResult, err := gs.trainingService.CreateQuestionResult(ctx, &services.CreateQuestionResultParams{
		QuestionUuid:      payload.QuestionUUID,
		UserUuid:          payload.UserUUID,
		TestUuid:          payload.TestUUID,
		TestSessionUuid:   payload.TestSessionUUID,
		UserAnswer:        payload.UserAnswer,
		IsOk:              generatedQuestionResult.IsOk,
		ResultDescription: generatedQuestionResult.ResultDescription,
	})
	if err != nil {
		return nil, err
	}

	// notify team in the session
	_ = gs.testWebsocketService.SendUserAnswerHandledByServerEvent(ctx, &services.SendUserAnswerHandledByServerEventParams{
		Uuid:                questionResult.Uuid,
		UserUuid:            questionResult.UserUuid,
		IsOk:                questionResult.IsOk,
		ResultDescription:   questionResult.ResultDescription,
		QuestionName:        questionResult.QuestionName,
		QuestionDescription: questionResult.QuestionDescription,
		UserAnswer:          questionResult.UserAnswer,
		QuestionAnswer:      questionResult.QuestionAnswer,
		QuestionUuid:        questionResult.QuestionUuid,
		SessionUuid:         payload.TestSessionUUID,
	})

	return &schemas.QuestionResult{
		UUID:                questionResult.Uuid,
		UserUUID:            questionResult.UserUuid,
		IsOk:                questionResult.IsOk,
		ResultDescription:   questionResult.ResultDescription,
		QuestionName:        questionResult.QuestionName,
		QuestionDescription: questionResult.QuestionDescription,
		UserAnswer:          questionResult.UserAnswer,
		QuestionAnswer:      questionResult.QuestionAnswer,
		QuestionUUID:        questionResult.QuestionUuid,
	}, nil
}
