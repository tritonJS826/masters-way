# MwServerInternalSchemasCompositeDayReportPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Comments** | [**[]MwServerInternalSchemasCommentPopulatedResponse**](MwServerInternalSchemasCommentPopulatedResponse.md) |  | 
**CompositionParticipants** | [**[]MwServerInternalSchemasDayReportsCompositionParticipants**](MwServerInternalSchemasDayReportsCompositionParticipants.md) |  | 
**CreatedAt** | **string** | Calculated by - just date | 
**JobsDone** | [**[]MwServerInternalSchemasJobDonePopulatedResponse**](MwServerInternalSchemasJobDonePopulatedResponse.md) |  | 
**Plans** | [**[]MwServerInternalSchemasPlanPopulatedResponse**](MwServerInternalSchemasPlanPopulatedResponse.md) |  | 
**Problems** | [**[]MwServerInternalSchemasProblemPopulatedResponse**](MwServerInternalSchemasProblemPopulatedResponse.md) |  | 
**UpdatedAt** | **string** | Calculated by - just last date | 
**Uuid** | **string** | Always generated | 

## Methods

### NewMwServerInternalSchemasCompositeDayReportPopulatedResponse

`func NewMwServerInternalSchemasCompositeDayReportPopulatedResponse(comments []MwServerInternalSchemasCommentPopulatedResponse, compositionParticipants []MwServerInternalSchemasDayReportsCompositionParticipants, createdAt string, jobsDone []MwServerInternalSchemasJobDonePopulatedResponse, plans []MwServerInternalSchemasPlanPopulatedResponse, problems []MwServerInternalSchemasProblemPopulatedResponse, updatedAt string, uuid string, ) *MwServerInternalSchemasCompositeDayReportPopulatedResponse`

NewMwServerInternalSchemasCompositeDayReportPopulatedResponse instantiates a new MwServerInternalSchemasCompositeDayReportPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwServerInternalSchemasCompositeDayReportPopulatedResponseWithDefaults

`func NewMwServerInternalSchemasCompositeDayReportPopulatedResponseWithDefaults() *MwServerInternalSchemasCompositeDayReportPopulatedResponse`

NewMwServerInternalSchemasCompositeDayReportPopulatedResponseWithDefaults instantiates a new MwServerInternalSchemasCompositeDayReportPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetComments

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) GetComments() []MwServerInternalSchemasCommentPopulatedResponse`

GetComments returns the Comments field if non-nil, zero value otherwise.

### GetCommentsOk

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) GetCommentsOk() (*[]MwServerInternalSchemasCommentPopulatedResponse, bool)`

GetCommentsOk returns a tuple with the Comments field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetComments

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) SetComments(v []MwServerInternalSchemasCommentPopulatedResponse)`

SetComments sets Comments field to given value.


### GetCompositionParticipants

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) GetCompositionParticipants() []MwServerInternalSchemasDayReportsCompositionParticipants`

GetCompositionParticipants returns the CompositionParticipants field if non-nil, zero value otherwise.

### GetCompositionParticipantsOk

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) GetCompositionParticipantsOk() (*[]MwServerInternalSchemasDayReportsCompositionParticipants, bool)`

GetCompositionParticipantsOk returns a tuple with the CompositionParticipants field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCompositionParticipants

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) SetCompositionParticipants(v []MwServerInternalSchemasDayReportsCompositionParticipants)`

SetCompositionParticipants sets CompositionParticipants field to given value.


### GetCreatedAt

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetJobsDone

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) GetJobsDone() []MwServerInternalSchemasJobDonePopulatedResponse`

GetJobsDone returns the JobsDone field if non-nil, zero value otherwise.

### GetJobsDoneOk

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) GetJobsDoneOk() (*[]MwServerInternalSchemasJobDonePopulatedResponse, bool)`

GetJobsDoneOk returns a tuple with the JobsDone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetJobsDone

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) SetJobsDone(v []MwServerInternalSchemasJobDonePopulatedResponse)`

SetJobsDone sets JobsDone field to given value.


### GetPlans

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) GetPlans() []MwServerInternalSchemasPlanPopulatedResponse`

GetPlans returns the Plans field if non-nil, zero value otherwise.

### GetPlansOk

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) GetPlansOk() (*[]MwServerInternalSchemasPlanPopulatedResponse, bool)`

GetPlansOk returns a tuple with the Plans field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPlans

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) SetPlans(v []MwServerInternalSchemasPlanPopulatedResponse)`

SetPlans sets Plans field to given value.


### GetProblems

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) GetProblems() []MwServerInternalSchemasProblemPopulatedResponse`

GetProblems returns the Problems field if non-nil, zero value otherwise.

### GetProblemsOk

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) GetProblemsOk() (*[]MwServerInternalSchemasProblemPopulatedResponse, bool)`

GetProblemsOk returns a tuple with the Problems field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProblems

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) SetProblems(v []MwServerInternalSchemasProblemPopulatedResponse)`

SetProblems sets Problems field to given value.


### GetUpdatedAt

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) GetUpdatedAt() string`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) GetUpdatedAtOk() (*string, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) SetUpdatedAt(v string)`

SetUpdatedAt sets UpdatedAt field to given value.


### GetUuid

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *MwServerInternalSchemasCompositeDayReportPopulatedResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


