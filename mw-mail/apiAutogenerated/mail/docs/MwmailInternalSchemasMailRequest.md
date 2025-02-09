# MwmailInternalSchemasMailRequest

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Bcc** | Pointer to **[]string** |  | [optional] 
**Cc** | Pointer to **[]string** |  | [optional] 
**Message** | **string** |  | 
**Recipients** | **[]string** |  | 
**Reply** | Pointer to **[]string** |  | [optional] 
**Subject** | **string** |  | 

## Methods

### NewMwmailInternalSchemasMailRequest

`func NewMwmailInternalSchemasMailRequest(message string, recipients []string, subject string, ) *MwmailInternalSchemasMailRequest`

NewMwmailInternalSchemasMailRequest instantiates a new MwmailInternalSchemasMailRequest object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwmailInternalSchemasMailRequestWithDefaults

`func NewMwmailInternalSchemasMailRequestWithDefaults() *MwmailInternalSchemasMailRequest`

NewMwmailInternalSchemasMailRequestWithDefaults instantiates a new MwmailInternalSchemasMailRequest object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

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


### GetRecipients

`func (o *MwmailInternalSchemasMailRequest) GetRecipients() []string`

GetRecipients returns the Recipients field if non-nil, zero value otherwise.

### GetRecipientsOk

`func (o *MwmailInternalSchemasMailRequest) GetRecipientsOk() (*[]string, bool)`

GetRecipientsOk returns a tuple with the Recipients field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRecipients

`func (o *MwmailInternalSchemasMailRequest) SetRecipients(v []string)`

SetRecipients sets Recipients field to given value.


### GetReply

`func (o *MwmailInternalSchemasMailRequest) GetReply() []string`

GetReply returns the Reply field if non-nil, zero value otherwise.

### GetReplyOk

`func (o *MwmailInternalSchemasMailRequest) GetReplyOk() (*[]string, bool)`

GetReplyOk returns a tuple with the Reply field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetReply

`func (o *MwmailInternalSchemasMailRequest) SetReply(v []string)`

SetReply sets Reply field to given value.

### HasReply

`func (o *MwmailInternalSchemasMailRequest) HasReply() bool`

HasReply returns a boolean if a field has been set.

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



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


