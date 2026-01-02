# \CompanionAPI

All URIs are relative to */general*

Method | HTTP request | Description
------------- | ------------- | -------------
[**GetCompanionFeedback**](CompanionAPI.md#GetCompanionFeedback) | **Get** /companion/{wayId} | Get AI companion feedback for a way



## GetCompanionFeedback

> MwGeneralBffInternalSchemasCompanionFeedbackResponse GetCompanionFeedback(ctx, wayId).Execute()

Get AI companion feedback for a way



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
	wayId := "wayId_example" // string | Way UUID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.CompanionAPI.GetCompanionFeedback(context.Background(), wayId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `CompanionAPI.GetCompanionFeedback``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetCompanionFeedback`: MwGeneralBffInternalSchemasCompanionFeedbackResponse
	fmt.Fprintf(os.Stdout, "Response from `CompanionAPI.GetCompanionFeedback`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**wayId** | **string** | Way UUID | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetCompanionFeedbackRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**MwGeneralBffInternalSchemasCompanionFeedbackResponse**](MwGeneralBffInternalSchemasCompanionFeedbackResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

