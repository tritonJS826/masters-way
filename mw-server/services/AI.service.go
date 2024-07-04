package services

import (
	"context"
	"fmt"
	"log"
	"mwserver/config"
	"mwserver/schemas"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

func createMetricsPrompt(payload *schemas.GenerateMetricsPayload) string {
	var prompt string

	prompt += fmt.Sprintf("User has created their own way, described the goal, and possibly made a few metrics. Based on this data, create several new metrics that align with the described goal but do not duplicate the existing ones.\n")
	prompt += fmt.Sprintf("Give your answer as a list of Metrics.\n")
	prompt += fmt.Sprintf("Way Name: %s\nGoal Description: %s\nMetrics:\n", payload.WayName, payload.GoalDescription)
	for _, metric := range payload.Metrics {
		prompt += fmt.Sprintf("Description: %s\n  Is Done: %t\n  Done Date: %v\n  Estimation Time: %d\n",
			metric.Description, metric.IsDone, metric.DoneDate, metric.MetricEstimation)
	}

	return prompt
}

func GetMetricsByGoal(ctx context.Context, payload *schemas.GenerateMetricsPayload) (string, error) {
	client, err := genai.NewClient(ctx, option.WithAPIKey(config.Env.GeminiApiKey))
	if err != nil {
		return "", fmt.Errorf("failed to create client: %w", err)
	}
	defer client.Close()

	prompt := createMetricsPrompt(payload)
	log.Println("Generated Prompt:", prompt)

	model := client.GenerativeModel("gemini-1.5-flash")
	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return "", fmt.Errorf("failed to generate content: %w", err)
	}

	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return "", fmt.Errorf("no content generated")
	}

	text := fmt.Sprint(resp.Candidates[0].Content.Parts[0])
	log.Println("Generated Text:", text)

	return text, nil
}
