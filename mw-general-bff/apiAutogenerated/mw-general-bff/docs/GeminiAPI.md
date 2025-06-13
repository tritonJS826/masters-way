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
[**AiQuestionTest**](GeminiAPI.md#AiQuestionTest) | **Post** /gemini/test/questions | Generate questions for test
[**AiTheoryMaterialForTopic**](GeminiAPI.md#AiTheoryMaterialForTopic) | **Post** /gemini/trainings/theoryMaterial | Generate theory material for training
[**AiTopicForTraining**](GeminiAPI.md#AiTopicForTraining) | **Post** /gemini/trainings/topics | 
[**AiTrainingByTestSession**](GeminiAPI.md#AiTrainingByTestSession) | **Post** /gemini/training/topics/{sessionResultId} | Generate training by test test sessionId
[**GenerateMetrics**](GeminiAPI.md#GenerateMetrics) | **Post** /gemini/metrics | Generate metrics using Gemini



## AiChat

> MwGeneralBffInternalSchemasAIChatResponse AiChat(ctx).Request(request).Execute()

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
	request := *openapiclient.NewMwGeneralBffInternalSchemasAIChatPayload("ru|en|ua", "Message_example") // MwGeneralBffInternalSchemasAIChatPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiChat(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiChat``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiChat`: MwGeneralBffInternalSchemasAIChatResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiChat`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiChatRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwGeneralBffInternalSchemasAIChatPayload**](MwGeneralBffInternalSchemasAIChatPayload.md) | Request payload | 

### Return type

[**MwGeneralBffInternalSchemasAIChatResponse**](MwGeneralBffInternalSchemasAIChatResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiCommentIssue

> MwGeneralBffInternalSchemasAICommentIssueResponse AiCommentIssue(ctx).Request(request).Execute()

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
	request := *openapiclient.NewMwGeneralBffInternalSchemasAICommentIssuePayload("Goal_example", "ru|en|ua", "Message_example") // MwGeneralBffInternalSchemasAICommentIssuePayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiCommentIssue(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiCommentIssue``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiCommentIssue`: MwGeneralBffInternalSchemasAICommentIssueResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiCommentIssue`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiCommentIssueRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwGeneralBffInternalSchemasAICommentIssuePayload**](MwGeneralBffInternalSchemasAICommentIssuePayload.md) | Request payload | 

### Return type

[**MwGeneralBffInternalSchemasAICommentIssueResponse**](MwGeneralBffInternalSchemasAICommentIssueResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiDecomposeIssue

> MwGeneralBffInternalSchemasAIDecomposeIssueResponse AiDecomposeIssue(ctx).Request(request).Execute()

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
	request := *openapiclient.NewMwGeneralBffInternalSchemasAIDecomposeIssuePayload("Goal_example", "ru|en|ua", "Message_example") // MwGeneralBffInternalSchemasAIDecomposeIssuePayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiDecomposeIssue(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiDecomposeIssue``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiDecomposeIssue`: MwGeneralBffInternalSchemasAIDecomposeIssueResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiDecomposeIssue`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiDecomposeIssueRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwGeneralBffInternalSchemasAIDecomposeIssuePayload**](MwGeneralBffInternalSchemasAIDecomposeIssuePayload.md) | Request payload | 

### Return type

[**MwGeneralBffInternalSchemasAIDecomposeIssueResponse**](MwGeneralBffInternalSchemasAIDecomposeIssueResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiEstimateIssue

> MwGeneralBffInternalSchemasAIEstimateIssueResponse AiEstimateIssue(ctx).Request(request).Execute()

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
	request := *openapiclient.NewMwGeneralBffInternalSchemasAIEstimateIssuePayload("Goal_example", "Issue_example", "ru|en|ua") // MwGeneralBffInternalSchemasAIEstimateIssuePayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiEstimateIssue(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiEstimateIssue``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiEstimateIssue`: MwGeneralBffInternalSchemasAIEstimateIssueResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiEstimateIssue`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiEstimateIssueRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwGeneralBffInternalSchemasAIEstimateIssuePayload**](MwGeneralBffInternalSchemasAIEstimateIssuePayload.md) | Request payload | 

### Return type

[**MwGeneralBffInternalSchemasAIEstimateIssueResponse**](MwGeneralBffInternalSchemasAIEstimateIssueResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiPlansByMetrics

> MwGeneralBffInternalSchemasAIGeneratePlansByMetricResponse AiPlansByMetrics(ctx).Request(request).Execute()

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
	request := *openapiclient.NewMwGeneralBffInternalSchemasAIGeneratePlansByMetricPayload("Goal_example", "ru|en|ua", "Metric_example") // MwGeneralBffInternalSchemasAIGeneratePlansByMetricPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiPlansByMetrics(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiPlansByMetrics``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiPlansByMetrics`: MwGeneralBffInternalSchemasAIGeneratePlansByMetricResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiPlansByMetrics`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiPlansByMetricsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwGeneralBffInternalSchemasAIGeneratePlansByMetricPayload**](MwGeneralBffInternalSchemasAIGeneratePlansByMetricPayload.md) | Request payload | 

### Return type

[**MwGeneralBffInternalSchemasAIGeneratePlansByMetricResponse**](MwGeneralBffInternalSchemasAIGeneratePlansByMetricResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiPracticeMaterialForTopic

> MwGeneralBffInternalSchemasAIGeneratePracticeMaterialsForTrainingResponse AiPracticeMaterialForTopic(ctx).Request(request).Execute()

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
	request := *openapiclient.NewMwGeneralBffInternalSchemasAIGeneratePracticeMaterialForTopicPayload(int32(123), "ru|en|ua", "TopicId_example", "TrainingId_example") // MwGeneralBffInternalSchemasAIGeneratePracticeMaterialForTopicPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiPracticeMaterialForTopic(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiPracticeMaterialForTopic``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiPracticeMaterialForTopic`: MwGeneralBffInternalSchemasAIGeneratePracticeMaterialsForTrainingResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiPracticeMaterialForTopic`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiPracticeMaterialForTopicRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwGeneralBffInternalSchemasAIGeneratePracticeMaterialForTopicPayload**](MwGeneralBffInternalSchemasAIGeneratePracticeMaterialForTopicPayload.md) | Request payload | 

### Return type

[**MwGeneralBffInternalSchemasAIGeneratePracticeMaterialsForTrainingResponse**](MwGeneralBffInternalSchemasAIGeneratePracticeMaterialsForTrainingResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiQuestionTest

> MwGeneralBffInternalSchemasAIGenerateQuestionsForTestResponse AiQuestionTest(ctx).Request(request).Execute()

Generate questions for test



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
	request := *openapiclient.NewMwGeneralBffInternalSchemasAIGenerateQuestionsForTestPayload(int32(123), "ru|en|ua", "TestId_example") // MwGeneralBffInternalSchemasAIGenerateQuestionsForTestPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiQuestionTest(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiQuestionTest``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiQuestionTest`: MwGeneralBffInternalSchemasAIGenerateQuestionsForTestResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiQuestionTest`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiQuestionTestRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwGeneralBffInternalSchemasAIGenerateQuestionsForTestPayload**](MwGeneralBffInternalSchemasAIGenerateQuestionsForTestPayload.md) | Request payload | 

### Return type

[**MwGeneralBffInternalSchemasAIGenerateQuestionsForTestResponse**](MwGeneralBffInternalSchemasAIGenerateQuestionsForTestResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiTheoryMaterialForTopic

> MwGeneralBffInternalSchemasAIGenerateTheoryMaterialForTrainingResponse AiTheoryMaterialForTopic(ctx).Request(request).Execute()

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
	request := *openapiclient.NewMwGeneralBffInternalSchemasAIGenerateTheoryMaterialForTrainingPayload("ru|en|ua", "TopicId_example", "TrainingId_example") // MwGeneralBffInternalSchemasAIGenerateTheoryMaterialForTrainingPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiTheoryMaterialForTopic(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiTheoryMaterialForTopic``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiTheoryMaterialForTopic`: MwGeneralBffInternalSchemasAIGenerateTheoryMaterialForTrainingResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiTheoryMaterialForTopic`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiTheoryMaterialForTopicRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwGeneralBffInternalSchemasAIGenerateTheoryMaterialForTrainingPayload**](MwGeneralBffInternalSchemasAIGenerateTheoryMaterialForTrainingPayload.md) | Request payload | 

### Return type

[**MwGeneralBffInternalSchemasAIGenerateTheoryMaterialForTrainingResponse**](MwGeneralBffInternalSchemasAIGenerateTheoryMaterialForTrainingResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiTopicForTraining

> MwGeneralBffInternalSchemasAIGenerateTopicsForTrainingResponse AiTopicForTraining(ctx).Request(request).Execute()





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
	request := *openapiclient.NewMwGeneralBffInternalSchemasAIGenerateTopicsForTrainingPayload("ru|en|ua", int32(123), "TrainingId_example") // MwGeneralBffInternalSchemasAIGenerateTopicsForTrainingPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiTopicForTraining(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiTopicForTraining``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiTopicForTraining`: MwGeneralBffInternalSchemasAIGenerateTopicsForTrainingResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiTopicForTraining`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiTopicForTrainingRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwGeneralBffInternalSchemasAIGenerateTopicsForTrainingPayload**](MwGeneralBffInternalSchemasAIGenerateTopicsForTrainingPayload.md) | Request payload | 

### Return type

[**MwGeneralBffInternalSchemasAIGenerateTopicsForTrainingResponse**](MwGeneralBffInternalSchemasAIGenerateTopicsForTrainingResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiTrainingByTestSession

> MwGeneralBffInternalSchemasAIGenerateTrainingByTestTestSessionIdResponse AiTrainingByTestSession(ctx, sessionResultId).Request(request).Execute()

Generate training by test test sessionId



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
	sessionResultId := "sessionResultId_example" // string | test session ID
	request := *openapiclient.NewMwGeneralBffInternalSchemasAIGenerateTrainingByTestTestSessionIdPayload(int32(123), "ru|en|ua", int32(123), "TestId_example", "TestSessionId_example") // MwGeneralBffInternalSchemasAIGenerateTrainingByTestTestSessionIdPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiTrainingByTestSession(context.Background(), sessionResultId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiTrainingByTestSession``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiTrainingByTestSession`: MwGeneralBffInternalSchemasAIGenerateTrainingByTestTestSessionIdResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiTrainingByTestSession`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**sessionResultId** | **string** | test session ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiAiTrainingByTestSessionRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwGeneralBffInternalSchemasAIGenerateTrainingByTestTestSessionIdPayload**](MwGeneralBffInternalSchemasAIGenerateTrainingByTestTestSessionIdPayload.md) | Request payload | 

### Return type

[**MwGeneralBffInternalSchemasAIGenerateTrainingByTestTestSessionIdResponse**](MwGeneralBffInternalSchemasAIGenerateTrainingByTestTestSessionIdResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GenerateMetrics

> MwGeneralBffInternalSchemasGenerateMetricsResponse GenerateMetrics(ctx).Request(request).Execute()

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
	request := *openapiclient.NewMwGeneralBffInternalSchemasGenerateMetricsPayload("GoalDescription_example", "ru|en|ua", []string{"Metrics_example"}, "WayName_example") // MwGeneralBffInternalSchemasGenerateMetricsPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.GenerateMetrics(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.GenerateMetrics``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GenerateMetrics`: MwGeneralBffInternalSchemasGenerateMetricsResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.GenerateMetrics`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGenerateMetricsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwGeneralBffInternalSchemasGenerateMetricsPayload**](MwGeneralBffInternalSchemasGenerateMetricsPayload.md) | Request payload | 

### Return type

[**MwGeneralBffInternalSchemasGenerateMetricsResponse**](MwGeneralBffInternalSchemasGenerateMetricsResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

