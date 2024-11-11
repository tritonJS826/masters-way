# \UserAPI

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**GetAllUsers**](UserAPI.md#GetAllUsers) | **Get** /users | Get all users
[**GetUserByUuid**](UserAPI.md#GetUserByUuid) | **Get** /users/{userId} | Get user by UUID
[**GetUsersByIds**](UserAPI.md#GetUsersByIds) | **Get** /users/list-by-ids | Get users by ids
[**UpdateUser**](UserAPI.md#UpdateUser) | **Patch** /users/{userId} | Update user by UUID



## GetAllUsers

> MwserverInternalSchemasGetAllUsersResponse GetAllUsers(ctx).Page(page).Limit(limit).Email(email).Name(name).MentorStatus(mentorStatus).Execute()

Get all users



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
	page := int32(56) // int32 | Page number for pagination (optional)
	limit := int32(56) // int32 | Number of items per page (optional)
	email := "email_example" // string | Part of user email for filters (optional)
	name := "name_example" // string | Part of user name for filters (optional)
	mentorStatus := "mentorStatus_example" // string | 'mentor' | 'all' status for filter (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.UserAPI.GetAllUsers(context.Background()).Page(page).Limit(limit).Email(email).Name(name).MentorStatus(mentorStatus).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `UserAPI.GetAllUsers``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetAllUsers`: MwserverInternalSchemasGetAllUsersResponse
	fmt.Fprintf(os.Stdout, "Response from `UserAPI.GetAllUsers`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGetAllUsersRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **int32** | Page number for pagination | 
 **limit** | **int32** | Number of items per page | 
 **email** | **string** | Part of user email for filters | 
 **name** | **string** | Part of user name for filters | 
 **mentorStatus** | **string** | &#39;mentor&#39; | &#39;all&#39; status for filter | 

### Return type

[**MwserverInternalSchemasGetAllUsersResponse**](MwserverInternalSchemasGetAllUsersResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetUserByUuid

> MwserverInternalSchemasUserPopulatedResponse GetUserByUuid(ctx, userId).Execute()

Get user by UUID

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
	userId := "userId_example" // string | user ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.UserAPI.GetUserByUuid(context.Background(), userId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `UserAPI.GetUserByUuid``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetUserByUuid`: MwserverInternalSchemasUserPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `UserAPI.GetUserByUuid`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**userId** | **string** | user ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetUserByUuidRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**MwserverInternalSchemasUserPopulatedResponse**](MwserverInternalSchemasUserPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetUsersByIds

> []MwserverInternalSchemasGetUsersByIDsResponse GetUsersByIds(ctx).Request(request).Execute()

Get users by ids

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
	request := []string{"Property_example"} // []string | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.UserAPI.GetUsersByIds(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `UserAPI.GetUsersByIds``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetUsersByIds`: []MwserverInternalSchemasGetUsersByIDsResponse
	fmt.Fprintf(os.Stdout, "Response from `UserAPI.GetUsersByIds`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGetUsersByIdsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | **[]string** | query params | 

### Return type

[**[]MwserverInternalSchemasGetUsersByIDsResponse**](MwserverInternalSchemasGetUsersByIDsResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateUser

> MwserverInternalSchemasUserPlainResponse UpdateUser(ctx, userId).Request(request).Execute()

Update user by UUID

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
	userId := "userId_example" // string | user ID
	request := *openapiclient.NewMwserverInternalSchemasUpdateUserPayload() // MwserverInternalSchemasUpdateUserPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.UserAPI.UpdateUser(context.Background(), userId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `UserAPI.UpdateUser``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateUser`: MwserverInternalSchemasUserPlainResponse
	fmt.Fprintf(os.Stdout, "Response from `UserAPI.UpdateUser`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**userId** | **string** | user ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateUserRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwserverInternalSchemasUpdateUserPayload**](MwserverInternalSchemasUpdateUserPayload.md) | query params | 

### Return type

[**MwserverInternalSchemasUserPlainResponse**](MwserverInternalSchemasUserPlainResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

