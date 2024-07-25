# SchemasRoomPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**IsBlocked** | **bool** |  | 
**Messages** | [**[]SchemasMessageResponse**](SchemasMessageResponse.md) |  | 
**Name** | **string** |  | 
**RoomId** | **string** |  | 
**Users** | [**[]SchemasUserResponse**](SchemasUserResponse.md) |  | 

## Methods

### NewSchemasRoomPopulatedResponse

`func NewSchemasRoomPopulatedResponse(isBlocked bool, messages []SchemasMessageResponse, name string, roomId string, users []SchemasUserResponse, ) *SchemasRoomPopulatedResponse`

NewSchemasRoomPopulatedResponse instantiates a new SchemasRoomPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasRoomPopulatedResponseWithDefaults

`func NewSchemasRoomPopulatedResponseWithDefaults() *SchemasRoomPopulatedResponse`

NewSchemasRoomPopulatedResponseWithDefaults instantiates a new SchemasRoomPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetIsBlocked

`func (o *SchemasRoomPopulatedResponse) GetIsBlocked() bool`

GetIsBlocked returns the IsBlocked field if non-nil, zero value otherwise.

### GetIsBlockedOk

`func (o *SchemasRoomPopulatedResponse) GetIsBlockedOk() (*bool, bool)`

GetIsBlockedOk returns a tuple with the IsBlocked field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsBlocked

`func (o *SchemasRoomPopulatedResponse) SetIsBlocked(v bool)`

SetIsBlocked sets IsBlocked field to given value.


### GetMessages

`func (o *SchemasRoomPopulatedResponse) GetMessages() []SchemasMessageResponse`

GetMessages returns the Messages field if non-nil, zero value otherwise.

### GetMessagesOk

`func (o *SchemasRoomPopulatedResponse) GetMessagesOk() (*[]SchemasMessageResponse, bool)`

GetMessagesOk returns a tuple with the Messages field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessages

`func (o *SchemasRoomPopulatedResponse) SetMessages(v []SchemasMessageResponse)`

SetMessages sets Messages field to given value.


### GetName

`func (o *SchemasRoomPopulatedResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *SchemasRoomPopulatedResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *SchemasRoomPopulatedResponse) SetName(v string)`

SetName sets Name field to given value.


### GetRoomId

`func (o *SchemasRoomPopulatedResponse) GetRoomId() string`

GetRoomId returns the RoomId field if non-nil, zero value otherwise.

### GetRoomIdOk

`func (o *SchemasRoomPopulatedResponse) GetRoomIdOk() (*string, bool)`

GetRoomIdOk returns a tuple with the RoomId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRoomId

`func (o *SchemasRoomPopulatedResponse) SetRoomId(v string)`

SetRoomId sets RoomId field to given value.


### GetUsers

`func (o *SchemasRoomPopulatedResponse) GetUsers() []SchemasUserResponse`

GetUsers returns the Users field if non-nil, zero value otherwise.

### GetUsersOk

`func (o *SchemasRoomPopulatedResponse) GetUsersOk() (*[]SchemasUserResponse, bool)`

GetUsersOk returns a tuple with the Users field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsers

`func (o *SchemasRoomPopulatedResponse) SetUsers(v []SchemasUserResponse)`

SetUsers sets Users field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


