# SchemasSendMessagePayload

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Message** | [**SchemasMessageResponse**](SchemasMessageResponse.md) |  | 
**Users** | **[]string** |  | 

## Methods

### NewSchemasSendMessagePayload

`func NewSchemasSendMessagePayload(message SchemasMessageResponse, users []string, ) *SchemasSendMessagePayload`

NewSchemasSendMessagePayload instantiates a new SchemasSendMessagePayload object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasSendMessagePayloadWithDefaults

`func NewSchemasSendMessagePayloadWithDefaults() *SchemasSendMessagePayload`

NewSchemasSendMessagePayloadWithDefaults instantiates a new SchemasSendMessagePayload object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetMessage

`func (o *SchemasSendMessagePayload) GetMessage() SchemasMessageResponse`

GetMessage returns the Message field if non-nil, zero value otherwise.

### GetMessageOk

`func (o *SchemasSendMessagePayload) GetMessageOk() (*SchemasMessageResponse, bool)`

GetMessageOk returns a tuple with the Message field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessage

`func (o *SchemasSendMessagePayload) SetMessage(v SchemasMessageResponse)`

SetMessage sets Message field to given value.


### GetUsers

`func (o *SchemasSendMessagePayload) GetUsers() []string`

GetUsers returns the Users field if non-nil, zero value otherwise.

### GetUsersOk

`func (o *SchemasSendMessagePayload) GetUsersOk() (*[]string, bool)`

GetUsersOk returns a tuple with the Users field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsers

`func (o *SchemasSendMessagePayload) SetUsers(v []string)`

SetUsers sets Users field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


