# \SocketAPI

All URIs are relative to *http://localhost/mw-test-websocket*

Method | HTTP request | Description
------------- | ------------- | -------------
[**ConnectSocket**](SocketAPI.md#ConnectSocket) | **Get** /ws | Connect to socket
[**HostStartedGame**](SocketAPI.md#HostStartedGame) | **Post** /session/{sessionUuid}/hostStartedGame | host started game
[**UserAnswerHandledByServer**](SocketAPI.md#UserAnswerHandledByServer) | **Post** /session/{sessionUuid}/userAnswerHandledByServer | User answer handled by server
[**UserAnsweredQuestion**](SocketAPI.md#UserAnsweredQuestion) | **Post** /session/{sessionUuid}/userAnsweredQuestion | User answered question
[**UserCapturedTarget**](SocketAPI.md#UserCapturedTarget) | **Post** /session/{sessionUuid}/userCapturedTarget | User captured target
[**UserJoinedSession**](SocketAPI.md#UserJoinedSession) | **Post** /session/{sessionUuid}/userJoinedSession | User joined session
[**UserReadyToStartPlay**](SocketAPI.md#UserReadyToStartPlay) | **Post** /session/{sessionUuid}/userReadyToStartPlay | User ready to start play



## ConnectSocket

> ConnectSocket(ctx, token).Execute()

Connect to socket

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
	token := "token_example" // string | token

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.SocketAPI.ConnectSocket(context.Background(), token).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SocketAPI.ConnectSocket``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**token** | **string** | token | 

### Other Parameters

Other parameters are passed through a pointer to a apiConnectSocketRequest struct via the builder pattern


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


## HostStartedGame

> HostStartedGame(ctx, sessionUuid).Request(request).Execute()

host started game

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
	sessionUuid := "sessionUuid_example" // string | sessionUuid
	request := *openapiclient.NewMwTestWebsocketInternalSchemasHostStartedGameEventPayload("UserUuid_example") // MwTestWebsocketInternalSchemasHostStartedGameEventPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.SocketAPI.HostStartedGame(context.Background(), sessionUuid).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SocketAPI.HostStartedGame``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**sessionUuid** | **string** | sessionUuid | 

### Other Parameters

Other parameters are passed through a pointer to a apiHostStartedGameRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwTestWebsocketInternalSchemasHostStartedGameEventPayload**](MwTestWebsocketInternalSchemasHostStartedGameEventPayload.md) | query params | 

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


## UserAnswerHandledByServer

> UserAnswerHandledByServer(ctx, sessionUuid).Request(request).Execute()

User answer handled by server

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
	sessionUuid := "sessionUuid_example" // string | sessionUuid
	request := *openapiclient.NewMwTestWebsocketInternalSchemasUserAnswerHandledByServerEventPayload(false, "QuestionAnswer_example", "QuestionDescription_example", "QuestionName_example", "QuestionUuid_example", "ResultDescription_example", "ResultUuid_example", "UserAnswer_example", "UserUuid_example") // MwTestWebsocketInternalSchemasUserAnswerHandledByServerEventPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.SocketAPI.UserAnswerHandledByServer(context.Background(), sessionUuid).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SocketAPI.UserAnswerHandledByServer``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**sessionUuid** | **string** | sessionUuid | 

### Other Parameters

Other parameters are passed through a pointer to a apiUserAnswerHandledByServerRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwTestWebsocketInternalSchemasUserAnswerHandledByServerEventPayload**](MwTestWebsocketInternalSchemasUserAnswerHandledByServerEventPayload.md) | query params | 

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


## UserAnsweredQuestion

> UserAnsweredQuestion(ctx, sessionUuid).Request(request).Execute()

User answered question

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
	sessionUuid := "sessionUuid_example" // string | sessionUuid
	request := *openapiclient.NewMwTestWebsocketInternalSchemasUserAnsweredQuestionEventPayload("QuestionUuid_example", "UserUuid_example") // MwTestWebsocketInternalSchemasUserAnsweredQuestionEventPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.SocketAPI.UserAnsweredQuestion(context.Background(), sessionUuid).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SocketAPI.UserAnsweredQuestion``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**sessionUuid** | **string** | sessionUuid | 

### Other Parameters

Other parameters are passed through a pointer to a apiUserAnsweredQuestionRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwTestWebsocketInternalSchemasUserAnsweredQuestionEventPayload**](MwTestWebsocketInternalSchemasUserAnsweredQuestionEventPayload.md) | query params | 

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


## UserCapturedTarget

> UserCapturedTarget(ctx, sessionUuid).Request(request).Execute()

User captured target

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
	sessionUuid := "sessionUuid_example" // string | sessionUuid
	request := *openapiclient.NewMwTestWebsocketInternalSchemasUserCapturedTargetEventPayload("QuestionUuid_example", "UserUuid_example") // MwTestWebsocketInternalSchemasUserCapturedTargetEventPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.SocketAPI.UserCapturedTarget(context.Background(), sessionUuid).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SocketAPI.UserCapturedTarget``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**sessionUuid** | **string** | sessionUuid | 

### Other Parameters

Other parameters are passed through a pointer to a apiUserCapturedTargetRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwTestWebsocketInternalSchemasUserCapturedTargetEventPayload**](MwTestWebsocketInternalSchemasUserCapturedTargetEventPayload.md) | query params | 

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


## UserJoinedSession

> UserJoinedSession(ctx, sessionUuid).Request(request).Execute()

User joined session

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
	sessionUuid := "sessionUuid_example" // string | sessionUuid
	request := *openapiclient.NewMwTestWebsocketInternalSchemasUserJoinedSessionEventPayload("UserUuid_example") // MwTestWebsocketInternalSchemasUserJoinedSessionEventPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.SocketAPI.UserJoinedSession(context.Background(), sessionUuid).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SocketAPI.UserJoinedSession``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**sessionUuid** | **string** | sessionUuid | 

### Other Parameters

Other parameters are passed through a pointer to a apiUserJoinedSessionRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwTestWebsocketInternalSchemasUserJoinedSessionEventPayload**](MwTestWebsocketInternalSchemasUserJoinedSessionEventPayload.md) | query params | 

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


## UserReadyToStartPlay

> UserReadyToStartPlay(ctx, sessionUuid).Request(request).Execute()

User ready to start play

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
	sessionUuid := "sessionUuid_example" // string | sessionUuid
	request := *openapiclient.NewMwTestWebsocketInternalSchemasUserReadyToStartPlayEventPayload("UserUuid_example") // MwTestWebsocketInternalSchemasUserReadyToStartPlayEventPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.SocketAPI.UserReadyToStartPlay(context.Background(), sessionUuid).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SocketAPI.UserReadyToStartPlay``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**sessionUuid** | **string** | sessionUuid | 

### Other Parameters

Other parameters are passed through a pointer to a apiUserReadyToStartPlayRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwTestWebsocketInternalSchemasUserReadyToStartPlayEventPayload**](MwTestWebsocketInternalSchemasUserReadyToStartPlayEventPayload.md) | query params | 

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

