package services

import (
	"context"
	"encoding/json"
	"fmt"
	"mw-server/internal/config"
	"mw-server/internal/schemas"
	"strings"

	"github.com/google/generative-ai-go/genai"
)

type GeminiService struct {
	geminiClient *genai.Client
	config       *config.Config
}

func NewGeminiService(geminiClient *genai.Client, config *config.Config) *GeminiService {
	return &GeminiService{geminiClient, config}
}

func (geminiService *GeminiService) createMetricsPrompt(payload *schemas.GenerateMetricsPayload) (string, error) {
	jsonMetrics, err := json.Marshal(payload.Metrics)
	if err != nil {
		return "", fmt.Errorf("failed to marshal metrics: %w", err)
	}

	prompt := fmt.Sprintf(
		"The user has their own project, goal, and a list of metrics. For example, learning the present simple tense, completing a thesis, or passing exams with excellent grades. The user may have already created several metrics on our platform.\n\nBased on the project name, goal, and list of metrics (if available, otherwise without them), create the most suitable metrics for the user. Each metric description must be no more than 200 characters.\n\nInput:\nProject Name: %s\nGoal: %s\nMetrics: %s\n\nOutput:\nA list of the most suitable metrics for the user as an array of strings:\n[\"New metric 1\", \"New metric 2\"]\n\nExample:\nProject Name: Learning Present Simple Tense\nGoal: To master the usage of the present simple tense in English within two months.\nMetrics: Practice exercises completed, accuracy in quizzes, and frequency of mistakes.\n\nExpected JSON output:\n[\n    \"Complete 50 practice exercises\",\n    \"Achieve 90%% accuracy in quizzes\",\n    \"Reduce mistakes by 50%% over time\"\n]",
		payload.WayName,
		payload.GoalDescription,
		string(jsonMetrics),
	)

	return prompt, nil
}

func (gs *GeminiService) GetMetricsByGoal(ctx context.Context, payload *schemas.GenerateMetricsPayload) ([]string, error) {
	// if the environment is not 'prod', connection to Gemini is not created, and the client remains nil
	if gs.config.EnvType != "prod" {
		return []string{
			"Stub metric 1",
			"Stub metric 2",
			"Stub metric 3",
			"Stub metric 4",
			"Stub metric 5",
			"Stub metric 6",
		}, nil
	}

	prompt, err := gs.createMetricsPrompt(payload)
	if err != nil {
		return nil, fmt.Errorf("failed to create metrics prompt: %w", err)
	}

	// Candidates: A list of candidate generated texts. Each candidate is a possible variant of the response.
	// The first candidate (Candidates[0]) is typically the most relevant or highest scoring option.

	// Content: The content of the generated text for a specific candidate.

	// Parts: The segments or parts of the generated text. This can be useful if the text is divided into logical parts or paragraphs.

	model := gs.geminiClient.GenerativeModel(gs.config.GeminiModel)
	response, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return nil, fmt.Errorf("failed to generate content: %w", err)
	}

	// Using Parts[0] to extract the first part of the generated content,
	// assuming the JSON output is contained in the first part of the response.
	responseText := fmt.Sprint(response.Candidates[0].Content.Parts[0])

	jsonStart := strings.Index(responseText, "[")
	jsonEnd := strings.LastIndex(responseText, "]") + 1
	if jsonStart == -1 || jsonEnd == -1 {
		return nil, fmt.Errorf("failed to find JSON in the response: %w", err)
	}

	jsonString := responseText[jsonStart:jsonEnd]
	var metrics []string
	// TODO: clear unsupported chars from jsonString, otherwise we will face with unpredictable errors
	// (not all string could be Unmarshalled with json.Unmarshall)
	err = json.Unmarshal([]byte(jsonString), &metrics)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal response from gemini: %w", err)
	}

	return metrics, nil
}

func (gs *GeminiService) AIChat(ctx context.Context, payload *schemas.AIChatPayload) (*schemas.AIChatResponse, error) {
	// if the environment is not 'prod', connection to Gemini is not created, and the client remains nil
	if gs.config.EnvType != "prod" {
		return &schemas.AIChatResponse{Message: "Hi! It's a stub message from AI Chat for developing"}, nil
	}

	model := gs.geminiClient.GenerativeModel(gs.config.GeminiModel)

	var payloadMessage = payload.Message + " \n Answer with max 1000 symbols"
	response, err := model.GenerateContent(ctx, genai.Text(payloadMessage))
	if err != nil {
		return nil, fmt.Errorf("failed to generate content: %w", err)
	}

	// Using Parts[0] to extract the first part of the generated content,
	// assuming the JSON output is contained in the first part of the response.
	responseText := fmt.Sprint(response.Candidates[0].Content.Parts[0])

	return &schemas.AIChatResponse{Message: responseText}, nil
}

func (gs *GeminiService) GeneratePlansByMetric(ctx context.Context, payload *schemas.AIGeneratePlansByMetricPayload) (*schemas.AIGeneratePlansByMetricResponse, error) {
	// if the environment is not 'prod', connection to Gemini is not created, and the client remains nil
	if gs.config.EnvType != "prod" {
		return &schemas.AIGeneratePlansByMetricResponse{
			Plans: []string{
				"1 stub message from AI GeneratePlansByMetric for developing",
				"2 stub message from AI GeneratePlansByMetric for developing",
				"3 stub message from AI GeneratePlansByMetric for developing",
				"4 stub message from AI GeneratePlansByMetric for developing",
				"5 stub message from AI GeneratePlansByMetric for developing",
			},
		}, nil
	}

	model := gs.geminiClient.GenerativeModel(gs.config.GeminiModel)

	var payloadMessage = "I have a goal:" + payload.Goal + ". And one of metrics for this goal is" + payload.Metric + " \n Give me 10 decomposed tasks with max 300 symbols each how to achieve this metric. Return just an array of strings in json"
	response, err := model.GenerateContent(ctx, genai.Text(payloadMessage))
	if err != nil {
		return nil, fmt.Errorf("failed to generate content: %w", err)
	}

	// Using Parts[0] to extract the first part of the generated content,
	// assuming the JSON output is contained in the first part of the response.
	responseText := fmt.Sprint(response.Candidates[0].Content.Parts[0])

	jsonStart := strings.Index(responseText, "[")
	jsonEnd := strings.LastIndex(responseText, "]") + 1
	if jsonStart == -1 || jsonEnd == -1 {
		return nil, fmt.Errorf("failed to find JSON in the response: %w", err)
	}

	jsonString := responseText[jsonStart:jsonEnd]
	var plans []string
	// TODO: clear unsupported chars from jsonString, otherwise we will face with unpredictable errors
	// (not all string could be Unmarshalled with json.Unmarshall)
	err = json.Unmarshal([]byte(jsonString), &plans)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal response from gemini: %w", err)
	}

	return &schemas.AIGeneratePlansByMetricResponse{Plans: plans}, nil
}

func (gs *GeminiService) CommentIssue(ctx context.Context, payload *schemas.AICommentIssuePayload) (*schemas.AICommentIssueResponse, error) {
	// if the environment is not 'prod', connection to Gemini is not created, and the client remains nil
	if gs.config.EnvType != "prod" {
		return &schemas.AICommentIssueResponse{Comment: "Hi! It's a stub message from CommentIssue for developing"}, nil
	}

	model := gs.geminiClient.GenerativeModel(gs.config.GeminiModel)

	var payloadMessage = "I have a goal:" + payload.Goal + ". And one of issues to solve is" + payload.Message + " \n Comment it, for example is it relevant or should I know something before the implementation." + " \n Give me answer with max 300 symbols"
	response, err := model.GenerateContent(ctx, genai.Text(payloadMessage))
	if err != nil {
		return nil, fmt.Errorf("failed to generate content: %w", err)
	}

	// Using Parts[0] to extract the first part of the generated content,
	// assuming the JSON output is contained in the first part of the response.
	responseText := fmt.Sprint(response.Candidates[0].Content.Parts[0])

	return &schemas.AICommentIssueResponse{Comment: responseText}, nil
}

func (gs *GeminiService) DecomposeIssue(ctx context.Context, payload *schemas.AIDecomposeIssuePayload) (*schemas.AIDecomposeIssueResponse, error) {
	// if the environment is not 'prod', connection to Gemini is not created, and the client remains nil
	if gs.config.EnvType != "prod" {
		return &schemas.AIDecomposeIssueResponse{
			Plans: []string{
				"1 stub message from AI DecomposeIssue for developing",
				"2 stub message from AI DecomposeIssue for developing",
				"3 stub message from AI DecomposeIssue for developing",
				"4 stub message from AI DecomposeIssue for developing",
				"5 stub message from AI DecomposeIssue for developing",
			},
		}, nil
	}

	model := gs.geminiClient.GenerativeModel(gs.config.GeminiModel)

	var payloadMessage = "I have a goal:" + payload.Goal + ". And one of plans for this goal is" + payload.Message + " \n Give me 10 decomposed tasks with max 300 symbols each how to achieve this metric. Return just an array of strings in json"
	response, err := model.GenerateContent(ctx, genai.Text(payloadMessage))
	if err != nil {
		return nil, fmt.Errorf("failed to generate content: %w", err)
	}

	// Using Parts[0] to extract the first part of the generated content,
	// assuming the JSON output is contained in the first part of the response.
	responseText := fmt.Sprint(response.Candidates[0].Content.Parts[0])

	jsonStart := strings.Index(responseText, "[")
	jsonEnd := strings.LastIndex(responseText, "]") + 1
	if jsonStart == -1 || jsonEnd == -1 {
		return nil, fmt.Errorf("failed to find JSON in the response: %w", err)
	}

	jsonString := responseText[jsonStart:jsonEnd]
	var plans []string
	// TODO: clear unsupported chars from jsonString, otherwise we will face with unpredictable errors
	// (not all string could be Unmarshalled with json.Unmarshall)
	err = json.Unmarshal([]byte(jsonString), &plans)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal response from gemini: %w", err)
	}

	return &schemas.AIDecomposeIssueResponse{Plans: plans}, nil
}

func (gs *GeminiService) EstimateIssue(ctx context.Context, payload *schemas.AIEstimateIssuePayload) (*schemas.AIEstimateIssueResponse, error) {
	// if the environment is not 'prod', connection to Gemini is not created, and the client remains nil
	if gs.config.EnvType != "prod" {
		return &schemas.AIEstimateIssueResponse{Estimation: "Hi! It's a stub message from AI EstimateIssue for developing"}, nil
	}

	model := gs.geminiClient.GenerativeModel(gs.config.GeminiModel)

	var payloadMessage = "I have a goal" + payload.Goal + ". And one of the plans is:" + payload.Issue + " \n Estimate how much time do I need to solve it? Give me answer with max 300 symbols"
	response, err := model.GenerateContent(ctx, genai.Text(payloadMessage))
	if err != nil {
		return nil, fmt.Errorf("failed to generate content: %w", err)
	}

	// Using Parts[0] to extract the first part of the generated content,
	// assuming the JSON output is contained in the first part of the response.
	responseText := fmt.Sprint(response.Candidates[0].Content.Parts[0])

	return &schemas.AIEstimateIssueResponse{Estimation: responseText}, nil
}

func (gs *GeminiService) GenerateTopicsForTraining(ctx context.Context, payload *schemas.AIGenerateTopicsForTrainingPayload) (*schemas.AIGenerateTopicsForTrainingResponse, error) {
	// if the environment is not 'prod', connection to Gemini is not created, and the client remains nil
	if gs.config.EnvType != "prod" {
		topicNames := []string{
			"Hi! It's a 1 stub message from AI GenerateTopicsForTraining for developing",
			"Hi! It's a 2 stub message from AI GenerateTopicsForTraining for developing",
			"Hi! It's a 3 stub message from AI GenerateTopicsForTraining for developing",
			"Hi! It's a 4 stub message from AI GenerateTopicsForTraining for developing",
			"Hi! It's a 5 stub message from AI GenerateTopicsForTraining for developing",
		}
		return &schemas.AIGenerateTopicsForTrainingResponse{TopicNames: topicNames}, nil
	}

	model := gs.geminiClient.GenerativeModel(gs.config.GeminiModel)

	var payloadMessage = "I have a course " + payload.TrainingName + ". The descriptions is:" + payload.TrainingDescription + ". Generate me the list of " + string(payload.TopicsAmount) + "topics for this course, each topic for 1 lesson (1-2 hours). max 100 symbols for each topic. Provide me answer in json array format"
	response, err := model.GenerateContent(ctx, genai.Text(payloadMessage))
	if err != nil {
		return nil, fmt.Errorf("failed to generate content: %w", err)
	}

	// Using Parts[0] to extract the first part of the generated content,
	// assuming the JSON output is contained in the first part of the response.
	responseText := fmt.Sprint(response.Candidates[0].Content.Parts[0])

	jsonStart := strings.Index(responseText, "[")
	jsonEnd := strings.LastIndex(responseText, "]") + 1
	if jsonStart == -1 || jsonEnd == -1 {
		return nil, fmt.Errorf("failed to find JSON in the response: %w", err)
	}

	jsonString := responseText[jsonStart:jsonEnd]
	var topicNames []string
	// TODO: clear unsupported chars from jsonString, otherwise we will face with unpredictable errors
	// (not all string could be Unmarshalled with json.Unmarshall)
	err = json.Unmarshal([]byte(jsonString), &topicNames)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal response from gemini: %w", err)
	}

	return &schemas.AIGenerateTopicsForTrainingResponse{TopicNames: topicNames}, nil
}

func (gs *GeminiService) GenerateTheoryMaterialForTraining(ctx context.Context, payload *schemas.AIGenerateTheoryMaterialForTrainingPayload) (*schemas.AIGenerateTheoryMaterialForTrainingResponse, error) {
	// if the environment is not 'prod', connection to Gemini is not created, and the client remains nil
	if gs.config.EnvType != "prod" {
		return &schemas.AIGenerateTheoryMaterialForTrainingResponse{
			Name:        "Hi! It's a stub message from AI GenerateTheoryMaterialForTraining for developing",
			Description: "Hi! It's a stub message from AI GenerateTheoryMaterialForTraining for developing",
		}, nil
	}

	model := gs.geminiClient.GenerativeModel(gs.config.GeminiModel)

	var payloadMessage = "I have a course " + payload.TrainingName + ". The descriptions is:" + payload.TrainingDescription + ". Currently I'm working on topic " + payload.TopicName + ". I already created theory materials  (" + strings.Join(payload.TheoryMaterialNames, ", ") + ") and practice materials for this topic (" + strings.Join(payload.PracticeMaterialNames, ", ") + ")" + " \n Generate me another one theory material. Give me answer with max 100 symbols for name and 1000 symbols for description. Provide me answer in json with fields 'name' and 'description' (for example {\"name\": \"some name\", description: \"some description\"})"
	response, err := model.GenerateContent(ctx, genai.Text(payloadMessage))
	if err != nil {
		return nil, fmt.Errorf("failed to generate content: %w", err)
	}

	// Using Parts[0] to extract the first part of the generated content,
	// assuming the JSON output is contained in the first part of the response.
	responseText := fmt.Sprint(response.Candidates[0].Content.Parts[0])

	jsonStart := strings.Index(responseText, "{")
	jsonEnd := strings.LastIndex(responseText, "}") + 1
	if jsonStart == -1 || jsonEnd == -1 {
		return nil, fmt.Errorf("failed to find JSON in the response: %w", err)
	}

	jsonString := responseText[jsonStart:jsonEnd]
	var theoryMaterial schemas.AIGenerateTheoryMaterialForTrainingResponse
	// TODO: clear unsupported chars from jsonString, otherwise we will face with unpredictable errors
	// (not all string could be Unmarshalled with json.Unmarshall)
	err = json.Unmarshal([]byte(jsonString), &theoryMaterial)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal response from gemini: %w", err)
	}

	return &schemas.AIGenerateTheoryMaterialForTrainingResponse{
		Name:        theoryMaterial.Name,
		Description: theoryMaterial.Description,
	}, nil
}

func (gs *GeminiService) GeneratePracticeMaterialForTraining(ctx context.Context, payload *schemas.AIGeneratePracticeMaterialForTrainingPayload) (*schemas.AIGeneratePracticeMaterialsForTrainingResponse, error) {
	// if the environment is not 'prod', connection to Gemini is not created, and the client remains nil
	if gs.config.EnvType != "prod" {
		practiceMaterials := []schemas.GeneratedPracticeMaterial{
			{
				Name:            "Hi! It's a 1 stub Name message from AI GeneratePracticeMaterialForTraining for developing",
				TaskDescription: "Hi! It's a 1 stub TaskDescription message from AI GeneratePracticeMaterialForTraining for developing",
				Answer:          "Hi! It's a 1 stub Answer message from AI GeneratePracticeMaterialForTraining for developing",
				TimeToAnswer:    10,
			},
			{
				Name:            "Hi! It's a 2 stub Name message from AI GeneratePracticeMaterialForTraining for developing",
				TaskDescription: "Hi! It's a 2 stub TaskDescription message from AI GeneratePracticeMaterialForTraining for developing",
				Answer:          "Hi! It's a 2 stub Answer message from AI GeneratePracticeMaterialForTraining for developing",
				TimeToAnswer:    20,
			},
		}
		return &schemas.AIGeneratePracticeMaterialsForTrainingResponse{PracticeMaterials: practiceMaterials}, nil
	}

	model := gs.geminiClient.GenerativeModel(gs.config.GeminiModel)

	var payloadMessage = "I have a course " + payload.TrainingName + ". The descriptions is:" + payload.TrainingDescription + ". Currently I'm working on topic " + payload.TopicName + ". I already created theory materials  (" + strings.Join(payload.TheoryMaterialNames, ", ") + ") and practice materials (" + strings.Join(payload.PracticeMaterialNames, ", ") + ") for this topic." + " \n Generate " + string(payload.GenerateAmount) + " more practice materials. Give me answer with max 100 symbols for name, 1000 symbols for task description, 100 symbols for answer and time to answer in seconds. Provide me answer in json with fields 'name', 'taskDescription', 'answer', 'time to answer' (for example [{\"name\": \"some name\", taskDescription: \"some description\", \"answer\":\"answer\", \"timeToAnswer\":30}])"
	response, err := model.GenerateContent(ctx, genai.Text(payloadMessage))
	if err != nil {
		return nil, fmt.Errorf("failed to generate content: %w", err)
	}

	// Using Parts[0] to extract the first part of the generated content,
	// assuming the JSON output is contained in the first part of the response.
	responseText := fmt.Sprint(response.Candidates[0].Content.Parts[0])

	jsonStart := strings.Index(responseText, "[")
	jsonEnd := strings.LastIndex(responseText, "]") + 1
	if jsonStart == -1 || jsonEnd == -1 {
		return nil, fmt.Errorf("failed to find JSON in the response: %w", err)
	}

	jsonString := responseText[jsonStart:jsonEnd]
	var practiceMaterials []schemas.GeneratedPracticeMaterial
	// TODO: clear unsupported chars from jsonString, otherwise we will face with unpredictable errors
	// (not all string could be Unmarshalled with json.Unmarshall)
	err = json.Unmarshal([]byte(jsonString), &practiceMaterials)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal response from gemini: %w", err)
	}

	return &schemas.AIGeneratePracticeMaterialsForTrainingResponse{PracticeMaterials: practiceMaterials}, nil
}
