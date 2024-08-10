# SchemasPlanPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**CreatedAt** | **string** |  | 
**DayReportUuid** | **string** |  | 
**Description** | **string** |  | 
**IsDone** | **bool** |  | 
**OwnerName** | **string** |  | 
**OwnerUuid** | **string** |  | 
**Tags** | [**[]SchemasJobTagResponse**](SchemasJobTagResponse.md) |  | 
**Time** | **int32** |  | 
**UpdatedAt** | **string** |  | 
**Uuid** | **string** |  | 

## Methods

### NewSchemasPlanPopulatedResponse

`func NewSchemasPlanPopulatedResponse(createdAt string, dayReportUuid string, description string, isDone bool, ownerName string, ownerUuid string, tags []SchemasJobTagResponse, time int32, updatedAt string, uuid string, ) *SchemasPlanPopulatedResponse`

NewSchemasPlanPopulatedResponse instantiates a new SchemasPlanPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasPlanPopulatedResponseWithDefaults

`func NewSchemasPlanPopulatedResponseWithDefaults() *SchemasPlanPopulatedResponse`

NewSchemasPlanPopulatedResponseWithDefaults instantiates a new SchemasPlanPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetCreatedAt

`func (o *SchemasPlanPopulatedResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *SchemasPlanPopulatedResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *SchemasPlanPopulatedResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetDayReportUuid

`func (o *SchemasPlanPopulatedResponse) GetDayReportUuid() string`

GetDayReportUuid returns the DayReportUuid field if non-nil, zero value otherwise.

### GetDayReportUuidOk

`func (o *SchemasPlanPopulatedResponse) GetDayReportUuidOk() (*string, bool)`

GetDayReportUuidOk returns a tuple with the DayReportUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayReportUuid

`func (o *SchemasPlanPopulatedResponse) SetDayReportUuid(v string)`

SetDayReportUuid sets DayReportUuid field to given value.


### GetDescription

`func (o *SchemasPlanPopulatedResponse) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *SchemasPlanPopulatedResponse) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *SchemasPlanPopulatedResponse) SetDescription(v string)`

SetDescription sets Description field to given value.


### GetIsDone

`func (o *SchemasPlanPopulatedResponse) GetIsDone() bool`

GetIsDone returns the IsDone field if non-nil, zero value otherwise.

### GetIsDoneOk

`func (o *SchemasPlanPopulatedResponse) GetIsDoneOk() (*bool, bool)`

GetIsDoneOk returns a tuple with the IsDone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsDone

`func (o *SchemasPlanPopulatedResponse) SetIsDone(v bool)`

SetIsDone sets IsDone field to given value.


### GetOwnerName

`func (o *SchemasPlanPopulatedResponse) GetOwnerName() string`

GetOwnerName returns the OwnerName field if non-nil, zero value otherwise.

### GetOwnerNameOk

`func (o *SchemasPlanPopulatedResponse) GetOwnerNameOk() (*string, bool)`

GetOwnerNameOk returns a tuple with the OwnerName field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerName

`func (o *SchemasPlanPopulatedResponse) SetOwnerName(v string)`

SetOwnerName sets OwnerName field to given value.


### GetOwnerUuid

`func (o *SchemasPlanPopulatedResponse) GetOwnerUuid() string`

GetOwnerUuid returns the OwnerUuid field if non-nil, zero value otherwise.

### GetOwnerUuidOk

`func (o *SchemasPlanPopulatedResponse) GetOwnerUuidOk() (*string, bool)`

GetOwnerUuidOk returns a tuple with the OwnerUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwnerUuid

`func (o *SchemasPlanPopulatedResponse) SetOwnerUuid(v string)`

SetOwnerUuid sets OwnerUuid field to given value.


### GetTags

`func (o *SchemasPlanPopulatedResponse) GetTags() []SchemasJobTagResponse`

GetTags returns the Tags field if non-nil, zero value otherwise.

### GetTagsOk

`func (o *SchemasPlanPopulatedResponse) GetTagsOk() (*[]SchemasJobTagResponse, bool)`

GetTagsOk returns a tuple with the Tags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTags

`func (o *SchemasPlanPopulatedResponse) SetTags(v []SchemasJobTagResponse)`

SetTags sets Tags field to given value.


### GetTime

`func (o *SchemasPlanPopulatedResponse) GetTime() int32`

GetTime returns the Time field if non-nil, zero value otherwise.

### GetTimeOk

`func (o *SchemasPlanPopulatedResponse) GetTimeOk() (*int32, bool)`

GetTimeOk returns a tuple with the Time field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTime

`func (o *SchemasPlanPopulatedResponse) SetTime(v int32)`

SetTime sets Time field to given value.


### GetUpdatedAt

`func (o *SchemasPlanPopulatedResponse) GetUpdatedAt() string`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *SchemasPlanPopulatedResponse) GetUpdatedAtOk() (*string, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *SchemasPlanPopulatedResponse) SetUpdatedAt(v string)`

SetUpdatedAt sets UpdatedAt field to given value.


### GetUuid

`func (o *SchemasPlanPopulatedResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *SchemasPlanPopulatedResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *SchemasPlanPopulatedResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


