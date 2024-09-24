# SchemasWayStatistics

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**LabelStatistics** | [**SchemasLabelStatistics**](SchemasLabelStatistics.md) |  | 
**OverallInformation** | [**SchemasOverallInformation**](SchemasOverallInformation.md) |  | 
**TimeSpentByDayChart** | [**[]SchemasTimeSpentByDayPoint**](SchemasTimeSpentByDayPoint.md) |  | 

## Methods

### NewSchemasWayStatistics

`func NewSchemasWayStatistics(labelStatistics SchemasLabelStatistics, overallInformation SchemasOverallInformation, timeSpentByDayChart []SchemasTimeSpentByDayPoint, ) *SchemasWayStatistics`

NewSchemasWayStatistics instantiates a new SchemasWayStatistics object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasWayStatisticsWithDefaults

`func NewSchemasWayStatisticsWithDefaults() *SchemasWayStatistics`

NewSchemasWayStatisticsWithDefaults instantiates a new SchemasWayStatistics object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetLabelStatistics

`func (o *SchemasWayStatistics) GetLabelStatistics() SchemasLabelStatistics`

GetLabelStatistics returns the LabelStatistics field if non-nil, zero value otherwise.

### GetLabelStatisticsOk

`func (o *SchemasWayStatistics) GetLabelStatisticsOk() (*SchemasLabelStatistics, bool)`

GetLabelStatisticsOk returns a tuple with the LabelStatistics field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetLabelStatistics

`func (o *SchemasWayStatistics) SetLabelStatistics(v SchemasLabelStatistics)`

SetLabelStatistics sets LabelStatistics field to given value.


### GetOverallInformation

`func (o *SchemasWayStatistics) GetOverallInformation() SchemasOverallInformation`

GetOverallInformation returns the OverallInformation field if non-nil, zero value otherwise.

### GetOverallInformationOk

`func (o *SchemasWayStatistics) GetOverallInformationOk() (*SchemasOverallInformation, bool)`

GetOverallInformationOk returns a tuple with the OverallInformation field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOverallInformation

`func (o *SchemasWayStatistics) SetOverallInformation(v SchemasOverallInformation)`

SetOverallInformation sets OverallInformation field to given value.


### GetTimeSpentByDayChart

`func (o *SchemasWayStatistics) GetTimeSpentByDayChart() []SchemasTimeSpentByDayPoint`

GetTimeSpentByDayChart returns the TimeSpentByDayChart field if non-nil, zero value otherwise.

### GetTimeSpentByDayChartOk

`func (o *SchemasWayStatistics) GetTimeSpentByDayChartOk() (*[]SchemasTimeSpentByDayPoint, bool)`

GetTimeSpentByDayChartOk returns a tuple with the TimeSpentByDayChart field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetTimeSpentByDayChart

`func (o *SchemasWayStatistics) SetTimeSpentByDayChart(v []SchemasTimeSpentByDayPoint)`

SetTimeSpentByDayChart sets TimeSpentByDayChart field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


