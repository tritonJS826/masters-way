# \AuthAPI

All URIs are relative to */general*

Method | HTTP request | Description
------------- | ------------- | -------------
[**BeginAuth**](AuthAPI.md#BeginAuth) | **Get** /auth/{provider} | Begin oauth
[**GetCurrentAuthorizedUser**](AuthAPI.md#GetCurrentAuthorizedUser) | **Get** /auth/current | Get current authorized user
[**GetGoogleToken**](AuthAPI.md#GetGoogleToken) | **Get** /auth/google-token | Retrieve Google Access Token
[**GetTokenLocally**](AuthAPI.md#GetTokenLocally) | **Get** /auth/login/local/{userEmail} | login locally by email (with no oauth)
[**GoogleAuthLogInCallbackFunction**](AuthAPI.md#GoogleAuthLogInCallbackFunction) | **Get** /auth/{provider}/callback | Log in with google oAuth
[**LogoutCurrentAuthorizedUser**](AuthAPI.md#LogoutCurrentAuthorizedUser) | **Get** /auth/logout/{provider} | Logout current authorized user
[**RefreshAccessToken**](AuthAPI.md#RefreshAccessToken) | **Post** /auth/refreshToken | Retrieve Access Token



## BeginAuth

> MwServerInternalSchemasBeginAuthResponse BeginAuth(ctx, provider).Execute()

Begin oauth

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
	provider := "provider_example" // string | google

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AuthAPI.BeginAuth(context.Background(), provider).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AuthAPI.BeginAuth``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `BeginAuth`: MwServerInternalSchemasBeginAuthResponse
	fmt.Fprintf(os.Stdout, "Response from `AuthAPI.BeginAuth`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**provider** | **string** | google | 

### Other Parameters

Other parameters are passed through a pointer to a apiBeginAuthRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**MwServerInternalSchemasBeginAuthResponse**](MwServerInternalSchemasBeginAuthResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetCurrentAuthorizedUser

> MwServerInternalSchemasCurrentUserResponse GetCurrentAuthorizedUser(ctx).Execute()

Get current authorized user

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

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AuthAPI.GetCurrentAuthorizedUser(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AuthAPI.GetCurrentAuthorizedUser``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetCurrentAuthorizedUser`: MwServerInternalSchemasCurrentUserResponse
	fmt.Fprintf(os.Stdout, "Response from `AuthAPI.GetCurrentAuthorizedUser`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetCurrentAuthorizedUserRequest struct via the builder pattern


### Return type

[**MwServerInternalSchemasCurrentUserResponse**](MwServerInternalSchemasCurrentUserResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetGoogleToken

> MwServerInternalSchemasGoogleToken GetGoogleToken(ctx).Execute()

Retrieve Google Access Token



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

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AuthAPI.GetGoogleToken(context.Background()).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AuthAPI.GetGoogleToken``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetGoogleToken`: MwServerInternalSchemasGoogleToken
	fmt.Fprintf(os.Stdout, "Response from `AuthAPI.GetGoogleToken`: %v\n", resp)
}
```

### Path Parameters

This endpoint does not need any parameter.

### Other Parameters

Other parameters are passed through a pointer to a apiGetGoogleTokenRequest struct via the builder pattern


### Return type

[**MwServerInternalSchemasGoogleToken**](MwServerInternalSchemasGoogleToken.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetTokenLocally

> MwServerInternalSchemasGetAuthCallbackFunctionResponse GetTokenLocally(ctx, userEmail).Execute()

login locally by email (with no oauth)



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
	userEmail := "userEmail_example" // string | email

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AuthAPI.GetTokenLocally(context.Background(), userEmail).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AuthAPI.GetTokenLocally``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetTokenLocally`: MwServerInternalSchemasGetAuthCallbackFunctionResponse
	fmt.Fprintf(os.Stdout, "Response from `AuthAPI.GetTokenLocally`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**userEmail** | **string** | email | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetTokenLocallyRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**MwServerInternalSchemasGetAuthCallbackFunctionResponse**](MwServerInternalSchemasGetAuthCallbackFunctionResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GoogleAuthLogInCallbackFunction

> MwServerInternalSchemasGetAuthCallbackFunctionResponse GoogleAuthLogInCallbackFunction(ctx, provider).Code(code).State(state).Execute()

Log in with google oAuth

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
	code := "code_example" // string | code param
	state := "state_example" // string | state parameter
	provider := "provider_example" // string | google

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AuthAPI.GoogleAuthLogInCallbackFunction(context.Background(), provider).Code(code).State(state).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AuthAPI.GoogleAuthLogInCallbackFunction``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GoogleAuthLogInCallbackFunction`: MwServerInternalSchemasGetAuthCallbackFunctionResponse
	fmt.Fprintf(os.Stdout, "Response from `AuthAPI.GoogleAuthLogInCallbackFunction`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**provider** | **string** | google | 

### Other Parameters

Other parameters are passed through a pointer to a apiGoogleAuthLogInCallbackFunctionRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **code** | **string** | code param | 
 **state** | **string** | state parameter | 


### Return type

[**MwServerInternalSchemasGetAuthCallbackFunctionResponse**](MwServerInternalSchemasGetAuthCallbackFunctionResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## LogoutCurrentAuthorizedUser

> LogoutCurrentAuthorizedUser(ctx, provider).Execute()

Logout current authorized user

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
	provider := "provider_example" // string | google

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.AuthAPI.LogoutCurrentAuthorizedUser(context.Background(), provider).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AuthAPI.LogoutCurrentAuthorizedUser``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**provider** | **string** | google | 

### Other Parameters

Other parameters are passed through a pointer to a apiLogoutCurrentAuthorizedUserRequest struct via the builder pattern


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


## RefreshAccessToken

> MwServerInternalSchemasRefreshAccessTokenResponse RefreshAccessToken(ctx).Request(request).Execute()

Retrieve Access Token

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
	request := *openapiclient.NewMwServerInternalSchemasRefreshAccessTokenPayload("RefreshToken_example") // MwServerInternalSchemasRefreshAccessTokenPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AuthAPI.RefreshAccessToken(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AuthAPI.RefreshAccessToken``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `RefreshAccessToken`: MwServerInternalSchemasRefreshAccessTokenResponse
	fmt.Fprintf(os.Stdout, "Response from `AuthAPI.RefreshAccessToken`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiRefreshAccessTokenRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwServerInternalSchemasRefreshAccessTokenPayload**](MwServerInternalSchemasRefreshAccessTokenPayload.md) | query params | 

### Return type

[**MwServerInternalSchemasRefreshAccessTokenResponse**](MwServerInternalSchemasRefreshAccessTokenResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

