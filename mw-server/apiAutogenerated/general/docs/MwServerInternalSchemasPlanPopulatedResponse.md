# MwServerInternalSchemasPlanPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**CreatedAt** | **string** |  | 
**DayReportUuid** | **string** |  | 
**Description** | **string** |  | 
**IsDone** | **bool** |  | 
**OwnerName** | **string** |  | 
**OwnerUuid** | **string** |  | 
**Tags** | [**[]MwServerInternalSchemasJobTagResponse**](MwServerInternalSchemasJobTagResponse.md) |  | 
**Time** | **int32** |  | 
**UpdatedAt** | **string** |  | 
**Uuid** | **string** |  | 
**WayName** | **string** |  | 
**WayUuid** | **string** |  | 

## Methods

### NewMwServerInternalSchemasPlanPopulatedResponse

`func NewMwServerInternalSchemasPlanPopulatedResponse(createdAt string, dayReportUuid string, description string, isDone bool, ownerName string, ownerUuid string, tags []MwServerInternalSchemasJobTagResponse, time int32, updatedAt string, uuid string, wayName string, wayUuid string, ) *MwServerInternalSchemasPlanPopulatedResponse`

NewMwServerInternalSchemasPlanPopulatedResponse instantiates a new MwServerInternalSchemasPlanPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwServerInternalSchemasPlanPopulatedResponseWithDefaults

`func NewMwServerInternalSchemasPlanPopulatedResponseWithDefaults() *MwServerInternalSchemasPlanPopulatedResponse`

NewMwServerInternalSchemasPlanPopulatedResponseWithDefaults instantiates a new MwServerInternalSchemasPlanPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCreatedAt

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *MwServerInternalSchemasPlanPopulatedResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetDayReportUuid

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetDayReportUuid() string`

GetDayReportUuid returns the DayReportUuid field if non-nil, zero value otherwise.

### GetDayReportUuidOk

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetDayReportUuidOk() (*string, bool)`

GetDayReportUuidOk returns a tuple with the DayReportUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayReportUuid

`func (o *MwServerInternalSchemasPlanPopulatedResponse) SetDayReportUuid(v string)`

SetDayReportUuid sets DayReportUuid field to given value.


### GetDescription

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *MwServerInternalSchemasPlanPopulatedResponse) SetDescription(v string)`

SetDescription sets Description field to given value.


### GetIsDone

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetIsDone() bool`

GetIsDone returns the IsDone field if non-nil, zero value otherwise.

### GetIsDoneOk

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetIsDoneOk() (*bool, bool)`

GetIsDoneOk returns a tuple with the IsDone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsDone

`func (o *MwServerInternalSchemasPlanPopulatedResponse) SetIsDone(v bool)`

SetIsDone sets IsDone field to given value.


### GetOwnerName

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetOwnerName() string`

GetOwnerName returns the OwnerName field if non-nil, zero value otherwise.

### GetOwnerNameOk

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetOwnerNameOk() (*string, bool)`

GetOwnerNameOk returns a tuple with the OwnerName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerName

`func (o *MwServerInternalSchemasPlanPopulatedResponse) SetOwnerName(v string)`

SetOwnerName sets OwnerName field to given value.


### GetOwnerUuid

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetOwnerUuid() string`

GetOwnerUuid returns the OwnerUuid field if non-nil, zero value otherwise.

### GetOwnerUuidOk

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetOwnerUuidOk() (*string, bool)`

GetOwnerUuidOk returns a tuple with the OwnerUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerUuid

`func (o *MwServerInternalSchemasPlanPopulatedResponse) SetOwnerUuid(v string)`

SetOwnerUuid sets OwnerUuid field to given value.


### GetTags

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetTags() []MwServerInternalSchemasJobTagResponse`

GetTags returns the Tags field if non-nil, zero value otherwise.

### GetTagsOk

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetTagsOk() (*[]MwServerInternalSchemasJobTagResponse, bool)`

GetTagsOk returns a tuple with the Tags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTags

`func (o *MwServerInternalSchemasPlanPopulatedResponse) SetTags(v []MwServerInternalSchemasJobTagResponse)`

SetTags sets Tags field to given value.


### GetTime

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetTime() int32`

GetTime returns the Time field if non-nil, zero value otherwise.

### GetTimeOk

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetTimeOk() (*int32, bool)`

GetTimeOk returns a tuple with the Time field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTime

`func (o *MwServerInternalSchemasPlanPopulatedResponse) SetTime(v int32)`

SetTime sets Time field to given value.


### GetUpdatedAt

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetUpdatedAt() string`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetUpdatedAtOk() (*string, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *MwServerInternalSchemasPlanPopulatedResponse) SetUpdatedAt(v string)`

SetUpdatedAt sets UpdatedAt field to given value.


### GetUuid

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *MwServerInternalSchemasPlanPopulatedResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.


### GetWayName

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetWayName() string`

GetWayName returns the WayName field if non-nil, zero value otherwise.

### GetWayNameOk

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetWayNameOk() (*string, bool)`

GetWayNameOk returns a tuple with the WayName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWayName

`func (o *MwServerInternalSchemasPlanPopulatedResponse) SetWayName(v string)`

SetWayName sets WayName field to given value.


### GetWayUuid

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetWayUuid() string`

GetWayUuid returns the WayUuid field if non-nil, zero value otherwise.

### GetWayUuidOk

`func (o *MwServerInternalSchemasPlanPopulatedResponse) GetWayUuidOk() (*string, bool)`

GetWayUuidOk returns a tuple with the WayUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWayUuid

`func (o *MwServerInternalSchemasPlanPopulatedResponse) SetWayUuid(v string)`

SetWayUuid sets WayUuid field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


