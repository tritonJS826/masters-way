# \TrainingStudentAPI

All URIs are relative to *http://localhost/mw-training*

Method | HTTP request | Description
------------- | ------------- | -------------
[**CreateTrainingStudent**](TrainingStudentAPI.md#CreateTrainingStudent) | **Post** /trainingStudents/{trainingId}/user/{userId} | Create student
[**DeleteTrainingStudent**](TrainingStudentAPI.md#DeleteTrainingStudent) | **Delete** /trainingStudents/{trainingId}/user/{userId} | Delete student



## CreateTrainingStudent

> CreateTrainingStudent(ctx, trainingId, userId).Execute()

Create student

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
	r, err := apiClient.TrainingStudentAPI.CreateTrainingStudent(context.Background(), trainingId, userId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TrainingStudentAPI.CreateTrainingStudent``: %v\n", err)
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

Other parameters are passed through a pointer to a apiCreateTrainingStudentRequest struct via the builder pattern


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


## DeleteTrainingStudent

> DeleteTrainingStudent(ctx, trainingId, userId).Execute()

Delete student

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
	r, err := apiClient.TrainingStudentAPI.DeleteTrainingStudent(context.Background(), trainingId, userId).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TrainingStudentAPI.DeleteTrainingStudent``: %v\n", err)
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

Other parameters are passed through a pointer to a apiDeleteTrainingStudentRequest struct via the builder pattern


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

