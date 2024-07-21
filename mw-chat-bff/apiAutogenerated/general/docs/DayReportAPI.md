# \DayReportAPI

All URIs are relative to */api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateDayReport**](DayReportAPI.md#CreateDayReport) | **Post** /dayReports | Create a new dayReport
[**GetDayReportsByWayUuid**](DayReportAPI.md#GetDayReportsByWayUuid) | **Get** /dayReports/{wayId} | Get all dayReports by Way UUID
[**UpdateDayReport**](DayReportAPI.md#UpdateDayReport) | **Patch** /dayReports/{dayReportId} | Update dayReport by UUID



## CreateDayReport

> SchemasDayReportPopulatedResponse CreateDayReport(ctx).Request(request).Execute()

Create a new dayReport

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
	request := *openapiclient.NewSchemasCreateDayReportPayload(false, "WayUuid_example") // SchemasCreateDayReportPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.DayReportAPI.CreateDayReport(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `DayReportAPI.CreateDayReport``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateDayReport`: SchemasDayReportPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `DayReportAPI.CreateDayReport`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateDayReportRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasCreateDayReportPayload**](SchemasCreateDayReportPayload.md) | query params | 

### Return type

[**SchemasDayReportPopulatedResponse**](SchemasDayReportPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetDayReportsByWayUuid

> []SchemasDayReportPopulatedResponse GetDayReportsByWayUuid(ctx, wayId).Execute()

Get all dayReports by Way UUID

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
	resp, r, err := apiClient.DayReportAPI.GetDayReportsByWayUuid(context.Background(), wayId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `DayReportAPI.GetDayReportsByWayUuid``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetDayReportsByWayUuid`: []SchemasDayReportPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `DayReportAPI.GetDayReportsByWayUuid`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**wayId** | **string** | way ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetDayReportsByWayUuidRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------


### Return type

[**[]SchemasDayReportPopulatedResponse**](SchemasDayReportPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## UpdateDayReport

> SchemasDayReportPopulatedResponse UpdateDayReport(ctx, dayReportId).Request(request).Execute()

Update dayReport by UUID

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
	dayReportId := "dayReportId_example" // string | dayReport ID
	request := *openapiclient.NewSchemasUpdateDayReportPayload() // SchemasUpdateDayReportPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.DayReportAPI.UpdateDayReport(context.Background(), dayReportId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `DayReportAPI.UpdateDayReport``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateDayReport`: SchemasDayReportPopulatedResponse
	fmt.Fprintf(os.Stdout, "Response from `DayReportAPI.UpdateDayReport`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**dayReportId** | **string** | dayReport ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateDayReportRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**SchemasUpdateDayReportPayload**](SchemasUpdateDayReportPayload.md) | query params | 

### Return type

[**SchemasDayReportPopulatedResponse**](SchemasDayReportPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

