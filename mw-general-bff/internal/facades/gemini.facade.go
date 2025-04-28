package facades

import (
	"context"
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

type shortParentTopicForGeneration struct {
	Name        string
	Description string
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
