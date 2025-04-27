# \GeminiAPI

All URIs are relative to */general*

Method | HTTP request | Description
------------- | ------------- | -------------
[**AiChat**](GeminiAPI.md#AiChat) | **Post** /gemini/just-chat | Just chat with AI
[**AiCommentIssue**](GeminiAPI.md#AiCommentIssue) | **Post** /gemini/comment-issue | Generate a comment for any issue
[**AiDecomposeIssue**](GeminiAPI.md#AiDecomposeIssue) | **Post** /gemini/decompose-issue | Decompose issue
[**AiEstimateIssue**](GeminiAPI.md#AiEstimateIssue) | **Post** /gemini/estimate-issue | Estimate issue in minutes
[**AiPlansByMetrics**](GeminiAPI.md#AiPlansByMetrics) | **Post** /gemini/generate-plans-by-metric | Generate plans by metric
[**AiPracticeMaterialForTopic**](GeminiAPI.md#AiPracticeMaterialForTopic) | **Post** /gemini/trainings/practiceMaterial | Generate practice material for training
[**AiTheoryMaterialForTopic**](GeminiAPI.md#AiTheoryMaterialForTopic) | **Post** /gemini/trainings/theoryMaterial | Generate theory material for training
[**AiTopicForTraining**](GeminiAPI.md#AiTopicForTraining) | **Post** /gemini/trainings/topics | 
[**GenerateMetrics**](GeminiAPI.md#GenerateMetrics) | **Post** /gemini/metrics | Generate metrics using Gemini



## AiChat

> MwServerInternalSchemasAIChatResponse AiChat(ctx).Request(request).Execute()

Just chat with AI



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
	request := *openapiclient.NewMwServerInternalSchemasAIChatPayload("Message_example") // MwServerInternalSchemasAIChatPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiChat(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiChat``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiChat`: MwServerInternalSchemasAIChatResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiChat`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiChatRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwServerInternalSchemasAIChatPayload**](MwServerInternalSchemasAIChatPayload.md) | Request payload | 

### Return type

[**MwServerInternalSchemasAIChatResponse**](MwServerInternalSchemasAIChatResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiCommentIssue

> MwServerInternalSchemasAICommentIssueResponse AiCommentIssue(ctx).Request(request).Execute()

Generate a comment for any issue



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
	request := *openapiclient.NewMwServerInternalSchemasAICommentIssuePayload("Goal_example", "Message_example") // MwServerInternalSchemasAICommentIssuePayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiCommentIssue(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiCommentIssue``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiCommentIssue`: MwServerInternalSchemasAICommentIssueResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiCommentIssue`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiCommentIssueRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwServerInternalSchemasAICommentIssuePayload**](MwServerInternalSchemasAICommentIssuePayload.md) | Request payload | 

### Return type

[**MwServerInternalSchemasAICommentIssueResponse**](MwServerInternalSchemasAICommentIssueResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiDecomposeIssue

> MwServerInternalSchemasAIDecomposeIssueResponse AiDecomposeIssue(ctx).Request(request).Execute()

Decompose issue



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
	request := *openapiclient.NewMwServerInternalSchemasAIDecomposeIssuePayload("Goal_example", "Message_example") // MwServerInternalSchemasAIDecomposeIssuePayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiDecomposeIssue(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiDecomposeIssue``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiDecomposeIssue`: MwServerInternalSchemasAIDecomposeIssueResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiDecomposeIssue`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiDecomposeIssueRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwServerInternalSchemasAIDecomposeIssuePayload**](MwServerInternalSchemasAIDecomposeIssuePayload.md) | Request payload | 

### Return type

[**MwServerInternalSchemasAIDecomposeIssueResponse**](MwServerInternalSchemasAIDecomposeIssueResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiEstimateIssue

> MwServerInternalSchemasAIEstimateIssueResponse AiEstimateIssue(ctx).Request(request).Execute()

Estimate issue in minutes



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
	request := *openapiclient.NewMwServerInternalSchemasAIEstimateIssuePayload("Goal_example", "Issue_example") // MwServerInternalSchemasAIEstimateIssuePayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiEstimateIssue(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiEstimateIssue``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiEstimateIssue`: MwServerInternalSchemasAIEstimateIssueResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiEstimateIssue`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiEstimateIssueRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwServerInternalSchemasAIEstimateIssuePayload**](MwServerInternalSchemasAIEstimateIssuePayload.md) | Request payload | 

### Return type

[**MwServerInternalSchemasAIEstimateIssueResponse**](MwServerInternalSchemasAIEstimateIssueResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiPlansByMetrics

> MwServerInternalSchemasAIGeneratePlansByMetricResponse AiPlansByMetrics(ctx).Request(request).Execute()

Generate plans by metric



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
	request := *openapiclient.NewMwServerInternalSchemasAIGeneratePlansByMetricPayload("Goal_example", "Metric_example") // MwServerInternalSchemasAIGeneratePlansByMetricPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiPlansByMetrics(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiPlansByMetrics``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiPlansByMetrics`: MwServerInternalSchemasAIGeneratePlansByMetricResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiPlansByMetrics`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiPlansByMetricsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwServerInternalSchemasAIGeneratePlansByMetricPayload**](MwServerInternalSchemasAIGeneratePlansByMetricPayload.md) | Request payload | 

### Return type

[**MwServerInternalSchemasAIGeneratePlansByMetricResponse**](MwServerInternalSchemasAIGeneratePlansByMetricResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiPracticeMaterialForTopic

> MwServerInternalSchemasAIGeneratePracticeMaterialsForTrainingResponse AiPracticeMaterialForTopic(ctx).Request(request).Execute()

Generate practice material for training



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
	request := *openapiclient.NewMwServerInternalSchemasAIGeneratePracticeMaterialForTrainingPayload([]string{"ExistentPracticeMaterials_example"}, []string{"ExistentTopics_example"}, int32(123), "Goal_example", "TopicName_example", "TrainingName_example") // MwServerInternalSchemasAIGeneratePracticeMaterialForTrainingPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiPracticeMaterialForTopic(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiPracticeMaterialForTopic``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiPracticeMaterialForTopic`: MwServerInternalSchemasAIGeneratePracticeMaterialsForTrainingResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiPracticeMaterialForTopic`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiPracticeMaterialForTopicRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwServerInternalSchemasAIGeneratePracticeMaterialForTrainingPayload**](MwServerInternalSchemasAIGeneratePracticeMaterialForTrainingPayload.md) | Request payload | 

### Return type

[**MwServerInternalSchemasAIGeneratePracticeMaterialsForTrainingResponse**](MwServerInternalSchemasAIGeneratePracticeMaterialsForTrainingResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiTheoryMaterialForTopic

> MwServerInternalSchemasAIGenerateTheoryMaterialForTrainingResponse AiTheoryMaterialForTopic(ctx).Request(request).Execute()

Generate theory material for training



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
	request := *openapiclient.NewMwServerInternalSchemasAIGenerateTheoryMaterialForTrainingPayload([]string{"ExistentPracticeMaterials_example"}, []string{"ExistentTopics_example"}, "Goal_example", "TopicName_example", "TrainingName_example") // MwServerInternalSchemasAIGenerateTheoryMaterialForTrainingPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiTheoryMaterialForTopic(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiTheoryMaterialForTopic``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiTheoryMaterialForTopic`: MwServerInternalSchemasAIGenerateTheoryMaterialForTrainingResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiTheoryMaterialForTopic`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiTheoryMaterialForTopicRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwServerInternalSchemasAIGenerateTheoryMaterialForTrainingPayload**](MwServerInternalSchemasAIGenerateTheoryMaterialForTrainingPayload.md) | Request payload | 

### Return type

[**MwServerInternalSchemasAIGenerateTheoryMaterialForTrainingResponse**](MwServerInternalSchemasAIGenerateTheoryMaterialForTrainingResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiTopicForTraining

> MwServerInternalSchemasAIGenerateTopicsForTrainingResponse AiTopicForTraining(ctx).Request(request).Execute()





### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
	request := *openapiclient.NewMwServerInternalSchemasAIGenerateTopicsForTrainingPayload("Goal_example", int32(123), "TrainingName_example") // MwServerInternalSchemasAIGenerateTopicsForTrainingPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiTopicForTraining(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiTopicForTraining``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiTopicForTraining`: MwServerInternalSchemasAIGenerateTopicsForTrainingResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiTopicForTraining`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiTopicForTrainingRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwServerInternalSchemasAIGenerateTopicsForTrainingPayload**](MwServerInternalSchemasAIGenerateTopicsForTrainingPayload.md) | Request payload | 

### Return type

[**MwServerInternalSchemasAIGenerateTopicsForTrainingResponse**](MwServerInternalSchemasAIGenerateTopicsForTrainingResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GenerateMetrics

> MwServerInternalSchemasGenerateMetricsResponse GenerateMetrics(ctx).Request(request).Execute()

Generate metrics using Gemini



### Example

```go
package main

import (
	"context"
	"fmt"
	"os"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func main() {
	request := *openapiclient.NewMwServerInternalSchemasGenerateMetricsPayload("GoalDescription_example", []string{"Metrics_example"}, "WayName_example") // MwServerInternalSchemasGenerateMetricsPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.GenerateMetrics(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.GenerateMetrics``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GenerateMetrics`: MwServerInternalSchemasGenerateMetricsResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.GenerateMetrics`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGenerateMetricsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwServerInternalSchemasGenerateMetricsPayload**](MwServerInternalSchemasGenerateMetricsPayload.md) | Request payload | 

### Return type

[**MwServerInternalSchemasGenerateMetricsResponse**](MwServerInternalSchemasGenerateMetricsResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

