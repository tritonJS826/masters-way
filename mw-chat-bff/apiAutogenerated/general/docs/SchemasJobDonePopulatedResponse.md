# SchemasJobDonePopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**CreatedAt** | **string** |  | 
**DayReportUuid** | **string** |  | 
**Description** | **string** |  | 
**OwnerName** | **string** |  | 
**OwnerUuid** | **string** |  | 
**Tags** | [**[]SchemasLabelResponse**](SchemasLabelResponse.md) |  | 
**Time** | **int32** |  | 
**UpdatedAt** | **string** |  | 
**Uuid** | **string** |  | 
**WayName** | **string** |  | 
**WayUuid** | **string** |  | 

## Methods

### NewSchemasJobDonePopulatedResponse

`func NewSchemasJobDonePopulatedResponse(createdAt string, dayReportUuid string, description string, ownerName string, ownerUuid string, tags []SchemasLabelResponse, time int32, updatedAt string, uuid string, wayName string, wayUuid string, ) *SchemasJobDonePopulatedResponse`

NewSchemasJobDonePopulatedResponse instantiates a new SchemasJobDonePopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasJobDonePopulatedResponseWithDefaults

`func NewSchemasJobDonePopulatedResponseWithDefaults() *SchemasJobDonePopulatedResponse`

NewSchemasJobDonePopulatedResponseWithDefaults instantiates a new SchemasJobDonePopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCreatedAt

`func (o *SchemasJobDonePopulatedResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *SchemasJobDonePopulatedResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *SchemasJobDonePopulatedResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetDayReportUuid

`func (o *SchemasJobDonePopulatedResponse) GetDayReportUuid() string`

GetDayReportUuid returns the DayReportUuid field if non-nil, zero value otherwise.

### GetDayReportUuidOk

`func (o *SchemasJobDonePopulatedResponse) GetDayReportUuidOk() (*string, bool)`

GetDayReportUuidOk returns a tuple with the DayReportUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayReportUuid

`func (o *SchemasJobDonePopulatedResponse) SetDayReportUuid(v string)`

SetDayReportUuid sets DayReportUuid field to given value.


### GetDescription

`func (o *SchemasJobDonePopulatedResponse) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *SchemasJobDonePopulatedResponse) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *SchemasJobDonePopulatedResponse) SetDescription(v string)`

SetDescription sets Description field to given value.


### GetOwnerName

`func (o *SchemasJobDonePopulatedResponse) GetOwnerName() string`

GetOwnerName returns the OwnerName field if non-nil, zero value otherwise.

### GetOwnerNameOk

`func (o *SchemasJobDonePopulatedResponse) GetOwnerNameOk() (*string, bool)`

GetOwnerNameOk returns a tuple with the OwnerName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerName

`func (o *SchemasJobDonePopulatedResponse) SetOwnerName(v string)`

SetOwnerName sets OwnerName field to given value.


### GetOwnerUuid

`func (o *SchemasJobDonePopulatedResponse) GetOwnerUuid() string`

GetOwnerUuid returns the OwnerUuid field if non-nil, zero value otherwise.

### GetOwnerUuidOk

`func (o *SchemasJobDonePopulatedResponse) GetOwnerUuidOk() (*string, bool)`

GetOwnerUuidOk returns a tuple with the OwnerUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerUuid

`func (o *SchemasJobDonePopulatedResponse) SetOwnerUuid(v string)`

SetOwnerUuid sets OwnerUuid field to given value.


### GetTags

`func (o *SchemasJobDonePopulatedResponse) GetTags() []SchemasLabelResponse`

GetTags returns the Tags field if non-nil, zero value otherwise.

### GetTagsOk

`func (o *SchemasJobDonePopulatedResponse) GetTagsOk() (*[]SchemasLabelResponse, bool)`

GetTagsOk returns a tuple with the Tags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTags

`func (o *SchemasJobDonePopulatedResponse) SetTags(v []SchemasLabelResponse)`

SetTags sets Tags field to given value.


### GetTime

`func (o *SchemasJobDonePopulatedResponse) GetTime() int32`

GetTime returns the Time field if non-nil, zero value otherwise.

### GetTimeOk

`func (o *SchemasJobDonePopulatedResponse) GetTimeOk() (*int32, bool)`

GetTimeOk returns a tuple with the Time field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTime

`func (o *SchemasJobDonePopulatedResponse) SetTime(v int32)`

SetTime sets Time field to given value.


### GetUpdatedAt

`func (o *SchemasJobDonePopulatedResponse) GetUpdatedAt() string`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *SchemasJobDonePopulatedResponse) GetUpdatedAtOk() (*string, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *SchemasJobDonePopulatedResponse) SetUpdatedAt(v string)`

SetUpdatedAt sets UpdatedAt field to given value.


### GetUuid

`func (o *SchemasJobDonePopulatedResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *SchemasJobDonePopulatedResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *SchemasJobDonePopulatedResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.


### GetWayName

`func (o *SchemasJobDonePopulatedResponse) GetWayName() string`

GetWayName returns the WayName field if non-nil, zero value otherwise.

### GetWayNameOk

`func (o *SchemasJobDonePopulatedResponse) GetWayNameOk() (*string, bool)`

GetWayNameOk returns a tuple with the WayName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWayName

`func (o *SchemasJobDonePopulatedResponse) SetWayName(v string)`

SetWayName sets WayName field to given value.


### GetWayUuid

`func (o *SchemasJobDonePopulatedResponse) GetWayUuid() string`

GetWayUuid returns the WayUuid field if non-nil, zero value otherwise.

### GetWayUuidOk

`func (o *SchemasJobDonePopulatedResponse) GetWayUuidOk() (*string, bool)`

GetWayUuidOk returns a tuple with the WayUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWayUuid

`func (o *SchemasJobDonePopulatedResponse) SetWayUuid(v string)`

SetWayUuid sets WayUuid field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


