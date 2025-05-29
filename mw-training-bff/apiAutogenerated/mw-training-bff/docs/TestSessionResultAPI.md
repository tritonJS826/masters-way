# \TestSessionResultAPI

All URIs are relative to *http://localhost/mw-training*

Method | HTTP request | Description
------------- | ------------- | -------------
[**TestSessionResultGet**](TestSessionResultAPI.md#TestSessionResultGet) | **Get** /testSessionResult | Get TestSessionResult



## TestSessionResultGet

> MwTrainingBffInternalSchemasGetTestSessionResultResponse TestSessionResultGet(ctx).Request(request).Execute()

Get TestSessionResult



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
	resp, r, err := apiClient.TestSessionResultAPI.TestSessionResultGet(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TestSessionResultAPI.TestSessionResultGet``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `TestSessionResultGet`: MwTrainingBffInternalSchemasGetTestSessionResultResponse
	fmt.Fprintf(os.Stdout, "Response from `TestSessionResultAPI.TestSessionResultGet`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiTestSessionResultGetRequest struct via the builder pattern


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

