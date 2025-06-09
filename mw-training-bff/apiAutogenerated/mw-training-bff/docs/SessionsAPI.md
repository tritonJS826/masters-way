# \SessionsAPI

All URIs are relative to *http://localhost/mw-training*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateSession**](SessionsAPI.md#CreateSession) | **Post** /session | Create session



## CreateSession

> MwTrainingBffInternalSchemasTestSession CreateSession(ctx).Request(request).Execute()

Create session

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
	request := *openapiclient.NewMwTrainingBffInternalSchemasCreateSessionRequest("UserUuid_example") // MwTrainingBffInternalSchemasCreateSessionRequest | body

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.SessionsAPI.CreateSession(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SessionsAPI.CreateSession``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateSession`: MwTrainingBffInternalSchemasTestSession
	fmt.Fprintf(os.Stdout, "Response from `SessionsAPI.CreateSession`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateSessionRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwTrainingBffInternalSchemasCreateSessionRequest**](MwTrainingBffInternalSchemasCreateSessionRequest.md) | body | 

### Return type

[**MwTrainingBffInternalSchemasTestSession**](MwTrainingBffInternalSchemasTestSession.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

