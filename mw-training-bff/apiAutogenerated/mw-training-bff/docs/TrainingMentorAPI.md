# \TrainingMentorAPI

All URIs are relative to *http://localhost/mw-training*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateTrainingMentor**](TrainingMentorAPI.md#CreateTrainingMentor) | **Post** /trainingMentors/{trainingId}/user/{userId} | Create mentor
[**DeleteTrainingMentor**](TrainingMentorAPI.md#DeleteTrainingMentor) | **Delete** /trainingMentors/{trainingId}/user/{userId} | Delete mentor by id



## CreateTrainingMentor

> CreateTrainingMentor(ctx, trainingId, userId).Execute()

Create mentor

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
	userId := "userId_example" // string | user id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.TrainingMentorAPI.CreateTrainingMentor(context.Background(), trainingId, userId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TrainingMentorAPI.CreateTrainingMentor``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**trainingId** | **string** | training id | 
**userId** | **string** | user id | 

### Other Parameters

Other parameters are passed through a pointer to a apiCreateTrainingMentorRequest struct via the builder pattern


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


## DeleteTrainingMentor

> DeleteTrainingMentor(ctx, trainingId, userId).Execute()

Delete mentor by id

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
	userId := "userId_example" // string | user id

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.TrainingMentorAPI.DeleteTrainingMentor(context.Background(), trainingId, userId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TrainingMentorAPI.DeleteTrainingMentor``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
**ctx** | **context.Context** | context for authentication, logging, cancellation, deadlines, tracing, etc.
**trainingId** | **string** | training id | 
**userId** | **string** | user id | 

### Other Parameters

Other parameters are passed through a pointer to a apiDeleteTrainingMentorRequest struct via the builder pattern


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

