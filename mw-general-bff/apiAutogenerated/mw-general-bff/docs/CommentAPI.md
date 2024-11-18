# \CommentAPI

All URIs are relative to */general*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateComment**](CommentAPI.md#CreateComment) | **Post** /comments | Create a new comment
[**DeleteComment**](CommentAPI.md#DeleteComment) | **Delete** /comments/{commentId} | Delete comment by UUID
[**UpdateComment**](CommentAPI.md#UpdateComment) | **Patch** /comments/{commentId} | Update comment by UUID



## CreateComment

> MwGeneralBffInternalSchemasCommentPopulatedResponse CreateComment(ctx).Request(request).Execute()

Create a new comment

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
	request := *openapiclient.NewMwGeneralBffInternalSchemasCreateCommentPayload("DayReportUuid_example", "Description_example", "OwnerUuid_example") // MwGeneralBffInternalSchemasCreateCommentPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.CommentAPI.CreateComment(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `CommentAPI.CreateComment``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateComment`: MwGeneralBffInternalSchemasCommentPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `CommentAPI.CreateComment`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateCommentRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwGeneralBffInternalSchemasCreateCommentPayload**](MwGeneralBffInternalSchemasCreateCommentPayload.md) | query params | 

### Return type

[**MwGeneralBffInternalSchemasCommentPopulatedResponse**](MwGeneralBffInternalSchemasCommentPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteComment

> DeleteComment(ctx, commentId).Execute()

Delete comment by UUID

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
	commentId := "commentId_example" // string | comment ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.CommentAPI.DeleteComment(context.Background(), commentId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `CommentAPI.DeleteComment``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**commentId** | **string** | comment ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteCommentRequest struct via the builder pattern


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


## UpdateComment

> MwGeneralBffInternalSchemasCommentPopulatedResponse UpdateComment(ctx, commentId).Request(request).Execute()

Update comment by UUID

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
	commentId := "commentId_example" // string | comment ID
	request := *openapiclient.NewMwGeneralBffInternalSchemasUpdateCommentPayload() // MwGeneralBffInternalSchemasUpdateCommentPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.CommentAPI.UpdateComment(context.Background(), commentId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `CommentAPI.UpdateComment``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateComment`: MwGeneralBffInternalSchemasCommentPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `CommentAPI.UpdateComment`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**commentId** | **string** | comment ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateCommentRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwGeneralBffInternalSchemasUpdateCommentPayload**](MwGeneralBffInternalSchemasUpdateCommentPayload.md) | query params | 

### Return type

[**MwGeneralBffInternalSchemasCommentPopulatedResponse**](MwGeneralBffInternalSchemasCommentPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

