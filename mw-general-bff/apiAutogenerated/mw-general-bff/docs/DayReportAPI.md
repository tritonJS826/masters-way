# \DayReportAPI

All URIs are relative to *http://localhost/general-bff*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateDayReport**](DayReportAPI.md#CreateDayReport) | **Post** /dayReports | Create a new dayReport
[**GetDayReports**](DayReportAPI.md#GetDayReports) | **Get** /dayReports/{wayId} | Get list of day reports by way UUID



## CreateDayReport

> SchemasCompositeDayReportPopulatedResponse CreateDayReport(ctx).Request(request).Execute()

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
	request := *openapiclient.NewSchemasCreateDayReportPayload("WayId_example") // SchemasCreateDayReportPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.DayReportAPI.CreateDayReport(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `DayReportAPI.CreateDayReport``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateDayReport`: SchemasCompositeDayReportPopulatedResponse
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

[**SchemasCompositeDayReportPopulatedResponse**](SchemasCompositeDayReportPopulatedResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## GetDayReports

> SchemasListDayReportsResponse GetDayReports(ctx, wayId).Page(page).Limit(limit).Execute()

Get list of day reports by way UUID

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
	page := int32(56) // int32 | Page number for pagination (optional)
	limit := int32(56) // int32 | Number of items per page (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.DayReportAPI.GetDayReports(context.Background(), wayId).Page(page).Limit(limit).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `DayReportAPI.GetDayReports``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `GetDayReports`: SchemasListDayReportsResponse
	fmt.Fprintf(os.Stdout, "Response from `DayReportAPI.GetDayReports`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**wayId** | **string** | way ID | 

### Other Parameters

Other parameters are passed through a pointer to a apiGetDayReportsRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **page** | **int32** | Page number for pagination | 
 **limit** | **int32** | Number of items per page | 

### Return type

[**SchemasListDayReportsResponse**](SchemasListDayReportsResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

