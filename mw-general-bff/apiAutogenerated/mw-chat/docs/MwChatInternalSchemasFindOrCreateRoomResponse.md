# MwChatInternalSchemasFindOrCreateRoomResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**IsAlreadyCreated** | **bool** |  | 
**Room** | [**MwChatInternalSchemasRoomPopulatedResponse**](MwChatInternalSchemasRoomPopulatedResponse.md) |  | 

## Methods

### NewMwChatInternalSchemasFindOrCreateRoomResponse

`func NewMwChatInternalSchemasFindOrCreateRoomResponse(isAlreadyCreated bool, room MwChatInternalSchemasRoomPopulatedResponse, ) *MwChatInternalSchemasFindOrCreateRoomResponse`

NewMwChatInternalSchemasFindOrCreateRoomResponse instantiates a new MwChatInternalSchemasFindOrCreateRoomResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwChatInternalSchemasFindOrCreateRoomResponseWithDefaults

`func NewMwChatInternalSchemasFindOrCreateRoomResponseWithDefaults() *MwChatInternalSchemasFindOrCreateRoomResponse`

NewMwChatInternalSchemasFindOrCreateRoomResponseWithDefaults instantiates a new MwChatInternalSchemasFindOrCreateRoomResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetIsAlreadyCreated

`func (o *MwChatInternalSchemasFindOrCreateRoomResponse) GetIsAlreadyCreated() bool`

GetIsAlreadyCreated returns the IsAlreadyCreated field if non-nil, zero value otherwise.

### GetIsAlreadyCreatedOk

`func (o *MwChatInternalSchemasFindOrCreateRoomResponse) GetIsAlreadyCreatedOk() (*bool, bool)`

GetIsAlreadyCreatedOk returns a tuple with the IsAlreadyCreated field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsAlreadyCreated

`func (o *MwChatInternalSchemasFindOrCreateRoomResponse) SetIsAlreadyCreated(v bool)`

SetIsAlreadyCreated sets IsAlreadyCreated field to given value.


### GetRoom

`func (o *MwChatInternalSchemasFindOrCreateRoomResponse) GetRoom() MwChatInternalSchemasRoomPopulatedResponse`

GetRoom returns the Room field if non-nil, zero value otherwise.

### GetRoomOk

`func (o *MwChatInternalSchemasFindOrCreateRoomResponse) GetRoomOk() (*MwChatInternalSchemasRoomPopulatedResponse, bool)`

GetRoomOk returns a tuple with the Room field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRoom

`func (o *MwChatInternalSchemasFindOrCreateRoomResponse) SetRoom(v MwChatInternalSchemasRoomPopulatedResponse)`

SetRoom sets Room field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


