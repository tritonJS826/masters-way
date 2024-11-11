# MwserverInternalSchemasCompositeDayReportPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Comments** | [**[]MwserverInternalSchemasCommentPopulatedResponse**](MwserverInternalSchemasCommentPopulatedResponse.md) |  | 
**CompositionParticipants** | [**[]MwserverInternalSchemasDayReportsCompositionParticipants**](MwserverInternalSchemasDayReportsCompositionParticipants.md) |  | 
**CreatedAt** | **string** | Calculated by - just date | 
**JobsDone** | [**[]MwserverInternalSchemasJobDonePopulatedResponse**](MwserverInternalSchemasJobDonePopulatedResponse.md) |  | 
**Plans** | [**[]MwserverInternalSchemasPlanPopulatedResponse**](MwserverInternalSchemasPlanPopulatedResponse.md) |  | 
**Problems** | [**[]MwserverInternalSchemasProblemPopulatedResponse**](MwserverInternalSchemasProblemPopulatedResponse.md) |  | 
**UpdatedAt** | **string** | Calculated by - just last date | 
**Uuid** | **string** | Always generated | 

## Methods

### NewMwserverInternalSchemasCompositeDayReportPopulatedResponse

`func NewMwserverInternalSchemasCompositeDayReportPopulatedResponse(comments []MwserverInternalSchemasCommentPopulatedResponse, compositionParticipants []MwserverInternalSchemasDayReportsCompositionParticipants, createdAt string, jobsDone []MwserverInternalSchemasJobDonePopulatedResponse, plans []MwserverInternalSchemasPlanPopulatedResponse, problems []MwserverInternalSchemasProblemPopulatedResponse, updatedAt string, uuid string, ) *MwserverInternalSchemasCompositeDayReportPopulatedResponse`

NewMwserverInternalSchemasCompositeDayReportPopulatedResponse instantiates a new MwserverInternalSchemasCompositeDayReportPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwserverInternalSchemasCompositeDayReportPopulatedResponseWithDefaults

`func NewMwserverInternalSchemasCompositeDayReportPopulatedResponseWithDefaults() *MwserverInternalSchemasCompositeDayReportPopulatedResponse`

NewMwserverInternalSchemasCompositeDayReportPopulatedResponseWithDefaults instantiates a new MwserverInternalSchemasCompositeDayReportPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetComments

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) GetComments() []MwserverInternalSchemasCommentPopulatedResponse`

GetComments returns the Comments field if non-nil, zero value otherwise.

### GetCommentsOk

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) GetCommentsOk() (*[]MwserverInternalSchemasCommentPopulatedResponse, bool)`

GetCommentsOk returns a tuple with the Comments field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetComments

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) SetComments(v []MwserverInternalSchemasCommentPopulatedResponse)`

SetComments sets Comments field to given value.


### GetCompositionParticipants

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) GetCompositionParticipants() []MwserverInternalSchemasDayReportsCompositionParticipants`

GetCompositionParticipants returns the CompositionParticipants field if non-nil, zero value otherwise.

### GetCompositionParticipantsOk

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) GetCompositionParticipantsOk() (*[]MwserverInternalSchemasDayReportsCompositionParticipants, bool)`

GetCompositionParticipantsOk returns a tuple with the CompositionParticipants field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCompositionParticipants

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) SetCompositionParticipants(v []MwserverInternalSchemasDayReportsCompositionParticipants)`

SetCompositionParticipants sets CompositionParticipants field to given value.


### GetCreatedAt

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetJobsDone

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) GetJobsDone() []MwserverInternalSchemasJobDonePopulatedResponse`

GetJobsDone returns the JobsDone field if non-nil, zero value otherwise.

### GetJobsDoneOk

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) GetJobsDoneOk() (*[]MwserverInternalSchemasJobDonePopulatedResponse, bool)`

GetJobsDoneOk returns a tuple with the JobsDone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetJobsDone

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) SetJobsDone(v []MwserverInternalSchemasJobDonePopulatedResponse)`

SetJobsDone sets JobsDone field to given value.


### GetPlans

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) GetPlans() []MwserverInternalSchemasPlanPopulatedResponse`

GetPlans returns the Plans field if non-nil, zero value otherwise.

### GetPlansOk

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) GetPlansOk() (*[]MwserverInternalSchemasPlanPopulatedResponse, bool)`

GetPlansOk returns a tuple with the Plans field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetPlans

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) SetPlans(v []MwserverInternalSchemasPlanPopulatedResponse)`

SetPlans sets Plans field to given value.


### GetProblems

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) GetProblems() []MwserverInternalSchemasProblemPopulatedResponse`

GetProblems returns the Problems field if non-nil, zero value otherwise.

### GetProblemsOk

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) GetProblemsOk() (*[]MwserverInternalSchemasProblemPopulatedResponse, bool)`

GetProblemsOk returns a tuple with the Problems field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProblems

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) SetProblems(v []MwserverInternalSchemasProblemPopulatedResponse)`

SetProblems sets Problems field to given value.


### GetUpdatedAt

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) GetUpdatedAt() string`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) GetUpdatedAtOk() (*string, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) SetUpdatedAt(v string)`

SetUpdatedAt sets UpdatedAt field to given value.


### GetUuid

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *MwserverInternalSchemasCompositeDayReportPopulatedResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


