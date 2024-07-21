# SchemasMetricResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Description** | **string** |  | 
**DoneDate** | **NullableString** |  | 
**EstimationTime** | **int32** |  | 
**IsDone** | **bool** |  | 
**Uuid** | **string** |  | 

## Methods

### NewSchemasMetricResponse

`func NewSchemasMetricResponse(description string, doneDate NullableString, estimationTime int32, isDone bool, uuid string, ) *SchemasMetricResponse`

NewSchemasMetricResponse instantiates a new SchemasMetricResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasMetricResponseWithDefaults

`func NewSchemasMetricResponseWithDefaults() *SchemasMetricResponse`

NewSchemasMetricResponseWithDefaults instantiates a new SchemasMetricResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetDescription

`func (o *SchemasMetricResponse) GetDescription() string`

GetDescription returns the Description field if non-nil, zero value otherwise.

### GetDescriptionOk

`func (o *SchemasMetricResponse) GetDescriptionOk() (*string, bool)`

GetDescriptionOk returns a tuple with the Description field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDescription

`func (o *SchemasMetricResponse) SetDescription(v string)`

SetDescription sets Description field to given value.


### GetDoneDate

`func (o *SchemasMetricResponse) GetDoneDate() string`

GetDoneDate returns the DoneDate field if non-nil, zero value otherwise.

### GetDoneDateOk

`func (o *SchemasMetricResponse) GetDoneDateOk() (*string, bool)`

GetDoneDateOk returns a tuple with the DoneDate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDoneDate

`func (o *SchemasMetricResponse) SetDoneDate(v string)`

SetDoneDate sets DoneDate field to given value.


### SetDoneDateNil

`func (o *SchemasMetricResponse) SetDoneDateNil(b bool)`

 SetDoneDateNil sets the value for DoneDate to be an explicit nil

### UnsetDoneDate
`func (o *SchemasMetricResponse) UnsetDoneDate()`

UnsetDoneDate ensures that no value is present for DoneDate, not even an explicit nil
### GetEstimationTime

`func (o *SchemasMetricResponse) GetEstimationTime() int32`

GetEstimationTime returns the EstimationTime field if non-nil, zero value otherwise.

### GetEstimationTimeOk

`func (o *SchemasMetricResponse) GetEstimationTimeOk() (*int32, bool)`

GetEstimationTimeOk returns a tuple with the EstimationTime field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEstimationTime

`func (o *SchemasMetricResponse) SetEstimationTime(v int32)`

SetEstimationTime sets EstimationTime field to given value.


### GetIsDone

`func (o *SchemasMetricResponse) GetIsDone() bool`

GetIsDone returns the IsDone field if non-nil, zero value otherwise.

### GetIsDoneOk

`func (o *SchemasMetricResponse) GetIsDoneOk() (*bool, bool)`

GetIsDoneOk returns a tuple with the IsDone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsDone

`func (o *SchemasMetricResponse) SetIsDone(v bool)`

SetIsDone sets IsDone field to given value.


### GetUuid

`func (o *SchemasMetricResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *SchemasMetricResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *SchemasMetricResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


