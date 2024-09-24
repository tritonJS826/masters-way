# SchemasListDayReportsResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**DayReports** | [**[]SchemasCompositeDayReportPopulatedResponse**](SchemasCompositeDayReportPopulatedResponse.md) |  | 
**Size** | **int32** |  | 

## Methods

### NewSchemasListDayReportsResponse

`func NewSchemasListDayReportsResponse(dayReports []SchemasCompositeDayReportPopulatedResponse, size int32, ) *SchemasListDayReportsResponse`

NewSchemasListDayReportsResponse instantiates a new SchemasListDayReportsResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasListDayReportsResponseWithDefaults

`func NewSchemasListDayReportsResponseWithDefaults() *SchemasListDayReportsResponse`

NewSchemasListDayReportsResponseWithDefaults instantiates a new SchemasListDayReportsResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetDayReports

`func (o *SchemasListDayReportsResponse) GetDayReports() []SchemasCompositeDayReportPopulatedResponse`

GetDayReports returns the DayReports field if non-nil, zero value otherwise.

### GetDayReportsOk

`func (o *SchemasListDayReportsResponse) GetDayReportsOk() (*[]SchemasCompositeDayReportPopulatedResponse, bool)`

GetDayReportsOk returns a tuple with the DayReports field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayReports

`func (o *SchemasListDayReportsResponse) SetDayReports(v []SchemasCompositeDayReportPopulatedResponse)`

SetDayReports sets DayReports field to given value.


### GetSize

`func (o *SchemasListDayReportsResponse) GetSize() int32`

GetSize returns the Size field if non-nil, zero value otherwise.

### GetSizeOk

`func (o *SchemasListDayReportsResponse) GetSizeOk() (*int32, bool)`

GetSizeOk returns a tuple with the Size field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetSize

`func (o *SchemasListDayReportsResponse) SetSize(v int32)`

SetSize sets Size field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


