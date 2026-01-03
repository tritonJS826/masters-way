# \AuthAPI

All URIs are relative to */general*

Method | HTTP request | Description
------------- | ------------- | -------------
[**BeginAuth**](AuthAPI.md#BeginAuth) | **Get** /auth/{provider} | Begin oauth
[**GetCurrentAuthorizedUser**](AuthAPI.md#GetCurrentAuthorizedUser) | **Get** /auth/current | Get current authorized user
[**GetGoogleToken**](AuthAPI.md#GetGoogleToken) | **Get** /auth/google-token | Retrieve Google Access Token
[**GetTokenLocally**](AuthAPI.md#GetTokenLocally) | **Get** /auth/login/local/{userEmail} | login locally by email (with no oauth)
[**GoogleAuthLogInCallbackFunction**](AuthAPI.md#GoogleAuthLogInCallbackFunction) | **Get** /auth/{provider}/callback | Log in with google oAuth
[**InitiateTelegramLogin**](AuthAPI.md#InitiateTelegramLogin) | **Post** /auth/telegram/initiate | Initiate Telegram login
[**LinkTelegram**](AuthAPI.md#LinkTelegram) | **Post** /auth/telegram/link | Link Telegram account
[**LogoutCurrentAuthorizedUser**](AuthAPI.md#LogoutCurrentAuthorizedUser) | **Get** /auth/logout/{provider} | Logout current authorized user
[**RefreshAccessToken**](AuthAPI.md#RefreshAccessToken) | **Post** /auth/refreshToken | Retrieve Access Token
[**TestTelegramLink**](AuthAPI.md#TestTelegramLink) | **Get** /auth/telegram/test-link | Test Telegram link (local only)
[**UnlinkTelegram**](AuthAPI.md#UnlinkTelegram) | **Delete** /auth/telegram/unlink/{telegramId} | Unlink Telegram account
[**ValidateTelegramLogin**](AuthAPI.md#ValidateTelegramLogin) | **Post** /auth/telegram/validate | Validate Telegram login



## BeginAuth

> MwServerInternalSchemasBeginAuthResponse BeginAuth(ctx, provider).TelegramCode(telegramCode).Execute()

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
	telegramCode := "telegramCode_example" // string | telegram auth code for linking (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AuthAPI.BeginAuth(context.Background(), provider).TelegramCode(telegramCode).Execute()
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

 **telegramCode** | **string** | telegram auth code for linking | 

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


## InitiateTelegramLogin

> InternalControllersInitiateTelegramLoginResponse InitiateTelegramLogin(ctx).Request(request).Execute()

Initiate Telegram login



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
	request := *openapiclient.NewInternalControllersInitiateTelegramLoginRequest(int32(123)) // InternalControllersInitiateTelegramLoginRequest | Telegram login request

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AuthAPI.InitiateTelegramLogin(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AuthAPI.InitiateTelegramLogin``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `InitiateTelegramLogin`: InternalControllersInitiateTelegramLoginResponse
	fmt.Fprintf(os.Stdout, "Response from `AuthAPI.InitiateTelegramLogin`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiInitiateTelegramLoginRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**InternalControllersInitiateTelegramLoginRequest**](InternalControllersInitiateTelegramLoginRequest.md) | Telegram login request | 

### Return type

[**InternalControllersInitiateTelegramLoginResponse**](InternalControllersInitiateTelegramLoginResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## LinkTelegram

> map[string]string LinkTelegram(ctx).Request(request).Execute()

Link Telegram account



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
	request := *openapiclient.NewInternalControllersLinkTelegramRequest("AuthCode_example", int32(123)) // InternalControllersLinkTelegramRequest | Telegram linking request

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AuthAPI.LinkTelegram(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AuthAPI.LinkTelegram``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `LinkTelegram`: map[string]string
	fmt.Fprintf(os.Stdout, "Response from `AuthAPI.LinkTelegram`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiLinkTelegramRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**InternalControllersLinkTelegramRequest**](InternalControllersLinkTelegramRequest.md) | Telegram linking request | 

### Return type

**map[string]string**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
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


## TestTelegramLink

> InternalControllersTestTelegramLinkResponse TestTelegramLink(ctx).Email(email).AuthCode(authCode).Execute()

Test Telegram link (local only)



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
	email := "email_example" // string | User email
	authCode := "authCode_example" // string | Telegram auth code

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AuthAPI.TestTelegramLink(context.Background()).Email(email).AuthCode(authCode).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AuthAPI.TestTelegramLink``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `TestTelegramLink`: InternalControllersTestTelegramLinkResponse
	fmt.Fprintf(os.Stdout, "Response from `AuthAPI.TestTelegramLink`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiTestTelegramLinkRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **email** | **string** | User email | 
 **authCode** | **string** | Telegram auth code | 

### Return type

[**InternalControllersTestTelegramLinkResponse**](InternalControllersTestTelegramLinkResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UnlinkTelegram

> map[string]string UnlinkTelegram(ctx, telegramId).Execute()

Unlink Telegram account



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
	telegramId := int32(56) // int32 | Telegram ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AuthAPI.UnlinkTelegram(context.Background(), telegramId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AuthAPI.UnlinkTelegram``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UnlinkTelegram`: map[string]string
	fmt.Fprintf(os.Stdout, "Response from `AuthAPI.UnlinkTelegram`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**telegramId** | **int32** | Telegram ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiUnlinkTelegramRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

**map[string]string**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## ValidateTelegramLogin

> InternalControllersValidateTelegramLoginResponse ValidateTelegramLogin(ctx).Request(request).Execute()

Validate Telegram login



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
	request := *openapiclient.NewInternalControllersValidateTelegramLoginRequest("Code_example", int32(123)) // InternalControllersValidateTelegramLoginRequest | Telegram validation request

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.AuthAPI.ValidateTelegramLogin(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `AuthAPI.ValidateTelegramLogin``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `ValidateTelegramLogin`: InternalControllersValidateTelegramLoginResponse
	fmt.Fprintf(os.Stdout, "Response from `AuthAPI.ValidateTelegramLogin`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiValidateTelegramLoginRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**InternalControllersValidateTelegramLoginRequest**](InternalControllersValidateTelegramLoginRequest.md) | Telegram validation request | 

### Return type

[**InternalControllersValidateTelegramLoginResponse**](InternalControllersValidateTelegramLoginResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

