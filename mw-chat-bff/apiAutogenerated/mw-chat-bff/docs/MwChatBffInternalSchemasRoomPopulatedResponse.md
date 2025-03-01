# MwChatBffInternalSchemasRoomPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**ImageUrl** | **string** |  | 
**IsBlocked** | **bool** |  | 
**Messages** | [**[]MwChatBffInternalSchemasMessageResponse**](MwChatBffInternalSchemasMessageResponse.md) |  | 
**Name** | **string** |  | 
**RoomId** | **string** |  | 
**RoomType** | **string** |  | 
**UnreadMessagesAmount** | **int32** |  | 
**Users** | [**[]MwChatBffInternalSchemasUserResponse**](MwChatBffInternalSchemasUserResponse.md) |  | 

## Methods

### NewMwChatBffInternalSchemasRoomPopulatedResponse

`func NewMwChatBffInternalSchemasRoomPopulatedResponse(imageUrl string, isBlocked bool, messages []MwChatBffInternalSchemasMessageResponse, name string, roomId string, roomType string, unreadMessagesAmount int32, users []MwChatBffInternalSchemasUserResponse, ) *MwChatBffInternalSchemasRoomPopulatedResponse`

NewMwChatBffInternalSchemasRoomPopulatedResponse instantiates a new MwChatBffInternalSchemasRoomPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwChatBffInternalSchemasRoomPopulatedResponseWithDefaults

`func NewMwChatBffInternalSchemasRoomPopulatedResponseWithDefaults() *MwChatBffInternalSchemasRoomPopulatedResponse`

NewMwChatBffInternalSchemasRoomPopulatedResponseWithDefaults instantiates a new MwChatBffInternalSchemasRoomPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetImageUrl

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) GetImageUrl() string`

GetImageUrl returns the ImageUrl field if non-nil, zero value otherwise.

### GetImageUrlOk

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) GetImageUrlOk() (*string, bool)`

GetImageUrlOk returns a tuple with the ImageUrl field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetImageUrl

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) SetImageUrl(v string)`

SetImageUrl sets ImageUrl field to given value.


### GetIsBlocked

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) GetIsBlocked() bool`

GetIsBlocked returns the IsBlocked field if non-nil, zero value otherwise.

### GetIsBlockedOk

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) GetIsBlockedOk() (*bool, bool)`

GetIsBlockedOk returns a tuple with the IsBlocked field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsBlocked

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) SetIsBlocked(v bool)`

SetIsBlocked sets IsBlocked field to given value.


### GetMessages

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) GetMessages() []MwChatBffInternalSchemasMessageResponse`

GetMessages returns the Messages field if non-nil, zero value otherwise.

### GetMessagesOk

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) GetMessagesOk() (*[]MwChatBffInternalSchemasMessageResponse, bool)`

GetMessagesOk returns a tuple with the Messages field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMessages

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) SetMessages(v []MwChatBffInternalSchemasMessageResponse)`

SetMessages sets Messages field to given value.


### GetName

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) SetName(v string)`

SetName sets Name field to given value.


### GetRoomId

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) GetRoomId() string`

GetRoomId returns the RoomId field if non-nil, zero value otherwise.

### GetRoomIdOk

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) GetRoomIdOk() (*string, bool)`

GetRoomIdOk returns a tuple with the RoomId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRoomId

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) SetRoomId(v string)`

SetRoomId sets RoomId field to given value.


### GetRoomType

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) GetRoomType() string`

GetRoomType returns the RoomType field if non-nil, zero value otherwise.

### GetRoomTypeOk

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) GetRoomTypeOk() (*string, bool)`

GetRoomTypeOk returns a tuple with the RoomType field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetRoomType

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) SetRoomType(v string)`

SetRoomType sets RoomType field to given value.


### GetUnreadMessagesAmount

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) GetUnreadMessagesAmount() int32`

GetUnreadMessagesAmount returns the UnreadMessagesAmount field if non-nil, zero value otherwise.

### GetUnreadMessagesAmountOk

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) GetUnreadMessagesAmountOk() (*int32, bool)`

GetUnreadMessagesAmountOk returns a tuple with the UnreadMessagesAmount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUnreadMessagesAmount

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) SetUnreadMessagesAmount(v int32)`

SetUnreadMessagesAmount sets UnreadMessagesAmount field to given value.


### GetUsers

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) GetUsers() []MwChatBffInternalSchemasUserResponse`

GetUsers returns the Users field if non-nil, zero value otherwise.

### GetUsersOk

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) GetUsersOk() (*[]MwChatBffInternalSchemasUserResponse, bool)`

GetUsersOk returns a tuple with the Users field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUsers

`func (o *MwChatBffInternalSchemasRoomPopulatedResponse) SetUsers(v []MwChatBffInternalSchemasUserResponse)`

SetUsers sets Users field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


