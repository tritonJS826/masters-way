# SchemasCompositeDayReportPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Comments** | [**[]SchemasCommentPopulatedResponse**](SchemasCommentPopulatedResponse.md) |  | 
**CompositionParticipants** | [**[]SchemasDayReportsCompositionParticipants**](SchemasDayReportsCompositionParticipants.md) |  | 
**CreatedAt** | **string** | Calculated by - just date | 
**JobsDone** | [**[]SchemasJobDonePopulatedResponse**](SchemasJobDonePopulatedResponse.md) |  | 
**Plans** | [**[]SchemasPlanPopulatedResponse**](SchemasPlanPopulatedResponse.md) |  | 
**Problems** | [**[]SchemasProblemPopulatedResponse**](SchemasProblemPopulatedResponse.md) |  | 
**UpdatedAt** | **string** | Calculated by - just last date | 
**Uuid** | **string** | Always generated | 

## Methods

### NewSchemasCompositeDayReportPopulatedResponse

`func NewSchemasCompositeDayReportPopulatedResponse(comments []SchemasCommentPopulatedResponse, compositionParticipants []SchemasDayReportsCompositionParticipants, createdAt string, jobsDone []SchemasJobDonePopulatedResponse, plans []SchemasPlanPopulatedResponse, problems []SchemasProblemPopulatedResponse, updatedAt string, uuid string, ) *SchemasCompositeDayReportPopulatedResponse`

NewSchemasCompositeDayReportPopulatedResponse instantiates a new SchemasCompositeDayReportPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasCompositeDayReportPopulatedResponseWithDefaults

`func NewSchemasCompositeDayReportPopulatedResponseWithDefaults() *SchemasCompositeDayReportPopulatedResponse`

NewSchemasCompositeDayReportPopulatedResponseWithDefaults instantiates a new SchemasCompositeDayReportPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetComments

`func (o *SchemasCompositeDayReportPopulatedResponse) GetComments() []SchemasCommentPopulatedResponse`

GetComments returns the Comments field if non-nil, zero value otherwise.

### GetCommentsOk

`func (o *SchemasCompositeDayReportPopulatedResponse) GetCommentsOk() (*[]SchemasCommentPopulatedResponse, bool)`

GetCommentsOk returns a tuple with the Comments field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetComments

`func (o *SchemasCompositeDayReportPopulatedResponse) SetComments(v []SchemasCommentPopulatedResponse)`

SetComments sets Comments field to given value.


### GetCompositionParticipants

`func (o *SchemasCompositeDayReportPopulatedResponse) GetCompositionParticipants() []SchemasDayReportsCompositionParticipants`

GetCompositionParticipants returns the CompositionParticipants field if non-nil, zero value otherwise.

### GetCompositionParticipantsOk

`func (o *SchemasCompositeDayReportPopulatedResponse) GetCompositionParticipantsOk() (*[]SchemasDayReportsCompositionParticipants, bool)`

GetCompositionParticipantsOk returns a tuple with the CompositionParticipants field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCompositionParticipants

`func (o *SchemasCompositeDayReportPopulatedResponse) SetCompositionParticipants(v []SchemasDayReportsCompositionParticipants)`

SetCompositionParticipants sets CompositionParticipants field to given value.


### GetCreatedAt

`func (o *SchemasCompositeDayReportPopulatedResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *SchemasCompositeDayReportPopulatedResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *SchemasCompositeDayReportPopulatedResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetJobsDone

`func (o *SchemasCompositeDayReportPopulatedResponse) GetJobsDone() []SchemasJobDonePopulatedResponse`

GetJobsDone returns the JobsDone field if non-nil, zero value otherwise.

### GetJobsDoneOk

`func (o *SchemasCompositeDayReportPopulatedResponse) GetJobsDoneOk() (*[]SchemasJobDonePopulatedResponse, bool)`

GetJobsDoneOk returns a tuple with the JobsDone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetJobsDone

`func (o *SchemasCompositeDayReportPopulatedResponse) SetJobsDone(v []SchemasJobDonePopulatedResponse)`

SetJobsDone sets JobsDone field to given value.


### GetPlans

`func (o *SchemasCompositeDayReportPopulatedResponse) GetPlans() []SchemasPlanPopulatedResponse`

GetPlans returns the Plans field if non-nil, zero value otherwise.

### GetPlansOk

`func (o *SchemasCompositeDayReportPopulatedResponse) GetPlansOk() (*[]SchemasPlanPopulatedResponse, bool)`

GetPlansOk returns a tuple with the Plans field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPlans

`func (o *SchemasCompositeDayReportPopulatedResponse) SetPlans(v []SchemasPlanPopulatedResponse)`

SetPlans sets Plans field to given value.


### GetProblems

`func (o *SchemasCompositeDayReportPopulatedResponse) GetProblems() []SchemasProblemPopulatedResponse`

GetProblems returns the Problems field if non-nil, zero value otherwise.

### GetProblemsOk

`func (o *SchemasCompositeDayReportPopulatedResponse) GetProblemsOk() (*[]SchemasProblemPopulatedResponse, bool)`

GetProblemsOk returns a tuple with the Problems field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProblems

`func (o *SchemasCompositeDayReportPopulatedResponse) SetProblems(v []SchemasProblemPopulatedResponse)`

SetProblems sets Problems field to given value.


### GetUpdatedAt

`func (o *SchemasCompositeDayReportPopulatedResponse) GetUpdatedAt() string`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *SchemasCompositeDayReportPopulatedResponse) GetUpdatedAtOk() (*string, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *SchemasCompositeDayReportPopulatedResponse) SetUpdatedAt(v string)`

SetUpdatedAt sets UpdatedAt field to given value.


### GetUuid

`func (o *SchemasCompositeDayReportPopulatedResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *SchemasCompositeDayReportPopulatedResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *SchemasCompositeDayReportPopulatedResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


