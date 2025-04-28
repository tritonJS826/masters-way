package services

import (
	"context"
	"encoding/json"
	"fmt"
	"mw-server/internal/config"
	"mw-server/internal/schemas"
	"strconv"
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

	var promptTemplate string
	switch payload.Language {
	case "en":
		promptTemplate = "The user has their own project, goal, and a list of metrics. For example, learning the present simple tense, completing a thesis, or passing exams with excellent grades. The user may have already created several metrics on our platform.\n\nBased on the project name, goal, and list of metrics (if available, otherwise without them), create the most suitable metrics for the user. Each metric description must be no more than 200 characters.\n\nInput:\nProject Name: %s\nGoal: %s\nMetrics: %s\n\nOutput:\nA list of the most suitable metrics for the user as an array of strings:\n[\"New metric 1\", \"New metric 2\"]\n\nExample:\nProject Name: Learning Present Simple Tense\nGoal: To master the usage of the present simple tense in English within two months.\nMetrics: Practice exercises completed, accuracy in quizzes, and frequency of mistakes.\n\nExpected JSON output:\n[\n    \"Complete 50 practice exercises\",\n    \"Achieve 90%% accuracy in quizzes\",\n    \"Reduce mistakes by 50%% over time\"\n]"
	case "ru":
		promptTemplate = "У пользователя есть свой проект, цель и список метрик. Например, изучение Present Simple, написание диплома или сдача экзаменов на отлично. У пользователя могут быть уже созданные несколько метрик на нашей платформе.\n\nНа основе названия проекта, цели и списка метрик (если они есть, иначе без них) создайте наиболее подходящие метрики для пользователя. Каждое описание метрики должно быть не более 200 символов.\n\nВвод:\nНазвание проекта: %s\nЦель: %s\nМетрики: %s\n\nВывод:\nСписок наиболее подходящих метрик для пользователя в виде массива строк:\n[\"Новая метрика 1\", \"Новая метрика 2\"]\n\nПример:\nНазвание проекта: Изучение Present Simple\nЦель: Освоить использование Present Simple в английском языке за два месяца.\nМетрики: Выполненные практические упражнения, точность в тестах и частота ошибок.\n\nОжидаемый JSON-вывод:\n[\n    \"Выполнить 50 практических упражнений\",\n    \"Достигнуть 90%% точности в тестах\",\n    \"Сократить количество ошибок на 50%% со временем\"\n]"
	case "ua":
		promptTemplate = "У користувача є свій проект, мета та список метрик. Наприклад, вивчення Present Simple, написання диплома або складання іспитів на відмінно. У користувача можуть бути вже створені кілька метрик на нашій платформі.\n\nНа основі назви проекту, мети та списку метрик (якщо вони є, інакше без них) створіть найбільш підходящі метрики для користувача. Кожен опис метрики має бути не більше 200 символів.\n\nВведення:\nНазва проекту: %s\nМета: %s\nМетрики: %s\n\nВиведення:\nСписок найбільш підходящих метрик для користувача у вигляді масиву рядків:\n[\"Нова метрика 1\", \"Нова метрика 2\"]\n\nПриклад:\nНазва проекту: Вивчення Present Simple\nМета: Оволодіти використанням Present Simple в англійській мові за два місяці.\nМетрики: Виконані практичні вправи, точність у тестах та частота помилок.\n\nОчікуваний JSON-вивід:\n[\n    \"Виконати 50 практичних вправ\",\n    \"Досягти 90%% точності в тестах\",\n    \"Зменшити кількість помилок на 50%% з часом\"\n]"
	default:
		promptTemplate = "The user has their own project, goal, and a list of metrics. For example, learning the present simple tense, completing a thesis, or passing exams with excellent grades. The user may have already created several metrics on our platform.\n\nBased on the project name, goal, and list of metrics (if available, otherwise without them), create the most suitable metrics for the user. Each metric description must be no more than 200 characters.\n\nInput:\nProject Name: %s\nGoal: %s\nMetrics: %s\n\nOutput:\nA list of the most suitable metrics for the user as an array of strings:\n[\"New metric 1\", \"New metric 2\"]\n\nExample:\nProject Name: Learning Present Simple Tense\nGoal: To master the usage of the present simple tense in English within two months.\nMetrics: Practice exercises completed, accuracy in quizzes, and frequency of mistakes.\n\nExpected JSON output:\n[\n    \"Complete 50 practice exercises\",\n    \"Achieve 90%% accuracy in quizzes\",\n    \"Reduce mistakes by 50%% over time\"\n]"
	}

	prompt := fmt.Sprintf(
		promptTemplate,
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

	var payloadMessage string
	switch payload.Language {
	case "en":
		payloadMessage = payload.Message + " \n Answer with max 1000 symbols"
	case "ru":
		payloadMessage = payload.Message + " \n Ответь с макс 1000 символов"
	case "ua":
		payloadMessage = payload.Message + " \n Відповісти з макс 1000 символів"
	default:
		payloadMessage = payload.Message + " \n Answer with max 1000 symbols"
	}

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

	var payloadMessage string
	switch payload.Language {
	case "en":
		payloadMessage = "I have a goal:" + payload.Goal + ". And one of metrics for this goal is" + payload.Metric + " \n Give me 10 decomposed tasks with max 300 symbols each how to achieve this metric. Return just an array of strings in json"
	case "ru":
		payloadMessage = "У меня есть цель:" + payload.Goal + ". И одна из метрик для этой цели" + payload.Metric + " \n Дайте мне 10 декомпозированных задач с макс 300 символов каждая, как достичь этой метрики. Верните просто массив строк в json"
	case "ua":
		payloadMessage = "У мене є мета:" + payload.Goal + ". І одна з метрик для цієї мети" + payload.Metric + " \n Дайте мені 10 декомпозованих задач з макс 300 символів кожна, як досягти цієї метрики. Поверніть просто масив рядків в json"
	default:
		payloadMessage = "I have a goal:" + payload.Goal + ". And one of metrics for this goal is" + payload.Metric + " \n Give me 10 decomposed tasks with max 300 symbols each how to achieve this metric. Return just an array of strings in json"
	}

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

	var payloadMessage string
	switch payload.Language {
	case "en":
		payloadMessage = "I have a goal:" + payload.Goal + ". And one of issues to solve is" + payload.Message + " \n Comment it, for example is it relevant or should I know something before the implementation." + " \n Give me answer with max 300 symbols"
	case "ru":
		payloadMessage = "У меня есть цель:" + payload.Goal + ". И одна из задач, которую нужно решить" + payload.Message + " \n Прокомментируйте это, например, актуально ли это или мне нужно знать что-то перед реализацией." + " \n Дайте мне ответ с макс 300 символов"
	case "ua":
		payloadMessage = "У мене є мета:" + payload.Goal + ". І одна з задач, яку потрібно вирішити" + payload.Message + " \n Прокоментуйте це, наприклад, чи актуально це чи мені потрібно знати щось перед реалізацією." + " \n Дайте мені відповідь з макс 300 символів"
	default:
		payloadMessage = "I have a goal:" + payload.Goal + ". And one of issues to solve is" + payload.Message + " \n Comment it, for example is it relevant or should I know something before the implementation." + " \n Give me answer with max 300 symbols"
	}

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

	var payloadMessage string
	switch payload.Language {
	case "en":
		payloadMessage = "I have a goal:" + payload.Goal + ". And one of plans for this goal is" + payload.Message + " \n Give me 10 decomposed tasks with max 300 symbols each how to achieve this metric. Return just an array of strings in json"
	case "ru":
		payloadMessage = "У меня есть цель:" + payload.Goal + ". И один из планов для этой цели" + payload.Message + " \n Дайте мне 10 декомпозированных задач с макс 300 символов каждая, как достичь этой метрики. Верните просто массив строк в json"
	case "ua":
		payloadMessage = "У мене є мета:" + payload.Goal + ". І один з планів для цієї мети" + payload.Message + " \n Дайте мені 10 декомпозованих задач з макс 300 символів кожна, як досягти цієї метрики. Поверніть просто масив рядків в json"
	default:
		payloadMessage = "I have a goal:" + payload.Goal + ". And one of plans for this goal is" + payload.Message + " \n Give me 10 decomposed tasks with max 300 symbols each how to achieve this metric. Return just an array of strings in json"
	}

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

	var payloadMessage string
	switch payload.Language {
	case "en":
		payloadMessage = "I have a goal" + payload.Goal + ". And one of the plans is:" + payload.Issue + " \n Estimate how much time do I need to solve it? Give me answer with max 300 symbols"
	case "ru":
		payloadMessage = "У меня есть цель" + payload.Goal + ". И один из планов:" + payload.Issue + " \n Оцените, сколько времени мне нужно, чтобы решить это? Дайте мне ответ с макс 300 символов"
	case "ua":
		payloadMessage = "У мене є мета" + payload.Goal + ". І один з планів:" + payload.Issue + " \n Оцініть, скільки часу мені потрібно, щоб вирішити це? Дайте мені відповідь з макс 300 символів"
	default:
		payloadMessage = "I have a goal" + payload.Goal + ". And one of the plans is:" + payload.Issue + " \n Estimate how much time do I need to solve it? Give me answer with max 300 symbols"
	}

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

	// This block required only for topic decomposition
	var additionForDecomposedTopics string
	if payload.FullParentTopicDescription == nil {
		additionForDecomposedTopics = ""
	} else {
		switch payload.Language {
		case "en":
			additionForDecomposedTopics = "I have a topic that I want to decompose. Here is its description:" + *payload.FullParentTopicDescription
		case "ru":
			additionForDecomposedTopics = "У меня есть тема которую я хочу декомпозировать. Вот ее описание:" + *payload.FullParentTopicDescription
		case "ua":
			additionForDecomposedTopics = "У мене є тема яку я хочу декомпозувати. Ось її опис:" + *payload.FullParentTopicDescription
		default:
			additionForDecomposedTopics = "I have a topic that I want to decompose. Here is its description:" + *payload.FullParentTopicDescription
		}
	}

	var payloadMessage string
	switch payload.Language {
	case "en":
		payloadMessage = "I have a course " + payload.TrainingName + ". The descriptions is:" + payload.TrainingDescription + "\n" + additionForDecomposedTopics + ". Generate me the list of " + strconv.Itoa(payload.TopicsAmount) + "topics for this course, each topic for 1 lesson (1-2 hours). max 100 symbols for each topic. Provide me answer in json array format. For example: [\"some topic 1\", \"some topic 2\"]"
	case "ru":
		payloadMessage = "У меня есть курс " + payload.TrainingName + ". Описание:" + payload.TrainingDescription + "\n" + additionForDecomposedTopics + ". Сгенерируйте мне список " + strconv.Itoa(payload.TopicsAmount) + " тем для этого курса, каждая тема на 1 урок (1-2 часа). макс 100 символов для каждой темы. Предоставьте мне ответ в формате json массива. Например: [\"some topic 1\", \"some topic 2\"]"
	case "ua":
		payloadMessage = "У мене є курс " + payload.TrainingName + ". Опис:" + payload.TrainingDescription + "\n" + additionForDecomposedTopics + ". Згенеруйте мені список " + strconv.Itoa(payload.TopicsAmount) + " тем для цього курсу, кожна тема на 1 урок (1-2 години). макс 100 символів для кожної теми. Надішліть мені відповідь у форматі json масиву. Наприклад: [\"some topic 1\", \"some topic 2\"]"
	default:
		payloadMessage = "I have a course " + payload.TrainingName + ". The descriptions is:" + payload.TrainingDescription + "\n" + additionForDecomposedTopics + ". Generate me the list of " + strconv.Itoa(payload.TopicsAmount) + "topics for this course, each topic for 1 lesson (1-2 hours). max 100 symbols for each topic. Provide me answer in json array format. For example: [\"some topic 1\", \"some topic 2\"]"
	}

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

func (gs *GeminiService) GenerateTheoryMaterialForTopic(ctx context.Context, payload *schemas.AIGenerateTheoryMaterialForTopicPayload) (*schemas.AIGenerateTheoryMaterialForTopicResponse, error) {
	// if the environment is not 'prod', connection to Gemini is not created, and the client remains nil
	if gs.config.EnvType != "prod" {
		return &schemas.AIGenerateTheoryMaterialForTopicResponse{
			Name:        "Hi! It's a stub message from AI GenerateTheoryMaterialForTraining for developing",
			Description: "Hi! It's a stub message from AI GenerateTheoryMaterialForTraining for developing",
		}, nil
	}

	model := gs.geminiClient.GenerativeModel(gs.config.GeminiModel)

	var payloadMessage string
	switch payload.Language {
	case "en":
		payloadMessage = "I have a course " + payload.TrainingName + ". The descriptions is:" + payload.TrainingDescription + ". Currently I'm working on topic " + payload.TopicName + ". I already created theory materials  (" + strings.Join(payload.TheoryMaterialNames, ", ") + ") and practice materials for this topic (" + strings.Join(payload.PracticeMaterialNames, ", ") + ")" + " \n Generate me another one theory material. Give me answer with max 100 symbols for name, and 1000-5000 symbols for description. Provide me answer in json with fields 'name' and 'description' (for example {\"name\": \"some name\", description: \"some description\"})"
	case "ru":
		payloadMessage = "У меня есть курс " + payload.TrainingName + ". Описание:" + payload.TrainingDescription + ". В данный момент я работаю над темой " + payload.TopicName + ". Я уже создал теоретические материалы  (" + strings.Join(payload.TheoryMaterialNames, ", ") + ") и практические материалы для этой темы (" + strings.Join(payload.PracticeMaterialNames, ", ") + ")" + " \n Сгенерируйте мне еще один теоретический материал. Дайте мне ответ с макс 100 символов для названия и 1000-5000 символов для описания. Предоставьте мне ответ в json с полями 'name' и 'description' (например {\"name\": \"some name\", description: \"some description\"})"
	case "ua":
		payloadMessage = "У мене є курс " + payload.TrainingName + ". Опис:" + payload.TrainingDescription + ". В даний момент я працюю над темою " + payload.TopicName + ". Я вже створив теоретичні матеріали  (" + strings.Join(payload.TheoryMaterialNames, ", ") + ") і практичні матеріали для цієї теми (" + strings.Join(payload.PracticeMaterialNames, ", ") + ")" + " \n Згенеруйте мені ще один теоретичний матеріал. Дайте мені відповідь з макс 100 символів для назви і 1000-5000 символів для опису. Надішліть мені відповідь у json з полями 'name' і 'description' (наприклад {\"name\": \"some name\", description: \"some description\"})"
	default:
		payloadMessage = "I have a course " + payload.TrainingName + ". The descriptions is:" + payload.TrainingDescription + ". Currently I'm working on topic " + payload.TopicName + ". I already created theory materials  (" + strings.Join(payload.TheoryMaterialNames, ", ") + ") and practice materials for this topic (" + strings.Join(payload.PracticeMaterialNames, ", ") + ")" + " \n Generate me another one theory material. Give me answer with max 100 symbols for name, and 1000-5000 symbols for description. Provide me answer in json with fields 'name' and 'description' (for example {\"name\": \"some name\", description: \"some description\"})"
	}

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
	var theoryMaterial schemas.AIGenerateTheoryMaterialForTopicResponse
	// TODO: clear unsupported chars from jsonString, otherwise we will face with unpredictable errors
	// (not all string could be Unmarshalled with json.Unmarshall)
	err = json.Unmarshal([]byte(jsonString), &theoryMaterial)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal response from gemini: %w", err)
	}

	return &schemas.AIGenerateTheoryMaterialForTopicResponse{
		Name:        theoryMaterial.Name,
		Description: theoryMaterial.Description,
	}, nil
}

func (gs *GeminiService) GeneratePracticeMaterialForTopic(ctx context.Context, payload *schemas.AIGeneratePracticeMaterialForTopicPayload) (*schemas.AIGeneratePracticeMaterialsForTopicResponse, error) {
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
		return &schemas.AIGeneratePracticeMaterialsForTopicResponse{PracticeMaterials: practiceMaterials}, nil
	}

	model := gs.geminiClient.GenerativeModel(gs.config.GeminiModel)

	var payloadMessage string
	switch payload.Language {
	case "en":
		payloadMessage = "I have a course " + payload.TrainingName + ". The descriptions is:" + payload.TrainingDescription + ". Currently I'm working on topic " + payload.TopicName + ". I already created theory materials  (" + strings.Join(payload.TheoryMaterialNames, ", ") + ") and practice materials (" + strings.Join(payload.PracticeMaterialNames, ", ") + ") for this topic." + " \n Generate " + strconv.Itoa(payload.GenerateAmount) + " more practice materials. Give me answer with max 100 symbols for name, 1000 symbols for task description, 100 symbols for answer and time to answer in seconds. Provide me answer in json with fields 'name', 'taskDescription', 'answer', 'time to answer' (for example [{\"name\": \"some name\", taskDescription: \"some description\", \"answer\":\"answer\", \"timeToAnswer\":30}])"
	case "ru":
		payloadMessage = "У меня есть курс " + payload.TrainingName + ". Описание:" + payload.TrainingDescription + ". В данный момент я работаю над темой " + payload.TopicName + ". Я уже создал теоретические материалы  (" + strings.Join(payload.TheoryMaterialNames, ", ") + ") и практические материалы (" + strings.Join(payload.PracticeMaterialNames, ", ") + ") для этой темы." + " \n Сгенерируйте " + strconv.Itoa(payload.GenerateAmount) + " еще практических материалов. Дайте мне ответ с макс 100 символов для названия, 1000 символов для описания задания, 100 символов для ответа и времени на ответ в секундах. Предоставьте мне ответ в json с полями 'name', 'taskDescription', 'answer', 'time to answer' (например [{\"name\": \"some name\", taskDescription: \"some description\", \"answer\":\"answer\", \"timeToAnswer\":30}])"
	case "ua":
		payloadMessage = "У мене є курс " + payload.TrainingName + ". Опис:" + payload.TrainingDescription + ". В даний момент я працюю над темою " + payload.TopicName + ". Я вже створив теоретичні матеріали  (" + strings.Join(payload.TheoryMaterialNames, ", ") + ") і практичні матеріали (" + strings.Join(payload.PracticeMaterialNames, ", ") + ") для цієї теми." + " \n Згенеруйте " + strconv.Itoa(payload.GenerateAmount) + " ще практичних матеріалів. Дайте мені відповідь з макс 100 символів для назви, 1000 символів для опису завдання, 100 символів для відповіді та часу на відповідь у секундах. Надішліть мені відповідь у json з полями 'name', 'taskDescription', 'answer', 'time to answer' (наприклад [{\"name\": \"some name\", taskDescription: \"some description\", \"answer\":\"answer\", \"timeToAnswer\":30}])"
	default:
		payloadMessage = "I have a course " + payload.TrainingName + ". The descriptions is:" + payload.TrainingDescription + ". Currently I'm working on topic " + payload.TopicName + ". I already created theory materials  (" + strings.Join(payload.TheoryMaterialNames, ", ") + ") and practice materials (" + strings.Join(payload.PracticeMaterialNames, ", ") + ") for this topic." + " \n Generate " + strconv.Itoa(payload.GenerateAmount) + " more practice materials. Give me answer with max 100 symbols for name, 1000 symbols for task description, 100 symbols for answer and time to answer in seconds. Provide me answer in json with fields 'name', 'taskDescription', 'answer', 'time to answer' (for example [{\"name\": \"some name\", taskDescription: \"some description\", \"answer\":\"answer\", \"timeToAnswer\":30}])"
	}

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

	return &schemas.AIGeneratePracticeMaterialsForTopicResponse{PracticeMaterials: practiceMaterials}, nil
}
