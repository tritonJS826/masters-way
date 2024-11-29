# MwmailInternalSchemasMailRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Subject** | **string** | Subject of the email | 
**To** | **[]string** | List of email recipients | 
**Cc** | Pointer to **[]string** | List of email CC recipients | [optional] 
**Bcc** | Pointer to **[]string** | List of email BCC recipients | [optional] 
**ReplyTo** | Pointer to **[]string** | List of email reply-to addresses | [optional] 
**Message** | **string** | The body of the email | 

## Methods

### NewMwmailInternalSchemasMailRequest

`func NewMwmailInternalSchemasMailRequest(subject string, to []string, message string, ) *MwmailInternalSchemasMailRequest`

NewMwmailInternalSchemasMailRequest instantiates a new MwmailInternalSchemasMailRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwmailInternalSchemasMailRequestWithDefaults

`func NewMwmailInternalSchemasMailRequestWithDefaults() *MwmailInternalSchemasMailRequest`

NewMwmailInternalSchemasMailRequestWithDefaults instantiates a new MwmailInternalSchemasMailRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetSubject

`func (o *MwmailInternalSchemasMailRequest) GetSubject() string`

GetSubject returns the Subject field if non-nil, zero value otherwise.

### GetSubjectOk

`func (o *MwmailInternalSchemasMailRequest) GetSubjectOk() (*string, bool)`

GetSubjectOk returns a tuple with the Subject field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSubject

`func (o *MwmailInternalSchemasMailRequest) SetSubject(v string)`

SetSubject sets Subject field to given value.


### GetTo

`func (o *MwmailInternalSchemasMailRequest) GetTo() []string`

GetTo returns the To field if non-nil, zero value otherwise.

### GetToOk

`func (o *MwmailInternalSchemasMailRequest) GetToOk() (*[]string, bool)`

GetToOk returns a tuple with the To field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTo

`func (o *MwmailInternalSchemasMailRequest) SetTo(v []string)`

SetTo sets To field to given value.


### GetCc

`func (o *MwmailInternalSchemasMailRequest) GetCc() []string`

GetCc returns the Cc field if non-nil, zero value otherwise.

### GetCcOk

`func (o *MwmailInternalSchemasMailRequest) GetCcOk() (*[]string, bool)`

GetCcOk returns a tuple with the Cc field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCc

`func (o *MwmailInternalSchemasMailRequest) SetCc(v []string)`

SetCc sets Cc field to given value.

### HasCc

`func (o *MwmailInternalSchemasMailRequest) HasCc() bool`

HasCc returns a boolean if a field has been set.

### GetBcc

`func (o *MwmailInternalSchemasMailRequest) GetBcc() []string`

GetBcc returns the Bcc field if non-nil, zero value otherwise.

### GetBccOk

`func (o *MwmailInternalSchemasMailRequest) GetBccOk() (*[]string, bool)`

GetBccOk returns a tuple with the Bcc field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBcc

`func (o *MwmailInternalSchemasMailRequest) SetBcc(v []string)`

SetBcc sets Bcc field to given value.

### HasBcc

`func (o *MwmailInternalSchemasMailRequest) HasBcc() bool`

HasBcc returns a boolean if a field has been set.

### GetReplyTo

`func (o *MwmailInternalSchemasMailRequest) GetReplyTo() []string`

GetReplyTo returns the ReplyTo field if non-nil, zero value otherwise.

### GetReplyToOk

`func (o *MwmailInternalSchemasMailRequest) GetReplyToOk() (*[]string, bool)`

GetReplyToOk returns a tuple with the ReplyTo field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetReplyTo

`func (o *MwmailInternalSchemasMailRequest) SetReplyTo(v []string)`

SetReplyTo sets ReplyTo field to given value.

### HasReplyTo

`func (o *MwmailInternalSchemasMailRequest) HasReplyTo() bool`

HasReplyTo returns a boolean if a field has been set.

### GetMessage

`func (o *MwmailInternalSchemasMailRequest) GetMessage() string`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *MwmailInternalSchemasMailRequest) GetMessageOk() (*string, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *MwmailInternalSchemasMailRequest) SetMessage(v string)`

SetMessage sets Message field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


