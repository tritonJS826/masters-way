# \UserProjectAPI

All URIs are relative to */general*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateUserProject**](UserProjectAPI.md#CreateUserProject) | **Post** /userProjects | Add user to project
[**DeleteUserProject**](UserProjectAPI.md#DeleteUserProject) | **Delete** /userProjects/{projectId}/{userId} | Delete userProject by UUID



## CreateUserProject

> CreateUserProject(ctx).Request(request).Execute()

Add user to project

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
	request := *openapiclient.NewMwserverInternalSchemasCreateUserProjectPayload("ProjectId_example", "UserId_example") // MwserverInternalSchemasCreateUserProjectPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.UserProjectAPI.CreateUserProject(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `UserProjectAPI.CreateUserProject``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateUserProjectRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwserverInternalSchemasCreateUserProjectPayload**](MwserverInternalSchemasCreateUserProjectPayload.md) | query params | 

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


## DeleteUserProject

> DeleteUserProject(ctx, projectId, userId).Execute()

Delete userProject by UUID

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
	projectId := "projectId_example" // string | project ID
	userId := "userId_example" // string | user ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.UserProjectAPI.DeleteUserProject(context.Background(), projectId, userId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `UserProjectAPI.DeleteUserProject``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**projectId** | **string** | project ID | 
**userId** | **string** | user ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteUserProjectRequest struct via the builder pattern


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

