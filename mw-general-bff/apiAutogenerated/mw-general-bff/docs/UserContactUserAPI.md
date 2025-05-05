# \UserContactUserAPI

All URIs are relative to */general*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateUserContact**](UserContactUserAPI.md#CreateUserContact) | **Post** /users/{userId}/contacts | Create user contact



## CreateUserContact

> MwGeneralBffInternalSchemasUserContact CreateUserContact(ctx, userId).Request(request).Execute()

Create user contact



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
	request := *openapiclient.NewMwGeneralBffInternalSchemasUpdateUserContactPayload() // MwGeneralBffInternalSchemasUpdateUserContactPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.UserContactUserAPI.CreateUserContact(context.Background(), userId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `UserContactUserAPI.CreateUserContact``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateUserContact`: MwGeneralBffInternalSchemasUserContact
	fmt.Fprintf(os.Stdout, "Response from `UserContactUserAPI.CreateUserContact`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**userId** | **string** | user ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiCreateUserContactRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwGeneralBffInternalSchemasUpdateUserContactPayload**](MwGeneralBffInternalSchemasUpdateUserContactPayload.md) | query params | 

### Return type

[**MwGeneralBffInternalSchemasUserContact**](MwGeneralBffInternalSchemasUserContact.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

