# \TestSessionResultAPI

All URIs are relative to *http://localhost/mw-training*

Method | HTTP request | Description
------------- | ------------- | -------------
[**GetTestSessionResultBySessionUuid**](TestSessionResultAPI.md#GetTestSessionResultBySessionUuid) | **Get** /testSessionResult | Get test session result by session uuid



## GetTestSessionResultBySessionUuid

> MwTrainingBffInternalSchemasGetTestSessionResultResponse GetTestSessionResultBySessionUuid(ctx).Request(request).Execute()

Get test session result by session uuid

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
	request := *openapiclient.NewMwTrainingBffInternalSchemasGetTestSessionResultRequest("SessionUuid_example") // MwTrainingBffInternalSchemasGetTestSessionResultRequest | body

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TestSessionResultAPI.GetTestSessionResultBySessionUuid(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TestSessionResultAPI.GetTestSessionResultBySessionUuid``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetTestSessionResultBySessionUuid`: MwTrainingBffInternalSchemasGetTestSessionResultResponse
	fmt.Fprintf(os.Stdout, "Response from `TestSessionResultAPI.GetTestSessionResultBySessionUuid`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGetTestSessionResultBySessionUuidRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwTrainingBffInternalSchemasGetTestSessionResultRequest**](MwTrainingBffInternalSchemasGetTestSessionResultRequest.md) | body | 

### Return type

[**MwTrainingBffInternalSchemasGetTestSessionResultResponse**](MwTrainingBffInternalSchemasGetTestSessionResultResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

