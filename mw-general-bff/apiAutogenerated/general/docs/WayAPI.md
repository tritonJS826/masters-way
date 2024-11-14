# \WayAPI

All URIs are relative to */general*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateWay**](WayAPI.md#CreateWay) | **Post** /ways | Create a new way
[**DeleteWay**](WayAPI.md#DeleteWay) | **Delete** /ways/{wayId} | Delete way by UUID
[**GetAllWays**](WayAPI.md#GetAllWays) | **Get** /ways | Get all ways
[**GetWayByUuid**](WayAPI.md#GetWayByUuid) | **Get** /ways/{wayId} | Get way by UUID
[**GetWayPlainForNotificationByUuid**](WayAPI.md#GetWayPlainForNotificationByUuid) | **Get** /ways/{wayId}/notification | Get way plain for notification by UUID
[**GetWayStatisticsByUuid**](WayAPI.md#GetWayStatisticsByUuid) | **Get** /ways/{wayId}/statistics | Get way statistics by UUID
[**UpdateWay**](WayAPI.md#UpdateWay) | **Patch** /ways/{wayId} | Update way by UUID



## CreateWay

> MwServerInternalSchemasWayPlainResponse CreateWay(ctx).Request(request).Execute()

Create a new way

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
	request := *openapiclient.NewMwServerInternalSchemasCreateWayPayload("CopiedFromWayId_example", int32(123), "GoalDescription_example", false, false, "Name_example", "OwnerId_example", "ProjectId_example") // MwServerInternalSchemasCreateWayPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WayAPI.CreateWay(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WayAPI.CreateWay``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateWay`: MwServerInternalSchemasWayPlainResponse
	fmt.Fprintf(os.Stdout, "Response from `WayAPI.CreateWay`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateWayRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwServerInternalSchemasCreateWayPayload**](MwServerInternalSchemasCreateWayPayload.md) | query params | 

### Return type

[**MwServerInternalSchemasWayPlainResponse**](MwServerInternalSchemasWayPlainResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteWay

> DeleteWay(ctx, wayId).Execute()

Delete way by UUID

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
	wayId := "wayId_example" // string | way ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.WayAPI.DeleteWay(context.Background(), wayId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WayAPI.DeleteWay``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**wayId** | **string** | way ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteWayRequest struct via the builder pattern


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


## GetAllWays

> MwServerInternalSchemasGetAllWaysResponse GetAllWays(ctx).Page(page).Limit(limit).MinDayReportsAmount(minDayReportsAmount).WayName(wayName).Status(status).Execute()

Get all ways



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
	minDayReportsAmount := int32(56) // int32 | Min day reports amount (optional)
	wayName := "wayName_example" // string | Way name (optional)
	status := "status_example" // string | Ways type: all | completed | inProgress | abandoned (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WayAPI.GetAllWays(context.Background()).Page(page).Limit(limit).MinDayReportsAmount(minDayReportsAmount).WayName(wayName).Status(status).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WayAPI.GetAllWays``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetAllWays`: MwServerInternalSchemasGetAllWaysResponse
	fmt.Fprintf(os.Stdout, "Response from `WayAPI.GetAllWays`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiGetAllWaysRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **page** | **int32** | Page number for pagination | 
 **limit** | **int32** | Number of items per page | 
 **minDayReportsAmount** | **int32** | Min day reports amount | 
 **wayName** | **string** | Way name | 
 **status** | **string** | Ways type: all | completed | inProgress | abandoned | 

### Return type

[**MwServerInternalSchemasGetAllWaysResponse**](MwServerInternalSchemasGetAllWaysResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetWayByUuid

> MwServerInternalSchemasWayPopulatedResponse GetWayByUuid(ctx, wayId).Execute()

Get way by UUID

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
	wayId := "wayId_example" // string | way ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WayAPI.GetWayByUuid(context.Background(), wayId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WayAPI.GetWayByUuid``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetWayByUuid`: MwServerInternalSchemasWayPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `WayAPI.GetWayByUuid`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**wayId** | **string** | way ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetWayByUuidRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**MwServerInternalSchemasWayPopulatedResponse**](MwServerInternalSchemasWayPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetWayPlainForNotificationByUuid

> MwServerInternalSchemasWayPlainForNotificationResponse GetWayPlainForNotificationByUuid(ctx, wayId).Execute()

Get way plain for notification by UUID

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
	wayId := "wayId_example" // string | way ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WayAPI.GetWayPlainForNotificationByUuid(context.Background(), wayId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WayAPI.GetWayPlainForNotificationByUuid``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetWayPlainForNotificationByUuid`: MwServerInternalSchemasWayPlainForNotificationResponse
	fmt.Fprintf(os.Stdout, "Response from `WayAPI.GetWayPlainForNotificationByUuid`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**wayId** | **string** | way ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetWayPlainForNotificationByUuidRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**MwServerInternalSchemasWayPlainForNotificationResponse**](MwServerInternalSchemasWayPlainForNotificationResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetWayStatisticsByUuid

> MwServerInternalSchemasWayStatisticsTriplePeriod GetWayStatisticsByUuid(ctx, wayId).Execute()

Get way statistics by UUID

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
	wayId := "wayId_example" // string | way ID

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WayAPI.GetWayStatisticsByUuid(context.Background(), wayId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WayAPI.GetWayStatisticsByUuid``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetWayStatisticsByUuid`: MwServerInternalSchemasWayStatisticsTriplePeriod
	fmt.Fprintf(os.Stdout, "Response from `WayAPI.GetWayStatisticsByUuid`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**wayId** | **string** | way ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetWayStatisticsByUuidRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**MwServerInternalSchemasWayStatisticsTriplePeriod**](MwServerInternalSchemasWayStatisticsTriplePeriod.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateWay

> MwServerInternalSchemasWayPlainResponse UpdateWay(ctx, wayId).Request(request).Execute()

Update way by UUID

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
	wayId := "wayId_example" // string | way ID
	request := *openapiclient.NewMwServerInternalSchemasUpdateWayPayload() // MwServerInternalSchemasUpdateWayPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.WayAPI.UpdateWay(context.Background(), wayId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `WayAPI.UpdateWay``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateWay`: MwServerInternalSchemasWayPlainResponse
	fmt.Fprintf(os.Stdout, "Response from `WayAPI.UpdateWay`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**wayId** | **string** | way ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateWayRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwServerInternalSchemasUpdateWayPayload**](MwServerInternalSchemasUpdateWayPayload.md) | query params | 

### Return type

[**MwServerInternalSchemasWayPlainResponse**](MwServerInternalSchemasWayPlainResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

