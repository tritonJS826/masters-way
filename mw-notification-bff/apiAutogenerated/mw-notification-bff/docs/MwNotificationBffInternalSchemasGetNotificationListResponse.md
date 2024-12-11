# MwNotificationBffInternalSchemasGetNotificationListResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Notifications** | [**[]MwNotificationBffInternalSchemasNotificationResponse**](MwNotificationBffInternalSchemasNotificationResponse.md) |  | 
**TotalSize** | **int32** |  | 
**UnreadSize** | **int32** |  | 

## Methods

### NewMwNotificationBffInternalSchemasGetNotificationListResponse

`func NewMwNotificationBffInternalSchemasGetNotificationListResponse(notifications []MwNotificationBffInternalSchemasNotificationResponse, totalSize int32, unreadSize int32, ) *MwNotificationBffInternalSchemasGetNotificationListResponse`

NewMwNotificationBffInternalSchemasGetNotificationListResponse instantiates a new MwNotificationBffInternalSchemasGetNotificationListResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwNotificationBffInternalSchemasGetNotificationListResponseWithDefaults

`func NewMwNotificationBffInternalSchemasGetNotificationListResponseWithDefaults() *MwNotificationBffInternalSchemasGetNotificationListResponse`

NewMwNotificationBffInternalSchemasGetNotificationListResponseWithDefaults instantiates a new MwNotificationBffInternalSchemasGetNotificationListResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetNotifications

`func (o *MwNotificationBffInternalSchemasGetNotificationListResponse) GetNotifications() []MwNotificationBffInternalSchemasNotificationResponse`

GetNotifications returns the Notifications field if non-nil, zero value otherwise.

### GetNotificationsOk

`func (o *MwNotificationBffInternalSchemasGetNotificationListResponse) GetNotificationsOk() (*[]MwNotificationBffInternalSchemasNotificationResponse, bool)`

GetNotificationsOk returns a tuple with the Notifications field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNotifications

`func (o *MwNotificationBffInternalSchemasGetNotificationListResponse) SetNotifications(v []MwNotificationBffInternalSchemasNotificationResponse)`

SetNotifications sets Notifications field to given value.


### GetTotalSize

`func (o *MwNotificationBffInternalSchemasGetNotificationListResponse) GetTotalSize() int32`

GetTotalSize returns the TotalSize field if non-nil, zero value otherwise.

### GetTotalSizeOk

`func (o *MwNotificationBffInternalSchemasGetNotificationListResponse) GetTotalSizeOk() (*int32, bool)`

GetTotalSizeOk returns a tuple with the TotalSize field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTotalSize

`func (o *MwNotificationBffInternalSchemasGetNotificationListResponse) SetTotalSize(v int32)`

SetTotalSize sets TotalSize field to given value.


### GetUnreadSize

`func (o *MwNotificationBffInternalSchemasGetNotificationListResponse) GetUnreadSize() int32`

GetUnreadSize returns the UnreadSize field if non-nil, zero value otherwise.

### GetUnreadSizeOk

`func (o *MwNotificationBffInternalSchemasGetNotificationListResponse) GetUnreadSizeOk() (*int32, bool)`

GetUnreadSizeOk returns a tuple with the UnreadSize field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUnreadSize

`func (o *MwNotificationBffInternalSchemasGetNotificationListResponse) SetUnreadSize(v int32)`

SetUnreadSize sets UnreadSize field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


