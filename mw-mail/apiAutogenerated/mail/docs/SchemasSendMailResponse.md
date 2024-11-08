# SchemasSendMailResponse

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

### NewSchemasSendMailResponse

`func NewSchemasSendMailResponse(id string, message string, recipients []string, senderMail string, subject string, ) *SchemasSendMailResponse`

NewSchemasSendMailResponse instantiates a new SchemasSendMailResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasSendMailResponseWithDefaults

`func NewSchemasSendMailResponseWithDefaults() *SchemasSendMailResponse`

NewSchemasSendMailResponseWithDefaults instantiates a new SchemasSendMailResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetBcc

`func (o *SchemasSendMailResponse) GetBcc() []string`

GetBcc returns the Bcc field if non-nil, zero value otherwise.

### GetBccOk

`func (o *SchemasSendMailResponse) GetBccOk() (*[]string, bool)`

GetBccOk returns a tuple with the Bcc field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetBcc

`func (o *SchemasSendMailResponse) SetBcc(v []string)`

SetBcc sets Bcc field to given value.

### HasBcc

`func (o *SchemasSendMailResponse) HasBcc() bool`

HasBcc returns a boolean if a field has been set.

### GetCc

`func (o *SchemasSendMailResponse) GetCc() []string`

GetCc returns the Cc field if non-nil, zero value otherwise.

### GetCcOk

`func (o *SchemasSendMailResponse) GetCcOk() (*[]string, bool)`

GetCcOk returns a tuple with the Cc field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCc

`func (o *SchemasSendMailResponse) SetCc(v []string)`

SetCc sets Cc field to given value.

### HasCc

`func (o *SchemasSendMailResponse) HasCc() bool`

HasCc returns a boolean if a field has been set.

### GetId

`func (o *SchemasSendMailResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *SchemasSendMailResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *SchemasSendMailResponse) SetId(v string)`

SetId sets Id field to given value.


### GetMessage

`func (o *SchemasSendMailResponse) GetMessage() string`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *SchemasSendMailResponse) GetMessageOk() (*string, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *SchemasSendMailResponse) SetMessage(v string)`

SetMessage sets Message field to given value.


### GetRecipients

`func (o *SchemasSendMailResponse) GetRecipients() []string`

GetRecipients returns the Recipients field if non-nil, zero value otherwise.

### GetRecipientsOk

`func (o *SchemasSendMailResponse) GetRecipientsOk() (*[]string, bool)`

GetRecipientsOk returns a tuple with the Recipients field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRecipients

`func (o *SchemasSendMailResponse) SetRecipients(v []string)`

SetRecipients sets Recipients field to given value.


### GetReplyTo

`func (o *SchemasSendMailResponse) GetReplyTo() []string`

GetReplyTo returns the ReplyTo field if non-nil, zero value otherwise.

### GetReplyToOk

`func (o *SchemasSendMailResponse) GetReplyToOk() (*[]string, bool)`

GetReplyToOk returns a tuple with the ReplyTo field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetReplyTo

`func (o *SchemasSendMailResponse) SetReplyTo(v []string)`

SetReplyTo sets ReplyTo field to given value.

### HasReplyTo

`func (o *SchemasSendMailResponse) HasReplyTo() bool`

HasReplyTo returns a boolean if a field has been set.

### GetSenderMail

`func (o *SchemasSendMailResponse) GetSenderMail() string`

GetSenderMail returns the SenderMail field if non-nil, zero value otherwise.

### GetSenderMailOk

`func (o *SchemasSendMailResponse) GetSenderMailOk() (*string, bool)`

GetSenderMailOk returns a tuple with the SenderMail field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSenderMail

`func (o *SchemasSendMailResponse) SetSenderMail(v string)`

SetSenderMail sets SenderMail field to given value.


### GetSenderName

`func (o *SchemasSendMailResponse) GetSenderName() string`

GetSenderName returns the SenderName field if non-nil, zero value otherwise.

### GetSenderNameOk

`func (o *SchemasSendMailResponse) GetSenderNameOk() (*string, bool)`

GetSenderNameOk returns a tuple with the SenderName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSenderName

`func (o *SchemasSendMailResponse) SetSenderName(v string)`

SetSenderName sets SenderName field to given value.

### HasSenderName

`func (o *SchemasSendMailResponse) HasSenderName() bool`

HasSenderName returns a boolean if a field has been set.

### GetSubject

`func (o *SchemasSendMailResponse) GetSubject() string`

GetSubject returns the Subject field if non-nil, zero value otherwise.

### GetSubjectOk

`func (o *SchemasSendMailResponse) GetSubjectOk() (*string, bool)`

GetSubjectOk returns a tuple with the Subject field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSubject

`func (o *SchemasSendMailResponse) SetSubject(v string)`

SetSubject sets Subject field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


