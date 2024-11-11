# \GeminiAPI

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**AiChat**](GeminiAPI.md#AiChat) | **Post** /gemini/just-chat | Just chat with AI
[**AiCommentIssue**](GeminiAPI.md#AiCommentIssue) | **Post** /gemini/comment-issue | Generate a comment for any issue
[**AiDecomposeIssue**](GeminiAPI.md#AiDecomposeIssue) | **Post** /gemini/decompose-issue | Decompose issue
[**AiEstimateIssue**](GeminiAPI.md#AiEstimateIssue) | **Post** /gemini/estimate-issue | Estimate issue in minutes
[**AiPlansByMetrics**](GeminiAPI.md#AiPlansByMetrics) | **Post** /gemini/generate-plans-by-metric | Generate plans by metric
[**GenerateMetrics**](GeminiAPI.md#GenerateMetrics) | **Post** /gemini/metrics | Generate metrics using Gemini



## AiChat

> MwserverInternalSchemasAIChatResponse AiChat(ctx).Request(request).Execute()

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
	request := *openapiclient.NewMwserverInternalSchemasAIChatPayload("Message_example") // MwserverInternalSchemasAIChatPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiChat(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiChat``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiChat`: MwserverInternalSchemasAIChatResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiChat`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiChatRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwserverInternalSchemasAIChatPayload**](MwserverInternalSchemasAIChatPayload.md) | Request payload | 

### Return type

[**MwserverInternalSchemasAIChatResponse**](MwserverInternalSchemasAIChatResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiCommentIssue

> MwserverInternalSchemasAICommentIssueResponse AiCommentIssue(ctx).Request(request).Execute()

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
	request := *openapiclient.NewMwserverInternalSchemasAICommentIssuePayload("Goal_example", "Message_example") // MwserverInternalSchemasAICommentIssuePayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiCommentIssue(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiCommentIssue``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiCommentIssue`: MwserverInternalSchemasAICommentIssueResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiCommentIssue`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiCommentIssueRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwserverInternalSchemasAICommentIssuePayload**](MwserverInternalSchemasAICommentIssuePayload.md) | Request payload | 

### Return type

[**MwserverInternalSchemasAICommentIssueResponse**](MwserverInternalSchemasAICommentIssueResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiDecomposeIssue

> MwserverInternalSchemasAIDecomposeIssueResponse AiDecomposeIssue(ctx).Request(request).Execute()

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
	request := *openapiclient.NewMwserverInternalSchemasAIDecomposeIssuePayload("Goal_example", "Message_example") // MwserverInternalSchemasAIDecomposeIssuePayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiDecomposeIssue(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiDecomposeIssue``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiDecomposeIssue`: MwserverInternalSchemasAIDecomposeIssueResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiDecomposeIssue`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiDecomposeIssueRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwserverInternalSchemasAIDecomposeIssuePayload**](MwserverInternalSchemasAIDecomposeIssuePayload.md) | Request payload | 

### Return type

[**MwserverInternalSchemasAIDecomposeIssueResponse**](MwserverInternalSchemasAIDecomposeIssueResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiEstimateIssue

> MwserverInternalSchemasAIEstimateIssueResponse AiEstimateIssue(ctx).Request(request).Execute()

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
	request := *openapiclient.NewMwserverInternalSchemasAIEstimateIssuePayload("Goal_example", "Issue_example") // MwserverInternalSchemasAIEstimateIssuePayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiEstimateIssue(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiEstimateIssue``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiEstimateIssue`: MwserverInternalSchemasAIEstimateIssueResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiEstimateIssue`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiEstimateIssueRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwserverInternalSchemasAIEstimateIssuePayload**](MwserverInternalSchemasAIEstimateIssuePayload.md) | Request payload | 

### Return type

[**MwserverInternalSchemasAIEstimateIssueResponse**](MwserverInternalSchemasAIEstimateIssueResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiPlansByMetrics

> MwserverInternalSchemasAIGeneratePlansByMetricResponse AiPlansByMetrics(ctx).Request(request).Execute()

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
	request := *openapiclient.NewMwserverInternalSchemasAIGeneratePlansByMetricPayload("Goal_example", "Metric_example") // MwserverInternalSchemasAIGeneratePlansByMetricPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiPlansByMetrics(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiPlansByMetrics``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiPlansByMetrics`: MwserverInternalSchemasAIGeneratePlansByMetricResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiPlansByMetrics`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiPlansByMetricsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwserverInternalSchemasAIGeneratePlansByMetricPayload**](MwserverInternalSchemasAIGeneratePlansByMetricPayload.md) | Request payload | 

### Return type

[**MwserverInternalSchemasAIGeneratePlansByMetricResponse**](MwserverInternalSchemasAIGeneratePlansByMetricResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GenerateMetrics

> MwserverInternalSchemasGenerateMetricsResponse GenerateMetrics(ctx).Request(request).Execute()

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
	request := *openapiclient.NewMwserverInternalSchemasGenerateMetricsPayload("GoalDescription_example", []string{"Metrics_example"}, "WayName_example") // MwserverInternalSchemasGenerateMetricsPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.GenerateMetrics(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.GenerateMetrics``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GenerateMetrics`: MwserverInternalSchemasGenerateMetricsResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.GenerateMetrics`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGenerateMetricsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwserverInternalSchemasGenerateMetricsPayload**](MwserverInternalSchemasGenerateMetricsPayload.md) | Request payload | 

### Return type

[**MwserverInternalSchemasGenerateMetricsResponse**](MwserverInternalSchemasGenerateMetricsResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

