# MwserverInternalSchemasPlanPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**CreatedAt** | **string** |  | 
**DayReportUuid** | **string** |  | 
**Description** | **string** |  | 
**IsDone** | **bool** |  | 
**OwnerName** | **string** |  | 
**OwnerUuid** | **string** |  | 
**Tags** | [**[]MwserverInternalSchemasJobTagResponse**](MwserverInternalSchemasJobTagResponse.md) |  | 
**Time** | **int32** |  | 
**UpdatedAt** | **string** |  | 
**Uuid** | **string** |  | 
**WayName** | **string** |  | 
**WayUuid** | **string** |  | 

## Methods

### NewMwserverInternalSchemasPlanPopulatedResponse

`func NewMwserverInternalSchemasPlanPopulatedResponse(createdAt string, dayReportUuid string, description string, isDone bool, ownerName string, ownerUuid string, tags []MwserverInternalSchemasJobTagResponse, time int32, updatedAt string, uuid string, wayName string, wayUuid string, ) *MwserverInternalSchemasPlanPopulatedResponse`

NewMwserverInternalSchemasPlanPopulatedResponse instantiates a new MwserverInternalSchemasPlanPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwserverInternalSchemasPlanPopulatedResponseWithDefaults

`func NewMwserverInternalSchemasPlanPopulatedResponseWithDefaults() *MwserverInternalSchemasPlanPopulatedResponse`

NewMwserverInternalSchemasPlanPopulatedResponseWithDefaults instantiates a new MwserverInternalSchemasPlanPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCreatedAt

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *MwserverInternalSchemasPlanPopulatedResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetDayReportUuid

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetDayReportUuid() string`

GetDayReportUuid returns the DayReportUuid field if non-nil, zero value otherwise.

### GetDayReportUuidOk

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetDayReportUuidOk() (*string, bool)`

GetDayReportUuidOk returns a tuple with the DayReportUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayReportUuid

`func (o *MwserverInternalSchemasPlanPopulatedResponse) SetDayReportUuid(v string)`

SetDayReportUuid sets DayReportUuid field to given value.


### GetDescription

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *MwserverInternalSchemasPlanPopulatedResponse) SetDescription(v string)`

SetDescription sets Description field to given value.


### GetIsDone

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetIsDone() bool`

GetIsDone returns the IsDone field if non-nil, zero value otherwise.

### GetIsDoneOk

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetIsDoneOk() (*bool, bool)`

GetIsDoneOk returns a tuple with the IsDone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsDone

`func (o *MwserverInternalSchemasPlanPopulatedResponse) SetIsDone(v bool)`

SetIsDone sets IsDone field to given value.


### GetOwnerName

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetOwnerName() string`

GetOwnerName returns the OwnerName field if non-nil, zero value otherwise.

### GetOwnerNameOk

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetOwnerNameOk() (*string, bool)`

GetOwnerNameOk returns a tuple with the OwnerName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerName

`func (o *MwserverInternalSchemasPlanPopulatedResponse) SetOwnerName(v string)`

SetOwnerName sets OwnerName field to given value.


### GetOwnerUuid

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetOwnerUuid() string`

GetOwnerUuid returns the OwnerUuid field if non-nil, zero value otherwise.

### GetOwnerUuidOk

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetOwnerUuidOk() (*string, bool)`

GetOwnerUuidOk returns a tuple with the OwnerUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerUuid

`func (o *MwserverInternalSchemasPlanPopulatedResponse) SetOwnerUuid(v string)`

SetOwnerUuid sets OwnerUuid field to given value.


### GetTags

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetTags() []MwserverInternalSchemasJobTagResponse`

GetTags returns the Tags field if non-nil, zero value otherwise.

### GetTagsOk

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetTagsOk() (*[]MwserverInternalSchemasJobTagResponse, bool)`

GetTagsOk returns a tuple with the Tags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTags

`func (o *MwserverInternalSchemasPlanPopulatedResponse) SetTags(v []MwserverInternalSchemasJobTagResponse)`

SetTags sets Tags field to given value.


### GetTime

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetTime() int32`

GetTime returns the Time field if non-nil, zero value otherwise.

### GetTimeOk

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetTimeOk() (*int32, bool)`

GetTimeOk returns a tuple with the Time field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTime

`func (o *MwserverInternalSchemasPlanPopulatedResponse) SetTime(v int32)`

SetTime sets Time field to given value.


### GetUpdatedAt

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetUpdatedAt() string`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetUpdatedAtOk() (*string, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *MwserverInternalSchemasPlanPopulatedResponse) SetUpdatedAt(v string)`

SetUpdatedAt sets UpdatedAt field to given value.


### GetUuid

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *MwserverInternalSchemasPlanPopulatedResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.


### GetWayName

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetWayName() string`

GetWayName returns the WayName field if non-nil, zero value otherwise.

### GetWayNameOk

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetWayNameOk() (*string, bool)`

GetWayNameOk returns a tuple with the WayName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWayName

`func (o *MwserverInternalSchemasPlanPopulatedResponse) SetWayName(v string)`

SetWayName sets WayName field to given value.


### GetWayUuid

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetWayUuid() string`

GetWayUuid returns the WayUuid field if non-nil, zero value otherwise.

### GetWayUuidOk

`func (o *MwserverInternalSchemasPlanPopulatedResponse) GetWayUuidOk() (*string, bool)`

GetWayUuidOk returns a tuple with the WayUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWayUuid

`func (o *MwserverInternalSchemasPlanPopulatedResponse) SetWayUuid(v string)`

SetWayUuid sets WayUuid field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


