# \TestAPI

All URIs are relative to *http://localhost/mw-training*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateTest**](TestAPI.md#CreateTest) | **Post** /test | Create test
[**DeleteTest**](TestAPI.md#DeleteTest) | **Delete** /test/{testId} | Delete test by Uuid
[**GetTestById**](TestAPI.md#GetTestById) | **Get** /test/{testId} | Get test by id
[**GetTestList**](TestAPI.md#GetTestList) | **Get** /test | Get test list
[**GetTestsAmountByUserId**](TestAPI.md#GetTestsAmountByUserId) | **Get** /test/amount/user/{userId} | Get tests amount by user id
[**GetTestsByUserId**](TestAPI.md#GetTestsByUserId) | **Get** /test/user/{userId} | Get tests by user id
[**UpdateTest**](TestAPI.md#UpdateTest) | **Patch** /test/{testId} | Update test by uuid



## CreateTest

> MwTrainingBffInternalSchemasTest CreateTest(ctx).Request(request).Execute()

Create test

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
	request := *openapiclient.NewMwTrainingBffInternalSchemasCreateTestRequest("Description_example", false, "Name_example", "OwnerUuid_example") // MwTrainingBffInternalSchemasCreateTestRequest | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TestAPI.CreateTest(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TestAPI.CreateTest``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateTest`: MwTrainingBffInternalSchemasTest
	fmt.Fprintf(os.Stdout, "Response from `TestAPI.CreateTest`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateTestRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwTrainingBffInternalSchemasCreateTestRequest**](MwTrainingBffInternalSchemasCreateTestRequest.md) | query params | 

### Return type

[**MwTrainingBffInternalSchemasTest**](MwTrainingBffInternalSchemasTest.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteTest

> DeleteTest(ctx, testId).Execute()

Delete test by Uuid

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
	testId := "testId_example" // string | test id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.TestAPI.DeleteTest(context.Background(), testId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TestAPI.DeleteTest``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**testId** | **string** | test id | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteTestRequest struct via the builder pattern


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


## GetTestById

> MwTrainingBffInternalSchemasTest GetTestById(ctx, testId).Execute()

Get test by id

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
	testId := "testId_example" // string | test id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TestAPI.GetTestById(context.Background(), testId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TestAPI.GetTestById``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetTestById`: MwTrainingBffInternalSchemasTest
	fmt.Fprintf(os.Stdout, "Response from `TestAPI.GetTestById`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**testId** | **string** | test id | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetTestByIdRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**MwTrainingBffInternalSchemasTest**](MwTrainingBffInternalSchemasTest.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetTestList

> MwTrainingBffInternalSchemasTestPreviewList GetTestList(ctx).Name(name).Page(page).Limit(limit).Execute()

Get test list

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
	name := "name_example" // string | name (optional)
	page := int32(56) // int32 | page (optional)
	limit := int32(56) // int32 | limit (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TestAPI.GetTestList(context.Background()).Name(name).Page(page).Limit(limit).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TestAPI.GetTestList``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetTestList`: MwTrainingBffInternalSchemasTestPreviewList
	fmt.Fprintf(os.Stdout, "Response from `TestAPI.GetTestList`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGetTestListRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **name** | **string** | name | 
 **page** | **int32** | page | 
 **limit** | **int32** | limit | 

### Return type

[**MwTrainingBffInternalSchemasTestPreviewList**](MwTrainingBffInternalSchemasTestPreviewList.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetTestsAmountByUserId

> MwTrainingBffInternalSchemasTestsAmount GetTestsAmountByUserId(ctx, userId).Execute()

Get tests amount by user id

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
	userId := "userId_example" // string | user id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TestAPI.GetTestsAmountByUserId(context.Background(), userId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TestAPI.GetTestsAmountByUserId``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetTestsAmountByUserId`: MwTrainingBffInternalSchemasTestsAmount
	fmt.Fprintf(os.Stdout, "Response from `TestAPI.GetTestsAmountByUserId`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**userId** | **string** | user id | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetTestsAmountByUserIdRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**MwTrainingBffInternalSchemasTestsAmount**](MwTrainingBffInternalSchemasTestsAmount.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetTestsByUserId

> MwTrainingBffInternalSchemasTestPreviewList GetTestsByUserId(ctx, userId).Execute()

Get tests by user id

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
	userId := "userId_example" // string | user id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TestAPI.GetTestsByUserId(context.Background(), userId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TestAPI.GetTestsByUserId``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetTestsByUserId`: MwTrainingBffInternalSchemasTestPreviewList
	fmt.Fprintf(os.Stdout, "Response from `TestAPI.GetTestsByUserId`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**userId** | **string** | user id | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetTestsByUserIdRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**MwTrainingBffInternalSchemasTestPreviewList**](MwTrainingBffInternalSchemasTestPreviewList.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateTest

> MwTrainingBffInternalSchemasTest UpdateTest(ctx, testId).Request(request).Execute()

Update test by uuid

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
	testId := "testId_example" // string | test id
	request := *openapiclient.NewMwTrainingBffInternalSchemasUpdateTestRequest() // MwTrainingBffInternalSchemasUpdateTestRequest | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TestAPI.UpdateTest(context.Background(), testId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TestAPI.UpdateTest``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateTest`: MwTrainingBffInternalSchemasTest
	fmt.Fprintf(os.Stdout, "Response from `TestAPI.UpdateTest`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**testId** | **string** | test id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateTestRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwTrainingBffInternalSchemasUpdateTestRequest**](MwTrainingBffInternalSchemasUpdateTestRequest.md) | query params | 

### Return type

[**MwTrainingBffInternalSchemasTest**](MwTrainingBffInternalSchemasTest.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

