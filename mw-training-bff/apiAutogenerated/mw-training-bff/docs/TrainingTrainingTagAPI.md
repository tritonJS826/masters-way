# \TrainingTrainingTagAPI

All URIs are relative to */training*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateTrainingTrainingTag**](TrainingTrainingTagAPI.md#CreateTrainingTrainingTag) | **Post** /trainingTrainingTags/{trainingId} | Create training training tag
[**DeleteTrainingTrainingTag**](TrainingTrainingTagAPI.md#DeleteTrainingTrainingTag) | **Delete** /trainingTrainingTags/{trainingId}/trainingTag/{trainingTagId} | Delete training training tag



## CreateTrainingTrainingTag

> CreateTrainingTrainingTag(ctx, trainingId).Request(request).Execute()

Create training training tag

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
	trainingId := "trainingId_example" // string | training id
	request := *openapiclient.NewMwTrainingBffInternalSchemasCreateTrainingTrainingTagPayload("Name_example") // MwTrainingBffInternalSchemasCreateTrainingTrainingTagPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.TrainingTrainingTagAPI.CreateTrainingTrainingTag(context.Background(), trainingId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TrainingTrainingTagAPI.CreateTrainingTrainingTag``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**trainingId** | **string** | training id | 

### Other Parameters

Other parameters are passed through a pointer to a apiCreateTrainingTrainingTagRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwTrainingBffInternalSchemasCreateTrainingTrainingTagPayload**](MwTrainingBffInternalSchemasCreateTrainingTrainingTagPayload.md) | query params | 

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


## DeleteTrainingTrainingTag

> DeleteTrainingTrainingTag(ctx, trainingId, trainingTagId).Execute()

Delete training training tag

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
	trainingId := "trainingId_example" // string | training id
	trainingTagId := "trainingTagId_example" // string | training tag id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.TrainingTrainingTagAPI.DeleteTrainingTrainingTag(context.Background(), trainingId, trainingTagId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TrainingTrainingTagAPI.DeleteTrainingTrainingTag``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**trainingId** | **string** | training id | 
**trainingTagId** | **string** | training tag id | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteTrainingTrainingTagRequest struct via the builder pattern


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

