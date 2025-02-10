# \MailAPI

All URIs are relative to *http://localhost/mw-mail*

Method | HTTP request | Description
------------- | ------------- | -------------
[**SendMail**](MailAPI.md#SendMail) | **Post** /send | Sending messages to recipients and save logs



## SendMail

> MwmailInternalSchemasSendMailResponse SendMail(ctx).Request(request).Execute()

Sending messages to recipients and save logs



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
	request := *openapiclient.NewMwmailInternalSchemasMailRequest("Message_example", []string{"Recipients_example"}, "Subject_example") // MwmailInternalSchemasMailRequest | query params

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)
	resp, r, err := apiClient.MailAPI.SendMail(context.Background()).Request(request).Execute()
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error when calling `MailAPI.SendMail``: %v\n", err)
		fmt.Fprintf(os.Stderr, "Full HTTP response: %v\n", r)
	}
	// response from `SendMail`: MwmailInternalSchemasSendMailResponse
	fmt.Fprintf(os.Stdout, "Response from `MailAPI.SendMail`: %v\n", resp)
}
```

### Path Parameters



### Other Parameters

Other parameters are passed through a pointer to a apiSendMailRequest struct via the builder pattern


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **request** | [**MwmailInternalSchemasMailRequest**](MwmailInternalSchemasMailRequest.md) | query params | 

### Return type

[**MwmailInternalSchemasSendMailResponse**](MwmailInternalSchemasSendMailResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints)
[[Back to Model list]](../README.md#documentation-for-models)
[[Back to README]](../README.md)

