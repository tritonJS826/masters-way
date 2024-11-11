# MwmailInternalSchemasSendMailResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Bcc** | Pointer to **[]string** |  | [optional] 
**Cc** | Pointer to **[]string** |  | [optional] 
**Id** | **string** |  | 
**Message** | **string** |  | 
**Recipients** | **[]string** |  | 
**ReplyTo** | Pointer to **[]string** |  | [optional] 
**SenderMail** | **string** |  | 
**SenderName** | Pointer to **string** |  | [optional] 
**Subject** | **string** |  | 

## Methods

### NewMwmailInternalSchemasSendMailResponse

`func NewMwmailInternalSchemasSendMailResponse(id string, message string, recipients []string, senderMail string, subject string, ) *MwmailInternalSchemasSendMailResponse`

NewMwmailInternalSchemasSendMailResponse instantiates a new MwmailInternalSchemasSendMailResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwmailInternalSchemasSendMailResponseWithDefaults

`func NewMwmailInternalSchemasSendMailResponseWithDefaults() *MwmailInternalSchemasSendMailResponse`

NewMwmailInternalSchemasSendMailResponseWithDefaults instantiates a new MwmailInternalSchemasSendMailResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetBcc

`func (o *MwmailInternalSchemasSendMailResponse) GetBcc() []string`

GetBcc returns the Bcc field if non-nil, zero value otherwise.

### GetBccOk

`func (o *MwmailInternalSchemasSendMailResponse) GetBccOk() (*[]string, bool)`

GetBccOk returns a tuple with the Bcc field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBcc

`func (o *MwmailInternalSchemasSendMailResponse) SetBcc(v []string)`

SetBcc sets Bcc field to given value.

### HasBcc

`func (o *MwmailInternalSchemasSendMailResponse) HasBcc() bool`

HasBcc returns a boolean if a field has been set.

### GetCc

`func (o *MwmailInternalSchemasSendMailResponse) GetCc() []string`

GetCc returns the Cc field if non-nil, zero value otherwise.

### GetCcOk

`func (o *MwmailInternalSchemasSendMailResponse) GetCcOk() (*[]string, bool)`

GetCcOk returns a tuple with the Cc field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCc

`func (o *MwmailInternalSchemasSendMailResponse) SetCc(v []string)`

SetCc sets Cc field to given value.

### HasCc

`func (o *MwmailInternalSchemasSendMailResponse) HasCc() bool`

HasCc returns a boolean if a field has been set.

### GetId

`func (o *MwmailInternalSchemasSendMailResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *MwmailInternalSchemasSendMailResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *MwmailInternalSchemasSendMailResponse) SetId(v string)`

SetId sets Id field to given value.


### GetMessage

`func (o *MwmailInternalSchemasSendMailResponse) GetMessage() string`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *MwmailInternalSchemasSendMailResponse) GetMessageOk() (*string, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *MwmailInternalSchemasSendMailResponse) SetMessage(v string)`

SetMessage sets Message field to given value.


### GetRecipients

`func (o *MwmailInternalSchemasSendMailResponse) GetRecipients() []string`

GetRecipients returns the Recipients field if non-nil, zero value otherwise.

### GetRecipientsOk

`func (o *MwmailInternalSchemasSendMailResponse) GetRecipientsOk() (*[]string, bool)`

GetRecipientsOk returns a tuple with the Recipients field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRecipients

`func (o *MwmailInternalSchemasSendMailResponse) SetRecipients(v []string)`

SetRecipients sets Recipients field to given value.


### GetReplyTo

`func (o *MwmailInternalSchemasSendMailResponse) GetReplyTo() []string`

GetReplyTo returns the ReplyTo field if non-nil, zero value otherwise.

### GetReplyToOk

`func (o *MwmailInternalSchemasSendMailResponse) GetReplyToOk() (*[]string, bool)`

GetReplyToOk returns a tuple with the ReplyTo field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetReplyTo

`func (o *MwmailInternalSchemasSendMailResponse) SetReplyTo(v []string)`

SetReplyTo sets ReplyTo field to given value.

### HasReplyTo

`func (o *MwmailInternalSchemasSendMailResponse) HasReplyTo() bool`

HasReplyTo returns a boolean if a field has been set.

### GetSenderMail

`func (o *MwmailInternalSchemasSendMailResponse) GetSenderMail() string`

GetSenderMail returns the SenderMail field if non-nil, zero value otherwise.

### GetSenderMailOk

`func (o *MwmailInternalSchemasSendMailResponse) GetSenderMailOk() (*string, bool)`

GetSenderMailOk returns a tuple with the SenderMail field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSenderMail

`func (o *MwmailInternalSchemasSendMailResponse) SetSenderMail(v string)`

SetSenderMail sets SenderMail field to given value.


### GetSenderName

`func (o *MwmailInternalSchemasSendMailResponse) GetSenderName() string`

GetSenderName returns the SenderName field if non-nil, zero value otherwise.

### GetSenderNameOk

`func (o *MwmailInternalSchemasSendMailResponse) GetSenderNameOk() (*string, bool)`

GetSenderNameOk returns a tuple with the SenderName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSenderName

`func (o *MwmailInternalSchemasSendMailResponse) SetSenderName(v string)`

SetSenderName sets SenderName field to given value.

### HasSenderName

`func (o *MwmailInternalSchemasSendMailResponse) HasSenderName() bool`

HasSenderName returns a boolean if a field has been set.

### GetSubject

`func (o *MwmailInternalSchemasSendMailResponse) GetSubject() string`

GetSubject returns the Subject field if non-nil, zero value otherwise.

### GetSubjectOk

`func (o *MwmailInternalSchemasSendMailResponse) GetSubjectOk() (*string, bool)`

GetSubjectOk returns a tuple with the Subject field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSubject

`func (o *MwmailInternalSchemasSendMailResponse) SetSubject(v string)`

SetSubject sets Subject field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


