# \QuestionAPI

All URIs are relative to *http://localhost/mw-training*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateQuestion**](QuestionAPI.md#CreateQuestion) | **Post** /question | Create question
[**DeleteQuestion**](QuestionAPI.md#DeleteQuestion) | **Delete** /question/{questionId} | Delete question by Uuid
[**UpdateQuestion**](QuestionAPI.md#UpdateQuestion) | **Patch** /question/{questionId} | Update question by uuid



## CreateQuestion

> MwTrainingBffInternalSchemasQuestion CreateQuestion(ctx).Request(request).Execute()

Create question

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
	request := *openapiclient.NewMwTrainingBffInternalSchemasCreateQuestionPayload("Answer_example", "Name_example", "PracticeType_example", "QuestionText_example", "TestUuid_example", int32(123)) // MwTrainingBffInternalSchemasCreateQuestionPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.QuestionAPI.CreateQuestion(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `QuestionAPI.CreateQuestion``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateQuestion`: MwTrainingBffInternalSchemasQuestion
	fmt.Fprintf(os.Stdout, "Response from `QuestionAPI.CreateQuestion`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateQuestionRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwTrainingBffInternalSchemasCreateQuestionPayload**](MwTrainingBffInternalSchemasCreateQuestionPayload.md) | query params | 

### Return type

[**MwTrainingBffInternalSchemasQuestion**](MwTrainingBffInternalSchemasQuestion.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteQuestion

> DeleteQuestion(ctx, questionId).Execute()

Delete question by Uuid

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
	questionId := "questionId_example" // string | question id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.QuestionAPI.DeleteQuestion(context.Background(), questionId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `QuestionAPI.DeleteQuestion``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**questionId** | **string** | question id | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteQuestionRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateQuestion

> MwTrainingBffInternalSchemasQuestion UpdateQuestion(ctx, questionId).Request(request).Execute()

Update question by uuid

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
	questionId := "questionId_example" // string | topic id
	request := *openapiclient.NewMwTrainingBffInternalSchemasUpdateQuestionPayload() // MwTrainingBffInternalSchemasUpdateQuestionPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.QuestionAPI.UpdateQuestion(context.Background(), questionId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `QuestionAPI.UpdateQuestion``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateQuestion`: MwTrainingBffInternalSchemasQuestion
	fmt.Fprintf(os.Stdout, "Response from `QuestionAPI.UpdateQuestion`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**questionId** | **string** | topic id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateQuestionRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwTrainingBffInternalSchemasUpdateQuestionPayload**](MwTrainingBffInternalSchemasUpdateQuestionPayload.md) | query params | 

### Return type

[**MwTrainingBffInternalSchemasQuestion**](MwTrainingBffInternalSchemasQuestion.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

