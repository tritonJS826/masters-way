# \MentorUserWayAPI

All URIs are relative to */general*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateMentorUserWay**](MentorUserWayAPI.md#CreateMentorUserWay) | **Post** /mentorUserWays | Create a new mentorUserWay
[**DeleteMentorUserWay**](MentorUserWayAPI.md#DeleteMentorUserWay) | **Delete** /mentorUserWays | Delete mentorUserWay by UUID



## CreateMentorUserWay

> CreateMentorUserWay(ctx).Request(request).Execute()

Create a new mentorUserWay



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
	request := *openapiclient.NewMwServerInternalSchemasCreateMentorUserWayPayload("UserUuid_example", "WayUuid_example") // MwServerInternalSchemasCreateMentorUserWayPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.MentorUserWayAPI.CreateMentorUserWay(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `MentorUserWayAPI.CreateMentorUserWay``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiCreateMentorUserWayRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwServerInternalSchemasCreateMentorUserWayPayload**](MwServerInternalSchemasCreateMentorUserWayPayload.md) | query params | 

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


## DeleteMentorUserWay

> DeleteMentorUserWay(ctx).Request(request).Execute()

Delete mentorUserWay by UUID

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
	request := *openapiclient.NewMwServerInternalSchemasDeleteMentorUserWayPayload("UserUuid_example", "WayUuid_example") // MwServerInternalSchemasDeleteMentorUserWayPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.MentorUserWayAPI.DeleteMentorUserWay(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `MentorUserWayAPI.DeleteMentorUserWay``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiDeleteMentorUserWayRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwServerInternalSchemasDeleteMentorUserWayPayload**](MwServerInternalSchemasDeleteMentorUserWayPayload.md) | query params | 

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

