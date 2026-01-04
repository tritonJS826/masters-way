# MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Comments** | [**[]MwGeneralBffInternalSchemasCommentPopulatedResponse**](MwGeneralBffInternalSchemasCommentPopulatedResponse.md) |  | 
**CompositionParticipants** | [**[]MwGeneralBffInternalSchemasDayReportsCompositionParticipants**](MwGeneralBffInternalSchemasDayReportsCompositionParticipants.md) |  | 
**CreatedAt** | **string** | Calculated by - just date | 
**JobsDone** | [**[]MwGeneralBffInternalSchemasJobDonePopulatedResponse**](MwGeneralBffInternalSchemasJobDonePopulatedResponse.md) |  | 
**Plans** | [**[]MwGeneralBffInternalSchemasPlanPopulatedResponse**](MwGeneralBffInternalSchemasPlanPopulatedResponse.md) |  | 
**Problems** | [**[]MwGeneralBffInternalSchemasProblemPopulatedResponse**](MwGeneralBffInternalSchemasProblemPopulatedResponse.md) |  | 
**UpdatedAt** | **string** | Calculated by - just last date | 
**Uuid** | **string** | Always generated | 

## Methods

### NewMwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse

`func NewMwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse(comments []MwGeneralBffInternalSchemasCommentPopulatedResponse, compositionParticipants []MwGeneralBffInternalSchemasDayReportsCompositionParticipants, createdAt string, jobsDone []MwGeneralBffInternalSchemasJobDonePopulatedResponse, plans []MwGeneralBffInternalSchemasPlanPopulatedResponse, problems []MwGeneralBffInternalSchemasProblemPopulatedResponse, updatedAt string, uuid string, ) *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse`

NewMwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse instantiates a new MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwGeneralBffInternalSchemasCompositeDayReportPopulatedResponseWithDefaults

`func NewMwGeneralBffInternalSchemasCompositeDayReportPopulatedResponseWithDefaults() *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse`

NewMwGeneralBffInternalSchemasCompositeDayReportPopulatedResponseWithDefaults instantiates a new MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetComments

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) GetComments() []MwGeneralBffInternalSchemasCommentPopulatedResponse`

GetComments returns the Comments field if non-nil, zero value otherwise.

### GetCommentsOk

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) GetCommentsOk() (*[]MwGeneralBffInternalSchemasCommentPopulatedResponse, bool)`

GetCommentsOk returns a tuple with the Comments field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetComments

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) SetComments(v []MwGeneralBffInternalSchemasCommentPopulatedResponse)`

SetComments sets Comments field to given value.


### GetCompositionParticipants

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) GetCompositionParticipants() []MwGeneralBffInternalSchemasDayReportsCompositionParticipants`

GetCompositionParticipants returns the CompositionParticipants field if non-nil, zero value otherwise.

### GetCompositionParticipantsOk

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) GetCompositionParticipantsOk() (*[]MwGeneralBffInternalSchemasDayReportsCompositionParticipants, bool)`

GetCompositionParticipantsOk returns a tuple with the CompositionParticipants field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCompositionParticipants

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) SetCompositionParticipants(v []MwGeneralBffInternalSchemasDayReportsCompositionParticipants)`

SetCompositionParticipants sets CompositionParticipants field to given value.


### GetCreatedAt

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetJobsDone

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) GetJobsDone() []MwGeneralBffInternalSchemasJobDonePopulatedResponse`

GetJobsDone returns the JobsDone field if non-nil, zero value otherwise.

### GetJobsDoneOk

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) GetJobsDoneOk() (*[]MwGeneralBffInternalSchemasJobDonePopulatedResponse, bool)`

GetJobsDoneOk returns a tuple with the JobsDone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetJobsDone

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) SetJobsDone(v []MwGeneralBffInternalSchemasJobDonePopulatedResponse)`

SetJobsDone sets JobsDone field to given value.


### GetPlans

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) GetPlans() []MwGeneralBffInternalSchemasPlanPopulatedResponse`

GetPlans returns the Plans field if non-nil, zero value otherwise.

### GetPlansOk

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) GetPlansOk() (*[]MwGeneralBffInternalSchemasPlanPopulatedResponse, bool)`

GetPlansOk returns a tuple with the Plans field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPlans

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) SetPlans(v []MwGeneralBffInternalSchemasPlanPopulatedResponse)`

SetPlans sets Plans field to given value.


### GetProblems

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) GetProblems() []MwGeneralBffInternalSchemasProblemPopulatedResponse`

GetProblems returns the Problems field if non-nil, zero value otherwise.

### GetProblemsOk

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) GetProblemsOk() (*[]MwGeneralBffInternalSchemasProblemPopulatedResponse, bool)`

GetProblemsOk returns a tuple with the Problems field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProblems

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) SetProblems(v []MwGeneralBffInternalSchemasProblemPopulatedResponse)`

SetProblems sets Problems field to given value.


### GetUpdatedAt

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) GetUpdatedAt() string`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) GetUpdatedAtOk() (*string, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) SetUpdatedAt(v string)`

SetUpdatedAt sets UpdatedAt field to given value.


### GetUuid

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *MwGeneralBffInternalSchemasCompositeDayReportPopulatedResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


