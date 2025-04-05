# \UserContactAPI

All URIs are relative to */general*

Method | HTTP request | Description
------------- | ------------- | -------------
[**DeleteUserContact**](UserContactAPI.md#DeleteUserContact) | **Delete** /users/{userId}/contacts/{contactId} | Delete DeleteUserContact by UUID
[**UpdateUserContact**](UserContactAPI.md#UpdateUserContact) | **Patch** /users/{userId}/contact/{contactId} | Update user contact by UUID



## DeleteUserContact

> DeleteUserContact(ctx, userId, contactId).Execute()

Delete DeleteUserContact by UUID

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
	contactId := "contactId_example" // string | contactId ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.UserContactAPI.DeleteUserContact(context.Background(), userId, contactId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `UserContactAPI.DeleteUserContact``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**userId** | **string** | user ID | 
**contactId** | **string** | contactId ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteUserContactRequest struct via the builder pattern


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


## UpdateUserContact

> MwServerInternalSchemasUserContact UpdateUserContact(ctx, userId, contactId).Request(request).Execute()

Update user contact by UUID

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
	contactId := "contactId_example" // string | contactId ID
	request := *openapiclient.NewMwServerInternalSchemasUpdateUserContactPayload() // MwServerInternalSchemasUpdateUserContactPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.UserContactAPI.UpdateUserContact(context.Background(), userId, contactId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `UserContactAPI.UpdateUserContact``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateUserContact`: MwServerInternalSchemasUserContact
	fmt.Fprintf(os.Stdout, "Response from `UserContactAPI.UpdateUserContact`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**userId** | **string** | user ID | 
**contactId** | **string** | contactId ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateUserContactRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


 **request** | [**MwServerInternalSchemasUpdateUserContactPayload**](MwServerInternalSchemasUpdateUserContactPayload.md) | query params | 

### Return type

[**MwServerInternalSchemasUserContact**](MwServerInternalSchemasUserContact.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

