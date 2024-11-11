# MwchatInternalSchemasRoomPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**IsBlocked** | **bool** |  | 
**Messages** | [**[]MwchatInternalSchemasMessageResponse**](MwchatInternalSchemasMessageResponse.md) |  | 
**Name** | **NullableString** |  | 
**RoomId** | **string** |  | 
**RoomType** | **string** |  | 
**Users** | [**[]MwchatInternalSchemasUserResponse**](MwchatInternalSchemasUserResponse.md) |  | 

## Methods

### NewMwchatInternalSchemasRoomPopulatedResponse

`func NewMwchatInternalSchemasRoomPopulatedResponse(isBlocked bool, messages []MwchatInternalSchemasMessageResponse, name NullableString, roomId string, roomType string, users []MwchatInternalSchemasUserResponse, ) *MwchatInternalSchemasRoomPopulatedResponse`

NewMwchatInternalSchemasRoomPopulatedResponse instantiates a new MwchatInternalSchemasRoomPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwchatInternalSchemasRoomPopulatedResponseWithDefaults

`func NewMwchatInternalSchemasRoomPopulatedResponseWithDefaults() *MwchatInternalSchemasRoomPopulatedResponse`

NewMwchatInternalSchemasRoomPopulatedResponseWithDefaults instantiates a new MwchatInternalSchemasRoomPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetIsBlocked

`func (o *MwchatInternalSchemasRoomPopulatedResponse) GetIsBlocked() bool`

GetIsBlocked returns the IsBlocked field if non-nil, zero value otherwise.

### GetIsBlockedOk

`func (o *MwchatInternalSchemasRoomPopulatedResponse) GetIsBlockedOk() (*bool, bool)`

GetIsBlockedOk returns a tuple with the IsBlocked field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsBlocked

`func (o *MwchatInternalSchemasRoomPopulatedResponse) SetIsBlocked(v bool)`

SetIsBlocked sets IsBlocked field to given value.


### GetMessages

`func (o *MwchatInternalSchemasRoomPopulatedResponse) GetMessages() []MwchatInternalSchemasMessageResponse`

GetMessages returns the Messages field if non-nil, zero value otherwise.

### GetMessagesOk

`func (o *MwchatInternalSchemasRoomPopulatedResponse) GetMessagesOk() (*[]MwchatInternalSchemasMessageResponse, bool)`

GetMessagesOk returns a tuple with the Messages field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessages

`func (o *MwchatInternalSchemasRoomPopulatedResponse) SetMessages(v []MwchatInternalSchemasMessageResponse)`

SetMessages sets Messages field to given value.


### GetName

`func (o *MwchatInternalSchemasRoomPopulatedResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *MwchatInternalSchemasRoomPopulatedResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *MwchatInternalSchemasRoomPopulatedResponse) SetName(v string)`

SetName sets Name field to given value.


### SetNameNil

`func (o *MwchatInternalSchemasRoomPopulatedResponse) SetNameNil(b bool)`

 SetNameNil sets the value for Name to be an explicit nil

### UnsetName
`func (o *MwchatInternalSchemasRoomPopulatedResponse) UnsetName()`

UnsetName ensures that no value is present for Name, not even an explicit nil
### GetRoomId

`func (o *MwchatInternalSchemasRoomPopulatedResponse) GetRoomId() string`

GetRoomId returns the RoomId field if non-nil, zero value otherwise.

### GetRoomIdOk

`func (o *MwchatInternalSchemasRoomPopulatedResponse) GetRoomIdOk() (*string, bool)`

GetRoomIdOk returns a tuple with the RoomId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRoomId

`func (o *MwchatInternalSchemasRoomPopulatedResponse) SetRoomId(v string)`

SetRoomId sets RoomId field to given value.


### GetRoomType

`func (o *MwchatInternalSchemasRoomPopulatedResponse) GetRoomType() string`

GetRoomType returns the RoomType field if non-nil, zero value otherwise.

### GetRoomTypeOk

`func (o *MwchatInternalSchemasRoomPopulatedResponse) GetRoomTypeOk() (*string, bool)`

GetRoomTypeOk returns a tuple with the RoomType field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRoomType

`func (o *MwchatInternalSchemasRoomPopulatedResponse) SetRoomType(v string)`

SetRoomType sets RoomType field to given value.


### GetUsers

`func (o *MwchatInternalSchemasRoomPopulatedResponse) GetUsers() []MwchatInternalSchemasUserResponse`

GetUsers returns the Users field if non-nil, zero value otherwise.

### GetUsersOk

`func (o *MwchatInternalSchemasRoomPopulatedResponse) GetUsersOk() (*[]MwchatInternalSchemasUserResponse, bool)`

GetUsersOk returns a tuple with the Users field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsers

`func (o *MwchatInternalSchemasRoomPopulatedResponse) SetUsers(v []MwchatInternalSchemasUserResponse)`

SetUsers sets Users field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


