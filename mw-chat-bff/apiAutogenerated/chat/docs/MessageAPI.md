# \MessageAPI

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**UpdateMessageStatus**](MessageAPI.md#UpdateMessageStatus) | **Patch** /messages/{messageId}/message-status | Update message status



## UpdateMessageStatus

> UpdateMessageStatus(ctx, messageId).Request(request).Execute()

Update message status



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
	messageId := "messageId_example" // string | message Id
	request := *openapiclient.NewSchemasUpdateMessageStatusPayload(false) // SchemasUpdateMessageStatusPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.MessageAPI.UpdateMessageStatus(context.Background(), messageId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `MessageAPI.UpdateMessageStatus``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**messageId** | **string** | message Id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateMessageStatusRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**SchemasUpdateMessageStatusPayload**](SchemasUpdateMessageStatusPayload.md) | query params | 

### Return type

 (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

