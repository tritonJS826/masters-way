# SchemasCreatePlanPayload

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**DayReportUuid** | **string** |  | 
**Description** | **string** |  | 
**IsDone** | **bool** |  | 
**OwnerUuid** | **string** |  | 
**Time** | **int32** |  | 

## Methods

### NewSchemasCreatePlanPayload

`func NewSchemasCreatePlanPayload(dayReportUuid string, description string, isDone bool, ownerUuid string, time int32, ) *SchemasCreatePlanPayload`

NewSchemasCreatePlanPayload instantiates a new SchemasCreatePlanPayload object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasCreatePlanPayloadWithDefaults

`func NewSchemasCreatePlanPayloadWithDefaults() *SchemasCreatePlanPayload`

NewSchemasCreatePlanPayloadWithDefaults instantiates a new SchemasCreatePlanPayload object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetDayReportUuid

`func (o *SchemasCreatePlanPayload) GetDayReportUuid() string`

GetDayReportUuid returns the DayReportUuid field if non-nil, zero value otherwise.

### GetDayReportUuidOk

`func (o *SchemasCreatePlanPayload) GetDayReportUuidOk() (*string, bool)`

GetDayReportUuidOk returns a tuple with the DayReportUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayReportUuid

`func (o *SchemasCreatePlanPayload) SetDayReportUuid(v string)`

SetDayReportUuid sets DayReportUuid field to given value.


### GetDescription

`func (o *SchemasCreatePlanPayload) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *SchemasCreatePlanPayload) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *SchemasCreatePlanPayload) SetDescription(v string)`

SetDescription sets Description field to given value.


### GetIsDone

`func (o *SchemasCreatePlanPayload) GetIsDone() bool`

GetIsDone returns the IsDone field if non-nil, zero value otherwise.

### GetIsDoneOk

`func (o *SchemasCreatePlanPayload) GetIsDoneOk() (*bool, bool)`

GetIsDoneOk returns a tuple with the IsDone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsDone

`func (o *SchemasCreatePlanPayload) SetIsDone(v bool)`

SetIsDone sets IsDone field to given value.


### GetOwnerUuid

`func (o *SchemasCreatePlanPayload) GetOwnerUuid() string`

GetOwnerUuid returns the OwnerUuid field if non-nil, zero value otherwise.

### GetOwnerUuidOk

`func (o *SchemasCreatePlanPayload) GetOwnerUuidOk() (*string, bool)`

GetOwnerUuidOk returns a tuple with the OwnerUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerUuid

`func (o *SchemasCreatePlanPayload) SetOwnerUuid(v string)`

SetOwnerUuid sets OwnerUuid field to given value.


### GetTime

`func (o *SchemasCreatePlanPayload) GetTime() int32`

GetTime returns the Time field if non-nil, zero value otherwise.

### GetTimeOk

`func (o *SchemasCreatePlanPayload) GetTimeOk() (*int32, bool)`

GetTimeOk returns a tuple with the Time field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTime

`func (o *SchemasCreatePlanPayload) SetTime(v int32)`

SetTime sets Time field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


