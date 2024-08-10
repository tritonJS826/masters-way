# \GeminiAPI

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**GenerateMetrics**](GeminiAPI.md#GenerateMetrics) | **Post** /gemini/metrics | Generate metrics using Gemini



## GenerateMetrics

> []string GenerateMetrics(ctx).Request(request).Execute()

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
	// response from `GenerateMetrics`: []string
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

**[]string**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

