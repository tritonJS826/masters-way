# SchemasCreateJobDonePayload

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**DayReportUuid** | **string** |  | 
**Description** | **string** |  | 
**LabelUuids** | **[]string** |  | 
**OwnerUuid** | **string** |  | 
**Time** | **int32** |  | 

## Methods

### NewSchemasCreateJobDonePayload

`func NewSchemasCreateJobDonePayload(dayReportUuid string, description string, labelUuids []string, ownerUuid string, time int32, ) *SchemasCreateJobDonePayload`

NewSchemasCreateJobDonePayload instantiates a new SchemasCreateJobDonePayload object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasCreateJobDonePayloadWithDefaults

`func NewSchemasCreateJobDonePayloadWithDefaults() *SchemasCreateJobDonePayload`

NewSchemasCreateJobDonePayloadWithDefaults instantiates a new SchemasCreateJobDonePayload object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetDayReportUuid

`func (o *SchemasCreateJobDonePayload) GetDayReportUuid() string`

GetDayReportUuid returns the DayReportUuid field if non-nil, zero value otherwise.

### GetDayReportUuidOk

`func (o *SchemasCreateJobDonePayload) GetDayReportUuidOk() (*string, bool)`

GetDayReportUuidOk returns a tuple with the DayReportUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayReportUuid

`func (o *SchemasCreateJobDonePayload) SetDayReportUuid(v string)`

SetDayReportUuid sets DayReportUuid field to given value.


### GetDescription

`func (o *SchemasCreateJobDonePayload) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *SchemasCreateJobDonePayload) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *SchemasCreateJobDonePayload) SetDescription(v string)`

SetDescription sets Description field to given value.


### GetLabelUuids

`func (o *SchemasCreateJobDonePayload) GetLabelUuids() []string`

GetLabelUuids returns the LabelUuids field if non-nil, zero value otherwise.

### GetLabelUuidsOk

`func (o *SchemasCreateJobDonePayload) GetLabelUuidsOk() (*[]string, bool)`

GetLabelUuidsOk returns a tuple with the LabelUuids field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLabelUuids

`func (o *SchemasCreateJobDonePayload) SetLabelUuids(v []string)`

SetLabelUuids sets LabelUuids field to given value.


### GetOwnerUuid

`func (o *SchemasCreateJobDonePayload) GetOwnerUuid() string`

GetOwnerUuid returns the OwnerUuid field if non-nil, zero value otherwise.

### GetOwnerUuidOk

`func (o *SchemasCreateJobDonePayload) GetOwnerUuidOk() (*string, bool)`

GetOwnerUuidOk returns a tuple with the OwnerUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerUuid

`func (o *SchemasCreateJobDonePayload) SetOwnerUuid(v string)`

SetOwnerUuid sets OwnerUuid field to given value.


### GetTime

`func (o *SchemasCreateJobDonePayload) GetTime() int32`

GetTime returns the Time field if non-nil, zero value otherwise.

### GetTimeOk

`func (o *SchemasCreateJobDonePayload) GetTimeOk() (*int32, bool)`

GetTimeOk returns a tuple with the Time field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTime

`func (o *SchemasCreateJobDonePayload) SetTime(v int32)`

SetTime sets Time field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


