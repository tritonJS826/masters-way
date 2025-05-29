# \QuestionResultAPI

All URIs are relative to *http://localhost/mw-training*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateQuestionResult**](QuestionResultAPI.md#CreateQuestionResult) | **Post** /questionResult | Create question result
[**GetQuestionResultsBySessionUuid**](QuestionResultAPI.md#GetQuestionResultsBySessionUuid) | **Get** /questionResult/session/{sessionId} | Get question results by session UUID



## CreateQuestionResult

> MwTrainingBffInternalSchemasQuestionResult CreateQuestionResult(ctx).Request(request).Execute()

Create question result

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
	request := *openapiclient.NewMwTrainingBffInternalSchemasCreateQuestionResultRequest(false, "QuestionUuid_example", "ResultDescription_example", "TestSessionUuid_example", "TestUuid_example", "UserUuid_example") // MwTrainingBffInternalSchemasCreateQuestionResultRequest | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.QuestionResultAPI.CreateQuestionResult(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `QuestionResultAPI.CreateQuestionResult``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateQuestionResult`: MwTrainingBffInternalSchemasQuestionResult
	fmt.Fprintf(os.Stdout, "Response from `QuestionResultAPI.CreateQuestionResult`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateQuestionResultRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwTrainingBffInternalSchemasCreateQuestionResultRequest**](MwTrainingBffInternalSchemasCreateQuestionResultRequest.md) | query params | 

### Return type

[**MwTrainingBffInternalSchemasQuestionResult**](MwTrainingBffInternalSchemasQuestionResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetQuestionResultsBySessionUuid

> []MwTrainingBffInternalSchemasQuestionResult GetQuestionResultsBySessionUuid(ctx, sessionId).Execute()

Get question results by session UUID

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
	sessionId := "sessionId_example" // string | session id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.QuestionResultAPI.GetQuestionResultsBySessionUuid(context.Background(), sessionId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `QuestionResultAPI.GetQuestionResultsBySessionUuid``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetQuestionResultsBySessionUuid`: []MwTrainingBffInternalSchemasQuestionResult
	fmt.Fprintf(os.Stdout, "Response from `QuestionResultAPI.GetQuestionResultsBySessionUuid`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**sessionId** | **string** | session id | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetQuestionResultsBySessionUuidRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**[]MwTrainingBffInternalSchemasQuestionResult**](MwTrainingBffInternalSchemasQuestionResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

