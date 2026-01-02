# MwServerInternalSchemasCreateJobDonePayload

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**CompanionLanguage** | Pointer to **string** |  | [optional] 
**DayReportUuid** | **string** |  | 
**Description** | **string** |  | 
**JobTagUuids** | **[]string** |  | 
**OwnerUuid** | **string** |  | 
**Time** | **int32** |  | 

## Methods

### NewMwServerInternalSchemasCreateJobDonePayload

`func NewMwServerInternalSchemasCreateJobDonePayload(dayReportUuid string, description string, jobTagUuids []string, ownerUuid string, time int32, ) *MwServerInternalSchemasCreateJobDonePayload`

NewMwServerInternalSchemasCreateJobDonePayload instantiates a new MwServerInternalSchemasCreateJobDonePayload object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwServerInternalSchemasCreateJobDonePayloadWithDefaults

`func NewMwServerInternalSchemasCreateJobDonePayloadWithDefaults() *MwServerInternalSchemasCreateJobDonePayload`

NewMwServerInternalSchemasCreateJobDonePayloadWithDefaults instantiates a new MwServerInternalSchemasCreateJobDonePayload object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCompanionLanguage

`func (o *MwServerInternalSchemasCreateJobDonePayload) GetCompanionLanguage() string`

GetCompanionLanguage returns the CompanionLanguage field if non-nil, zero value otherwise.

### GetCompanionLanguageOk

`func (o *MwServerInternalSchemasCreateJobDonePayload) GetCompanionLanguageOk() (*string, bool)`

GetCompanionLanguageOk returns a tuple with the CompanionLanguage field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCompanionLanguage

`func (o *MwServerInternalSchemasCreateJobDonePayload) SetCompanionLanguage(v string)`

SetCompanionLanguage sets CompanionLanguage field to given value.

### HasCompanionLanguage

`func (o *MwServerInternalSchemasCreateJobDonePayload) HasCompanionLanguage() bool`

HasCompanionLanguage returns a boolean if a field has been set.

### GetDayReportUuid

`func (o *MwServerInternalSchemasCreateJobDonePayload) GetDayReportUuid() string`

GetDayReportUuid returns the DayReportUuid field if non-nil, zero value otherwise.

### GetDayReportUuidOk

`func (o *MwServerInternalSchemasCreateJobDonePayload) GetDayReportUuidOk() (*string, bool)`

GetDayReportUuidOk returns a tuple with the DayReportUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayReportUuid

`func (o *MwServerInternalSchemasCreateJobDonePayload) SetDayReportUuid(v string)`

SetDayReportUuid sets DayReportUuid field to given value.


### GetDescription

`func (o *MwServerInternalSchemasCreateJobDonePayload) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *MwServerInternalSchemasCreateJobDonePayload) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *MwServerInternalSchemasCreateJobDonePayload) SetDescription(v string)`

SetDescription sets Description field to given value.


### GetJobTagUuids

`func (o *MwServerInternalSchemasCreateJobDonePayload) GetJobTagUuids() []string`

GetJobTagUuids returns the JobTagUuids field if non-nil, zero value otherwise.

### GetJobTagUuidsOk

`func (o *MwServerInternalSchemasCreateJobDonePayload) GetJobTagUuidsOk() (*[]string, bool)`

GetJobTagUuidsOk returns a tuple with the JobTagUuids field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetJobTagUuids

`func (o *MwServerInternalSchemasCreateJobDonePayload) SetJobTagUuids(v []string)`

SetJobTagUuids sets JobTagUuids field to given value.


### GetOwnerUuid

`func (o *MwServerInternalSchemasCreateJobDonePayload) GetOwnerUuid() string`

GetOwnerUuid returns the OwnerUuid field if non-nil, zero value otherwise.

### GetOwnerUuidOk

`func (o *MwServerInternalSchemasCreateJobDonePayload) GetOwnerUuidOk() (*string, bool)`

GetOwnerUuidOk returns a tuple with the OwnerUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerUuid

`func (o *MwServerInternalSchemasCreateJobDonePayload) SetOwnerUuid(v string)`

SetOwnerUuid sets OwnerUuid field to given value.


### GetTime

`func (o *MwServerInternalSchemasCreateJobDonePayload) GetTime() int32`

GetTime returns the Time field if non-nil, zero value otherwise.

### GetTimeOk

`func (o *MwServerInternalSchemasCreateJobDonePayload) GetTimeOk() (*int32, bool)`

GetTimeOk returns a tuple with the Time field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTime

`func (o *MwServerInternalSchemasCreateJobDonePayload) SetTime(v int32)`

SetTime sets Time field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


