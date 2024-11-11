# \GeminiAPI

All URIs are relative to *http://localhost/general-bff*

Method | HTTP request | Description
------------- | ------------- | -------------
[**AiChat**](GeminiAPI.md#AiChat) | **Post** /gemini/just-chat | Just chat with AI
[**AiCommentIssue**](GeminiAPI.md#AiCommentIssue) | **Post** /gemini/comment-issue | Generate a comment for any issue
[**AiDecomposeIssue**](GeminiAPI.md#AiDecomposeIssue) | **Post** /gemini/decompose-issue | Decompose issue
[**AiEstimateIssue**](GeminiAPI.md#AiEstimateIssue) | **Post** /gemini/estimate-issue | Estimate issue in minutes
[**AiPlansByMetrics**](GeminiAPI.md#AiPlansByMetrics) | **Post** /gemini/generate-plans-by-metric | Generate plans by metric
[**GenerateMetrics**](GeminiAPI.md#GenerateMetrics) | **Post** /gemini/metrics | Generate metrics using Gemini



## AiChat

> SchemasAIChatResponse AiChat(ctx).Request(request).Execute()

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
	request := *openapiclient.NewSchemasAIChatPayload("Message_example") // SchemasAIChatPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiChat(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiChat``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiChat`: SchemasAIChatResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiChat`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiChatRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasAIChatPayload**](SchemasAIChatPayload.md) | Request payload | 

### Return type

[**SchemasAIChatResponse**](SchemasAIChatResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiCommentIssue

> SchemasAICommentIssueResponse AiCommentIssue(ctx).Request(request).Execute()

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
	request := *openapiclient.NewSchemasAICommentIssuePayload("Goal_example", "Message_example") // SchemasAICommentIssuePayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiCommentIssue(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiCommentIssue``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiCommentIssue`: SchemasAICommentIssueResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiCommentIssue`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiCommentIssueRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasAICommentIssuePayload**](SchemasAICommentIssuePayload.md) | Request payload | 

### Return type

[**SchemasAICommentIssueResponse**](SchemasAICommentIssueResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiDecomposeIssue

> SchemasAIDecomposeIssueResponse AiDecomposeIssue(ctx).Request(request).Execute()

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
	request := *openapiclient.NewSchemasAIDecomposeIssuePayload("Goal_example", "Message_example") // SchemasAIDecomposeIssuePayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiDecomposeIssue(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiDecomposeIssue``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiDecomposeIssue`: SchemasAIDecomposeIssueResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiDecomposeIssue`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiDecomposeIssueRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasAIDecomposeIssuePayload**](SchemasAIDecomposeIssuePayload.md) | Request payload | 

### Return type

[**SchemasAIDecomposeIssueResponse**](SchemasAIDecomposeIssueResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiEstimateIssue

> SchemasAIEstimateIssueResponse AiEstimateIssue(ctx).Request(request).Execute()

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
	request := *openapiclient.NewSchemasAIEstimateIssuePayload("Goal_example", "Issue_example") // SchemasAIEstimateIssuePayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiEstimateIssue(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiEstimateIssue``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiEstimateIssue`: SchemasAIEstimateIssueResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiEstimateIssue`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiEstimateIssueRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasAIEstimateIssuePayload**](SchemasAIEstimateIssuePayload.md) | Request payload | 

### Return type

[**SchemasAIEstimateIssueResponse**](SchemasAIEstimateIssueResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## AiPlansByMetrics

> SchemasAIGeneratePlansByMetricResponse AiPlansByMetrics(ctx).Request(request).Execute()

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
	request := *openapiclient.NewSchemasAIGeneratePlansByMetricPayload("Goal_example", "Metric_example") // SchemasAIGeneratePlansByMetricPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.AiPlansByMetrics(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.AiPlansByMetrics``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `AiPlansByMetrics`: SchemasAIGeneratePlansByMetricResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.AiPlansByMetrics`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiAiPlansByMetricsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasAIGeneratePlansByMetricPayload**](SchemasAIGeneratePlansByMetricPayload.md) | Request payload | 

### Return type

[**SchemasAIGeneratePlansByMetricResponse**](SchemasAIGeneratePlansByMetricResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GenerateMetrics

> SchemasGenerateMetricsResponse GenerateMetrics(ctx).Request(request).Execute()

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
	request := *openapiclient.NewSchemasGenerateMetricsPayload("GoalDescription_example", []string{"Metrics_example"}, "WayName_example") // SchemasGenerateMetricsPayload | Request payload

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.GeminiAPI.GenerateMetrics(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `GeminiAPI.GenerateMetrics``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GenerateMetrics`: SchemasGenerateMetricsResponse
	fmt.Fprintf(os.Stdout, "Response from `GeminiAPI.GenerateMetrics`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGenerateMetricsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasGenerateMetricsPayload**](SchemasGenerateMetricsPayload.md) | Request payload | 

### Return type

[**SchemasGenerateMetricsResponse**](SchemasGenerateMetricsResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

