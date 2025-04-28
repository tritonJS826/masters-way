# MwChatInternalSchemasRoomPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**IsBlocked** | **bool** |  | 
**Messages** | [**[]MwChatInternalSchemasMessageResponse**](MwChatInternalSchemasMessageResponse.md) |  | 
**Name** | **NullableString** |  | 
**RoomId** | **string** |  | 
**RoomType** | **string** |  | 
**UnreadMessagesAmount** | **int32** |  | 
**Users** | [**[]MwChatInternalSchemasUserResponse**](MwChatInternalSchemasUserResponse.md) |  | 

## Methods

### NewMwChatInternalSchemasRoomPopulatedResponse

`func NewMwChatInternalSchemasRoomPopulatedResponse(isBlocked bool, messages []MwChatInternalSchemasMessageResponse, name NullableString, roomId string, roomType string, unreadMessagesAmount int32, users []MwChatInternalSchemasUserResponse, ) *MwChatInternalSchemasRoomPopulatedResponse`

NewMwChatInternalSchemasRoomPopulatedResponse instantiates a new MwChatInternalSchemasRoomPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwChatInternalSchemasRoomPopulatedResponseWithDefaults

`func NewMwChatInternalSchemasRoomPopulatedResponseWithDefaults() *MwChatInternalSchemasRoomPopulatedResponse`

NewMwChatInternalSchemasRoomPopulatedResponseWithDefaults instantiates a new MwChatInternalSchemasRoomPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetIsBlocked

`func (o *MwChatInternalSchemasRoomPopulatedResponse) GetIsBlocked() bool`

GetIsBlocked returns the IsBlocked field if non-nil, zero value otherwise.

### GetIsBlockedOk

`func (o *MwChatInternalSchemasRoomPopulatedResponse) GetIsBlockedOk() (*bool, bool)`

GetIsBlockedOk returns a tuple with the IsBlocked field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsBlocked

`func (o *MwChatInternalSchemasRoomPopulatedResponse) SetIsBlocked(v bool)`

SetIsBlocked sets IsBlocked field to given value.


### GetMessages

`func (o *MwChatInternalSchemasRoomPopulatedResponse) GetMessages() []MwChatInternalSchemasMessageResponse`

GetMessages returns the Messages field if non-nil, zero value otherwise.

### GetMessagesOk

`func (o *MwChatInternalSchemasRoomPopulatedResponse) GetMessagesOk() (*[]MwChatInternalSchemasMessageResponse, bool)`

GetMessagesOk returns a tuple with the Messages field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessages

`func (o *MwChatInternalSchemasRoomPopulatedResponse) SetMessages(v []MwChatInternalSchemasMessageResponse)`

SetMessages sets Messages field to given value.


### GetName

`func (o *MwChatInternalSchemasRoomPopulatedResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *MwChatInternalSchemasRoomPopulatedResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *MwChatInternalSchemasRoomPopulatedResponse) SetName(v string)`

SetName sets Name field to given value.


### SetNameNil

`func (o *MwChatInternalSchemasRoomPopulatedResponse) SetNameNil(b bool)`

 SetNameNil sets the value for Name to be an explicit nil

### UnsetName
`func (o *MwChatInternalSchemasRoomPopulatedResponse) UnsetName()`

UnsetName ensures that no value is present for Name, not even an explicit nil
### GetRoomId

`func (o *MwChatInternalSchemasRoomPopulatedResponse) GetRoomId() string`

GetRoomId returns the RoomId field if non-nil, zero value otherwise.

### GetRoomIdOk

`func (o *MwChatInternalSchemasRoomPopulatedResponse) GetRoomIdOk() (*string, bool)`

GetRoomIdOk returns a tuple with the RoomId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRoomId

`func (o *MwChatInternalSchemasRoomPopulatedResponse) SetRoomId(v string)`

SetRoomId sets RoomId field to given value.


### GetRoomType

`func (o *MwChatInternalSchemasRoomPopulatedResponse) GetRoomType() string`

GetRoomType returns the RoomType field if non-nil, zero value otherwise.

### GetRoomTypeOk

`func (o *MwChatInternalSchemasRoomPopulatedResponse) GetRoomTypeOk() (*string, bool)`

GetRoomTypeOk returns a tuple with the RoomType field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRoomType

`func (o *MwChatInternalSchemasRoomPopulatedResponse) SetRoomType(v string)`

SetRoomType sets RoomType field to given value.


### GetUnreadMessagesAmount

`func (o *MwChatInternalSchemasRoomPopulatedResponse) GetUnreadMessagesAmount() int32`

GetUnreadMessagesAmount returns the UnreadMessagesAmount field if non-nil, zero value otherwise.

### GetUnreadMessagesAmountOk

`func (o *MwChatInternalSchemasRoomPopulatedResponse) GetUnreadMessagesAmountOk() (*int32, bool)`

GetUnreadMessagesAmountOk returns a tuple with the UnreadMessagesAmount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUnreadMessagesAmount

`func (o *MwChatInternalSchemasRoomPopulatedResponse) SetUnreadMessagesAmount(v int32)`

SetUnreadMessagesAmount sets UnreadMessagesAmount field to given value.


### GetUsers

`func (o *MwChatInternalSchemasRoomPopulatedResponse) GetUsers() []MwChatInternalSchemasUserResponse`

GetUsers returns the Users field if non-nil, zero value otherwise.

### GetUsersOk

`func (o *MwChatInternalSchemasRoomPopulatedResponse) GetUsersOk() (*[]MwChatInternalSchemasUserResponse, bool)`

GetUsersOk returns a tuple with the Users field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsers

`func (o *MwChatInternalSchemasRoomPopulatedResponse) SetUsers(v []MwChatInternalSchemasUserResponse)`

SetUsers sets Users field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


