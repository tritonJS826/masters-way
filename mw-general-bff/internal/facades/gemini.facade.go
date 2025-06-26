package facades

import (
	"context"
	"fmt"
	"mw-general-bff/internal/schemas"
	"mw-general-bff/internal/services"
	"strings"

	"github.com/samber/lo"
)

type GeminiFacade struct {
	generalService  *services.GeneralService
	trainingService *services.TrainingService
}

func newGeminiFacade(generalService *services.GeneralService, trainingService *services.TrainingService) *GeminiFacade {
	return &GeminiFacade{generalService, trainingService}
}

func (gs *GeminiFacade) CreateMetricsPrompt(ctx context.Context, payload *schemas.GenerateMetricsPayload) (*schemas.GenerateMetricsResponse, error) {
	return gs.generalService.CreateMetricsPrompt(ctx, payload)
}

func (gs *GeminiFacade) AIChat(ctx context.Context, payload *schemas.AIChatPayload) (*schemas.AIChatResponse, error) {
	return gs.generalService.AIChat(ctx, payload)
}

func (gs *GeminiFacade) GeneratePlansByMetric(ctx context.Context, payload *schemas.AIGeneratePlansByMetricPayload) (*schemas.AIGeneratePlansByMetricResponse, error) {
	return gs.generalService.GeneratePlansByMetric(ctx, payload)
}

func (gs *GeminiFacade) CommentIssue(ctx context.Context, payload *schemas.AICommentIssuePayload) (*schemas.AICommentIssueResponse, error) {
	return gs.generalService.CommentIssue(ctx, payload)
}

func (gs *GeminiFacade) DecomposeIssue(ctx context.Context, payload *schemas.AIDecomposeIssuePayload) (*schemas.AIDecomposeIssueResponse, error) {
	return gs.generalService.DecomposeIssue(ctx, payload)
}

func (gs *GeminiFacade) EstimateIssue(ctx context.Context, payload *schemas.AIEstimateIssuePayload) (*schemas.AIEstimateIssueResponse, error) {
	return gs.generalService.EstimateIssue(ctx, payload)
}

func (gs *GeminiFacade) GenerateTrainingByTestSessionId(ctx context.Context, payload *schemas.AIGenerateTrainingByTestTestSessionIdPayload, userId string) (*schemas.AIGenerateTrainingByTestTestSessionIdResponse, error) {
	test, err := gs.trainingService.GetTestById(ctx, &services.GetTestParams{
		TestId: payload.TestId,
		UserId: userId,
	})
	if err != nil {
		return nil, err
	}

	testSessionResult, err := gs.trainingService.GetTestSessionResult(ctx, &services.GetTestSessionResultParams{
		SessionUuid: payload.TestSessionId,
		UserUuid:    userId,
	})
	if err != nil {
		return nil, err
	}

	questionResults, err := gs.trainingService.GetQuestionResultsBySessionUuid(ctx, &services.GetQuestionResultsBySessionUuidParams{
		SessionUuid: payload.TestSessionId,
		UserUuid:    userId,
	})
	if err != nil {
		return nil, err
	}

	args := &services.GenerateTrainingDescriptionByTestResultsParams{
		TestName:        test.Name,
		TestDescription: test.Description,
		Language:        payload.Language,
		QuestionResults: questionResults.Results,
		SessionResult:   testSessionResult.ResultDescription,
	}

	generatedTraining, err := gs.generalService.GenerateTrainingDescriptionByTestResults(ctx, args)
	if err != nil {
		return nil, err
	}

	training, err := gs.trainingService.CreateNewTraining(ctx, &services.CreateNewTrainingParams{
		Name:        generatedTraining.Name,
		Description: generatedTraining.Description,
		UserId:      userId,
		IsPrivate:   false,
	})
	if err != nil {
		return nil, err
	}

	// TODO
	// generate topics 1
	// create topics (use existent method)
	// ?? generate theory materials (bunch) maybe with practice material generation! in one request
	// ?? generate practice material for each topic (use existent method) topics amount (max 30?)

	response := &schemas.AIGenerateTrainingByTestTestSessionIdResponse{
		TrainingId: training.Uuid,
	}
	return response, nil
}

func (gs *GeminiFacade) GenerateTopicsForTraining(ctx context.Context, payload *schemas.AIGenerateTopicsForTrainingPayload) (*schemas.AIGenerateTopicsForTrainingResponse, error) {
	training, err := gs.trainingService.GetTrainingById(ctx, payload.TrainingId)
	if err != nil {
		return nil, err
	}

	var fullParentTopicDescription *string
	if payload.ParentTopicId != nil {

		var parentTopicRaw, err = gs.trainingService.GetTopicById(ctx, *payload.ParentTopicId)
		if err != nil {
			return nil, err
		}

		theoryMaterialsList := make([]string, 0)
		for i, theoryMaterial := range parentTopicRaw.GetTheoryMaterials() {
			theoryMaterialsList = append(theoryMaterialsList, string(rune(i))+": "+theoryMaterial.Name+": "+theoryMaterial.Description)
		}
		description := parentTopicRaw.GetName() + ": \n" + strings.Join(theoryMaterialsList, "\n")
		fullParentTopicDescription = &description

	}

	params := &services.GenerateTopicsForTrainingParams{
		TopicsAmount:               payload.TopicsAmount,
		TrainingName:               training.Name,
		TrainingDescription:        training.Description,
		Language:                   payload.Language,
		FullParentTopicDescription: fullParentTopicDescription,
	}

	topicsRaw, err := gs.generalService.GenerateTopicsForTraining(ctx, params)
	if err != nil {
		return nil, err
	}

	topics := lo.Map(topicsRaw.Topics, func(topic string, i int) schemas.GeneratedTopicPreview {
		return schemas.GeneratedTopicPreview{
			Name: topic,
		}
	})

	return &schemas.AIGenerateTopicsForTrainingResponse{Topics: topics}, nil
}

func (gs *GeminiFacade) GenerateTheoryMaterialForTraining(ctx context.Context, payload *schemas.AIGenerateTheoryMaterialForTrainingPayload) (*schemas.AIGenerateTheoryMaterialForTrainingResponse, error) {
	training, err := gs.trainingService.GetTrainingById(ctx, payload.TrainingId)
	if err != nil {
		return nil, err
	}

	topic, err := gs.trainingService.GetTopicById(ctx, payload.TopicId)
	if err != nil {
		return nil, err
	}

	practiceMaterialsList := make([]string, 0)
	for _, theoryMaterial := range topic.GetTheoryMaterials() {
		practiceMaterialsList = append(practiceMaterialsList, theoryMaterial.Name)
	}

	theoryMaterialsList := make([]string, 0)
	for _, theoryMaterial := range topic.GetTheoryMaterials() {
		theoryMaterialsList = append(theoryMaterialsList, theoryMaterial.Name)
	}

	params := &services.GenerateTheoryMaterialForTrainingParams{
		TrainingDescription:       training.Description,
		TrainingName:              training.Name,
		ExistentTheoryMaterials:   theoryMaterialsList,
		ExistentPracticeMaterials: practiceMaterialsList,
		TopicName:                 topic.Name,
	}

	theoryMaterialRaw, err := gs.generalService.GenerateTheoryMaterialForTraining(ctx, params)
	if err != nil {
		return nil, err
	}

	paramsForTheoryMaterial := &services.CreateTheoryMaterialPayload{
		TopicUuid:   payload.TopicId,
		Name:        theoryMaterialRaw.Name,
		Description: theoryMaterialRaw.Description,
	}

	theoryMaterial, err := gs.trainingService.CreateTheoryMaterial(ctx, paramsForTheoryMaterial)
	if err != nil {
		return nil, err
	}

	return &schemas.AIGenerateTheoryMaterialForTrainingResponse{
		Uuid:                theoryMaterial.GetUuid(),
		Name:                theoryMaterial.GetName(),
		Description:         theoryMaterial.GetDescription(),
		TopicUuid:           payload.TopicId,
		TheoryMaterialOrder: theoryMaterial.GetOrder(),
		CreatedAt:           theoryMaterial.GetCreatedAt(),
		UpdatedAt:           theoryMaterial.GetUpdatedAt(),
	}, nil
}

func (gs *GeminiFacade) GeneratePracticeMaterialForTraining(ctx context.Context, payload *schemas.AIGeneratePracticeMaterialForTopicPayload) (*schemas.AIGeneratePracticeMaterialsForTrainingResponse, error) {
	training, err := gs.trainingService.GetTrainingById(ctx, payload.TrainingId)
	if err != nil {
		return nil, err
	}
	topic, err := gs.trainingService.GetTopicById(ctx, payload.TopicId)
	if err != nil {
		return nil, err
	}
	practiceMaterialsList := make([]string, 0)
	for _, theoryMaterial := range topic.GetTheoryMaterials() {
		practiceMaterialsList = append(practiceMaterialsList, theoryMaterial.Name)
	}
	theoryMaterialsList := make([]string, 0)
	for _, theoryMaterial := range topic.GetTheoryMaterials() {
		theoryMaterialsList = append(theoryMaterialsList, theoryMaterial.Name)
	}
	params := &services.GeneratePracticeMaterialForTrainingPayload{
		TrainingDescription:       training.Description,
		TrainingName:              training.Name,
		ExistentTheoryMaterials:   theoryMaterialsList,
		ExistentPracticeMaterials: practiceMaterialsList,
		TopicName:                 topic.Name,
		GenerateAmount:            payload.GenerateAmount,
		Language:                  payload.Language,
	}

	practiceMaterialRaw, err := gs.generalService.GeneratePracticeMaterialForTraining(ctx, params)
	if err != nil {
		return nil, err
	}

	practiceMaterials := lo.Map(practiceMaterialRaw.PracticeMaterials, func(practiceMaterial schemas.GeneratedPracticeMaterial, i int) schemas.GeneratedPracticeMaterial {
		return schemas.GeneratedPracticeMaterial{
			Uuid:                  practiceMaterial.Uuid,
			TopicUuid:             payload.TopicId,
			Name:                  practiceMaterial.Name,
			PracticeMaterialOrder: int32(i),
			TaskDescription:       practiceMaterial.TaskDescription,
			Answer:                practiceMaterial.Answer,
			PracticeType:          practiceMaterial.PracticeType,
			TimeToAnswer:          practiceMaterial.TimeToAnswer,
			CreatedAt:             practiceMaterial.CreatedAt,
			UpdatedAt:             practiceMaterial.UpdatedAt,
		}
	})

	response := &schemas.AIGeneratePracticeMaterialsForTrainingResponse{
		PracticeMaterials: practiceMaterials,
	}

	lo.ForEach(practiceMaterials, func(practiceMaterial schemas.GeneratedPracticeMaterial, i int) {
		gs.trainingService.CreatePracticeMaterial(ctx, &services.CreatePracticeMaterialParams{
			TopicUuid:    payload.TopicId,
			Name:         practiceMaterial.Name,
			Description:  practiceMaterial.TaskDescription,
			Answer:       practiceMaterial.Answer,
			PracticeType: practiceMaterial.PracticeType,
			TimeToAnswer: practiceMaterial.TimeToAnswer,
		})
	})

	return response, nil
}

func (gs *GeminiFacade) GenerateQuestionsForTest(ctx context.Context, payload *schemas.AIGenerateQuestionsForTestPayload, userId string) (*schemas.AIGenerateQuestionsForTestResponse, error) {
	test, err := gs.trainingService.GetTestById(ctx, &services.GetTestParams{
		TestId: payload.TestId,
		UserId: userId,
	})
	if err != nil {
		return nil, err
	}

	questionList := make([]string, 0)
	for _, question := range test.GetQuestions() {
		questionList = append(questionList, question.QuestionText)
	}
	params := &services.GenerateQuestionsForTestPayload{
		TestDescription: test.Description,
		TestName:        test.Name,
		GenerateAmount:  payload.GenerateAmount,
		Language:        payload.Language,
		Questions:       questionList,
	}

	generatedQuestionsRaw, err := gs.generalService.GenerateQuestionsForTest(ctx, params)
	if err != nil {
		return nil, err
	}

	generatedQuestions := lo.Map(generatedQuestionsRaw, func(questionRaw *services.GenerateQuestionsForTestResponse, _ int) *schemas.GeneratedQuestion {
		createdQuestion, err := gs.trainingService.CreateTestQuestion(ctx, services.CreateTestQuestionParams{
			TestUuid:     payload.TestId,
			UserUuid:     userId,
			Name:         questionRaw.Name,
			QuestionText: &questionRaw.QuestionText,
			TimeToAnswer: &questionRaw.TimeToAnswer,
			Answer:       &questionRaw.Answer,
			PracticeType: "input_word",
		})
		if err != nil {
			fmt.Println("Ups.. Error! cant create test question")
		}

		question := &schemas.GeneratedQuestion{
			UUID:         createdQuestion.Uuid,
			Name:         createdQuestion.Name,
			TestUUID:     createdQuestion.TestUuid,
			QuestionText: createdQuestion.QuestionText,
			Order:        createdQuestion.Order,
			TimeToAnswer: createdQuestion.TimeToAnswer,
			Answer:       createdQuestion.Answer,
			IsActive:     createdQuestion.IsActive,
			CreatedAt:    createdQuestion.CreatedAt,
			UpdatedAt:    createdQuestion.UpdatedAt,
		}

		return question
	})

	response := &schemas.AIGenerateQuestionsForTestResponse{
		Questions: generatedQuestions,
	}

	return response, nil
}
