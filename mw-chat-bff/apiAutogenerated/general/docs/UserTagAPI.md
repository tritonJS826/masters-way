# \UserTagAPI

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateUserTag**](UserTagAPI.md#CreateUserTag) | **Post** /userTags | Create a new userTag
[**DeleteUserTag**](UserTagAPI.md#DeleteUserTag) | **Delete** /userTags/{userTagId}/{userId} | Delete userTag by UUID



## CreateUserTag

> SchemasUserTagResponse CreateUserTag(ctx).Request(request).Execute()

Create a new userTag

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
	request := *openapiclient.NewSchemasCreateUserTagPayload("Name_example", "OwnerUuid_example") // SchemasCreateUserTagPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.UserTagAPI.CreateUserTag(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `UserTagAPI.CreateUserTag``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateUserTag`: SchemasUserTagResponse
	fmt.Fprintf(os.Stdout, "Response from `UserTagAPI.CreateUserTag`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateUserTagRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasCreateUserTagPayload**](SchemasCreateUserTagPayload.md) | query params | 

### Return type

[**SchemasUserTagResponse**](SchemasUserTagResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteUserTag

> DeleteUserTag(ctx, userTagId, userId).Execute()

Delete userTag by UUID

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
	userTagId := "userTagId_example" // string | userTag ID
	userId := "userId_example" // string | user ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.UserTagAPI.DeleteUserTag(context.Background(), userTagId, userId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `UserTagAPI.DeleteUserTag``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**userTagId** | **string** | userTag ID | 
**userId** | **string** | user ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteUserTagRequest struct via the builder pattern


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

