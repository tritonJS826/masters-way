# \QuestionResultAPI

All URIs are relative to */general*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateAndCheckQuestionResult**](QuestionResultAPI.md#CreateAndCheckQuestionResult) | **Post** /questionResult/createAndCheck | Create and check question result



## CreateAndCheckQuestionResult

> MwGeneralBffInternalSchemasQuestionResult CreateAndCheckQuestionResult(ctx).Request(request).Execute()

Create and check question result



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
	request := *openapiclient.NewMwGeneralBffInternalSchemasCreateQuestionResultRequest(false, "ru|en|ua", "QuestionUuid_example", "ResultDescription_example", "TestSessionUuid_example", "TestUuid_example", "UserAnswer_example", "UserUuid_example") // MwGeneralBffInternalSchemasCreateQuestionResultRequest | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.QuestionResultAPI.CreateAndCheckQuestionResult(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `QuestionResultAPI.CreateAndCheckQuestionResult``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateAndCheckQuestionResult`: MwGeneralBffInternalSchemasQuestionResult
	fmt.Fprintf(os.Stdout, "Response from `QuestionResultAPI.CreateAndCheckQuestionResult`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateAndCheckQuestionResultRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwGeneralBffInternalSchemasCreateQuestionResultRequest**](MwGeneralBffInternalSchemasCreateQuestionResultRequest.md) | query params | 

### Return type

[**MwGeneralBffInternalSchemasQuestionResult**](MwGeneralBffInternalSchemasQuestionResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

