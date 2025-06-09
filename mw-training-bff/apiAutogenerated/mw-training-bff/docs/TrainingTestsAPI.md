# \TrainingTestsAPI

All URIs are relative to *http://localhost/mw-training*

Method | HTTP request | Description
------------- | ------------- | -------------
[**TrainingTestPost**](TrainingTestsAPI.md#TrainingTestPost) | **Post** /trainingTest | Create TrainingTest



## TrainingTestPost

> TrainingTestPost(ctx).Request(request).Execute()

Create TrainingTest

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
	request := *openapiclient.NewMwTrainingBffInternalSchemasCreateTrainingTestRequest("TestUuid_example", "TrainingUuid_example") // MwTrainingBffInternalSchemasCreateTrainingTestRequest | body

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.TrainingTestsAPI.TrainingTestPost(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `TrainingTestsAPI.TrainingTestPost``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiTrainingTestPostRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwTrainingBffInternalSchemasCreateTrainingTestRequest**](MwTrainingBffInternalSchemasCreateTrainingTestRequest.md) | body | 

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

