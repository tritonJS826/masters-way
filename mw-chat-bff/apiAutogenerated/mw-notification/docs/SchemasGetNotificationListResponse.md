# SchemasGetNotificationListResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Notifications** | [**[]SchemasNotificationResponse**](SchemasNotificationResponse.md) |  | 
**Size** | **int32** |  | 

## Methods

### NewSchemasGetNotificationListResponse

`func NewSchemasGetNotificationListResponse(notifications []SchemasNotificationResponse, size int32, ) *SchemasGetNotificationListResponse`

NewSchemasGetNotificationListResponse instantiates a new SchemasGetNotificationListResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasGetNotificationListResponseWithDefaults

`func NewSchemasGetNotificationListResponseWithDefaults() *SchemasGetNotificationListResponse`

NewSchemasGetNotificationListResponseWithDefaults instantiates a new SchemasGetNotificationListResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetNotifications

`func (o *SchemasGetNotificationListResponse) GetNotifications() []SchemasNotificationResponse`

GetNotifications returns the Notifications field if non-nil, zero value otherwise.

### GetNotificationsOk

`func (o *SchemasGetNotificationListResponse) GetNotificationsOk() (*[]SchemasNotificationResponse, bool)`

GetNotificationsOk returns a tuple with the Notifications field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetNotifications

`func (o *SchemasGetNotificationListResponse) SetNotifications(v []SchemasNotificationResponse)`

SetNotifications sets Notifications field to given value.


### GetSize

`func (o *SchemasGetNotificationListResponse) GetSize() int32`

GetSize returns the Size field if non-nil, zero value otherwise.

### GetSizeOk

`func (o *SchemasGetNotificationListResponse) GetSizeOk() (*int32, bool)`

GetSizeOk returns a tuple with the Size field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSize

`func (o *SchemasGetNotificationListResponse) SetSize(v int32)`

SetSize sets Size field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


