# \TopicAPI

All URIs are relative to *http://localhost/mw-training*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateTopic**](TopicAPI.md#CreateTopic) | **Post** /topics/{trainingId} | Create topic
[**DeleteTopic**](TopicAPI.md#DeleteTopic) | **Delete** /topics/{topicId} | Delete topic by Uuid
[**UpdateTopic**](TopicAPI.md#UpdateTopic) | **Patch** /topics/{topicId} | Update topic



## CreateTopic

> MwTrainingBffInternalSchemasTopic CreateTopic(ctx, trainingId).TopicParentId(topicParentId).Execute()

Create topic

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
	topicParentId := "topicParentId_example" // string | Topic parent id (optional)

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TopicAPI.CreateTopic(context.Background(), trainingId).TopicParentId(topicParentId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TopicAPI.CreateTopic``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `CreateTopic`: MwTrainingBffInternalSchemasTopic
	fmt.Fprintf(os.Stdout, "Response from `TopicAPI.CreateTopic`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**trainingId** | **string** | training id | 

### Other Parameters

Other parameters are passed through a pointer to a apiCreateTopicRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **topicParentId** | **string** | Topic parent id | 

### Return type

[**MwTrainingBffInternalSchemasTopic**](MwTrainingBffInternalSchemasTopic.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)


## DeleteTopic

> DeleteTopic(ctx, topicId).Execute()

Delete topic by Uuid

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
	topicId := "topicId_example" // string | topic id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.TopicAPI.DeleteTopic(context.Background(), topicId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TopicAPI.DeleteTopic``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**topicId** | **string** | topic id | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteTopicRequest struct via the builder pattern


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


## UpdateTopic

> MwTrainingBffInternalSchemasTopic UpdateTopic(ctx, topicId).Request(request).Execute()

Update topic

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
	topicId := "topicId_example" // string | topic id
	request := *openapiclient.NewMwTrainingBffInternalSchemasUpdateTopicPayload("Name_example") // MwTrainingBffInternalSchemasUpdateTopicPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.TopicAPI.UpdateTopic(context.Background(), topicId).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TopicAPI.UpdateTopic``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `UpdateTopic`: MwTrainingBffInternalSchemasTopic
	fmt.Fprintf(os.Stdout, "Response from `TopicAPI.UpdateTopic`: %v\n", resp)
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**topicId** | **string** | topic id | 

### Other Parameters

Other parameters are passed through a pointer to a apiUpdateTopicRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------

 **request** | [**MwTrainingBffInternalSchemasUpdateTopicPayload**](MwTrainingBffInternalSchemasUpdateTopicPayload.md) | query params | 

### Return type

[**MwTrainingBffInternalSchemasTopic**](MwTrainingBffInternalSchemasTopic.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

