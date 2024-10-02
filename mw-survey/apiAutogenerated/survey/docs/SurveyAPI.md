# \SurveyAPI

All URIs are relative to */survey*

Method | HTTP request | Description
------------- | ------------- | -------------
[**SurveyLookingForMentor**](SurveyAPI.md#SurveyLookingForMentor) | **Post** /looking-for-mentor | Post survey looking for mentor
[**SurveyUserIntro**](SurveyAPI.md#SurveyUserIntro) | **Post** /user-intro | Post survey user intro



## SurveyLookingForMentor

> SurveyLookingForMentor(ctx).Request(request).Execute()

Post survey looking for mentor



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
	request := *openapiclient.NewSchemasPostSurveyLookingForMentorPayload("CurrentExperience_example", "MentorDescription_example", "SkillsToLearn_example", "UserEmail_example") // SchemasPostSurveyLookingForMentorPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.SurveyAPI.SurveyLookingForMentor(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SurveyAPI.SurveyLookingForMentor``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiSurveyLookingForMentorRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasPostSurveyLookingForMentorPayload**](SchemasPostSurveyLookingForMentorPayload.md) | query params | 

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


## SurveyUserIntro

> SurveyUserIntro(ctx).Request(request).Execute()

Post survey user intro



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
	request := *openapiclient.NewSchemasPostSurveyUserIntroPayload("DeviceId_example", "PreferredInterfaceLanguage_example", "Role_example", "Source_example", "StudentExperience_example", "StudentGoals_example", "WhyRegistered_example") // SchemasPostSurveyUserIntroPayload | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	r, err := apiClient.SurveyAPI.SurveyUserIntro(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `SurveyAPI.SurveyUserIntro``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiSurveyUserIntroRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**SchemasPostSurveyUserIntroPayload**](SchemasPostSurveyUserIntroPayload.md) | query params | 

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

