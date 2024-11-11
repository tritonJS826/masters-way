# MwChatWebsocketInternalSchemasSendMessagePayload

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Message** | [**MwChatWebsocketInternalSchemasMessageResponse**](MwChatWebsocketInternalSchemasMessageResponse.md) |  | 
**Users** | **[]string** |  | 

## Methods

### NewMwChatWebsocketInternalSchemasSendMessagePayload

`func NewMwChatWebsocketInternalSchemasSendMessagePayload(message MwChatWebsocketInternalSchemasMessageResponse, users []string, ) *MwChatWebsocketInternalSchemasSendMessagePayload`

NewMwChatWebsocketInternalSchemasSendMessagePayload instantiates a new MwChatWebsocketInternalSchemasSendMessagePayload object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwChatWebsocketInternalSchemasSendMessagePayloadWithDefaults

`func NewMwChatWebsocketInternalSchemasSendMessagePayloadWithDefaults() *MwChatWebsocketInternalSchemasSendMessagePayload`

NewMwChatWebsocketInternalSchemasSendMessagePayloadWithDefaults instantiates a new MwChatWebsocketInternalSchemasSendMessagePayload object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetMessage

`func (o *MwChatWebsocketInternalSchemasSendMessagePayload) GetMessage() MwChatWebsocketInternalSchemasMessageResponse`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *MwChatWebsocketInternalSchemasSendMessagePayload) GetMessageOk() (*MwChatWebsocketInternalSchemasMessageResponse, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *MwChatWebsocketInternalSchemasSendMessagePayload) SetMessage(v MwChatWebsocketInternalSchemasMessageResponse)`

SetMessage sets Message field to given value.


### GetUsers

`func (o *MwChatWebsocketInternalSchemasSendMessagePayload) GetUsers() []string`

GetUsers returns the Users field if non-nil, zero value otherwise.

### GetUsersOk

`func (o *MwChatWebsocketInternalSchemasSendMessagePayload) GetUsersOk() (*[]string, bool)`

GetUsersOk returns a tuple with the Users field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsers

`func (o *MwChatWebsocketInternalSchemasSendMessagePayload) SetUsers(v []string)`

SetUsers sets Users field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


