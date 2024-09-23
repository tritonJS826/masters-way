# SchemasWayPopulatedResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Children** | [**[]SchemasWayPopulatedResponse**](SchemasWayPopulatedResponse.md) |  | 
**CopiedFromWayId** | **NullableString** |  | 
**CreatedAt** | **string** |  | 
**EstimationTime** | **int32** |  | 
**FavoriteForUsersAmount** | **int32** |  | 
**FormerMentors** | [**[]SchemasUserPlainResponse**](SchemasUserPlainResponse.md) |  | 
**GoalDescription** | **string** |  | 
**Id** | **string** |  | 
**IsCompleted** | **bool** |  | 
**IsPrivate** | **bool** |  | 
**JobTags** | [**[]SchemasJobTagResponse**](SchemasJobTagResponse.md) |  | 
**MentorRequests** | [**[]SchemasUserPlainResponse**](SchemasUserPlainResponse.md) |  | 
**Mentors** | [**[]SchemasUserPlainResponse**](SchemasUserPlainResponse.md) |  | 
**Metrics** | [**[]SchemasMetricResponse**](SchemasMetricResponse.md) |  | 
**Name** | **string** |  | 
**Owner** | [**SchemasUserPlainResponse**](SchemasUserPlainResponse.md) |  | 
**UpdatedAt** | **string** |  | 
**WayTags** | [**[]SchemasWayTagResponse**](SchemasWayTagResponse.md) |  | 

## Methods

### NewSchemasWayPopulatedResponse

`func NewSchemasWayPopulatedResponse(children []SchemasWayPopulatedResponse, copiedFromWayId NullableString, createdAt string, estimationTime int32, favoriteForUsersAmount int32, formerMentors []SchemasUserPlainResponse, goalDescription string, id string, isCompleted bool, isPrivate bool, jobTags []SchemasJobTagResponse, mentorRequests []SchemasUserPlainResponse, mentors []SchemasUserPlainResponse, metrics []SchemasMetricResponse, name string, owner SchemasUserPlainResponse, updatedAt string, wayTags []SchemasWayTagResponse, ) *SchemasWayPopulatedResponse`

NewSchemasWayPopulatedResponse instantiates a new SchemasWayPopulatedResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasWayPopulatedResponseWithDefaults

`func NewSchemasWayPopulatedResponseWithDefaults() *SchemasWayPopulatedResponse`

NewSchemasWayPopulatedResponseWithDefaults instantiates a new SchemasWayPopulatedResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetChildren

`func (o *SchemasWayPopulatedResponse) GetChildren() []SchemasWayPopulatedResponse`

GetChildren returns the Children field if non-nil, zero value otherwise.

### GetChildrenOk

`func (o *SchemasWayPopulatedResponse) GetChildrenOk() (*[]SchemasWayPopulatedResponse, bool)`

GetChildrenOk returns a tuple with the Children field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetChildren

`func (o *SchemasWayPopulatedResponse) SetChildren(v []SchemasWayPopulatedResponse)`

SetChildren sets Children field to given value.


### GetCopiedFromWayId

`func (o *SchemasWayPopulatedResponse) GetCopiedFromWayId() string`

GetCopiedFromWayId returns the CopiedFromWayId field if non-nil, zero value otherwise.

### GetCopiedFromWayIdOk

`func (o *SchemasWayPopulatedResponse) GetCopiedFromWayIdOk() (*string, bool)`

GetCopiedFromWayIdOk returns a tuple with the CopiedFromWayId field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCopiedFromWayId

`func (o *SchemasWayPopulatedResponse) SetCopiedFromWayId(v string)`

SetCopiedFromWayId sets CopiedFromWayId field to given value.


### SetCopiedFromWayIdNil

`func (o *SchemasWayPopulatedResponse) SetCopiedFromWayIdNil(b bool)`

 SetCopiedFromWayIdNil sets the value for CopiedFromWayId to be an explicit nil

### UnsetCopiedFromWayId
`func (o *SchemasWayPopulatedResponse) UnsetCopiedFromWayId()`

UnsetCopiedFromWayId ensures that no value is present for CopiedFromWayId, not even an explicit nil
### GetCreatedAt

`func (o *SchemasWayPopulatedResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *SchemasWayPopulatedResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *SchemasWayPopulatedResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetEstimationTime

`func (o *SchemasWayPopulatedResponse) GetEstimationTime() int32`

GetEstimationTime returns the EstimationTime field if non-nil, zero value otherwise.

### GetEstimationTimeOk

`func (o *SchemasWayPopulatedResponse) GetEstimationTimeOk() (*int32, bool)`

GetEstimationTimeOk returns a tuple with the EstimationTime field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEstimationTime

`func (o *SchemasWayPopulatedResponse) SetEstimationTime(v int32)`

SetEstimationTime sets EstimationTime field to given value.


### GetFavoriteForUsersAmount

`func (o *SchemasWayPopulatedResponse) GetFavoriteForUsersAmount() int32`

GetFavoriteForUsersAmount returns the FavoriteForUsersAmount field if non-nil, zero value otherwise.

### GetFavoriteForUsersAmountOk

`func (o *SchemasWayPopulatedResponse) GetFavoriteForUsersAmountOk() (*int32, bool)`

GetFavoriteForUsersAmountOk returns a tuple with the FavoriteForUsersAmount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteForUsersAmount

`func (o *SchemasWayPopulatedResponse) SetFavoriteForUsersAmount(v int32)`

SetFavoriteForUsersAmount sets FavoriteForUsersAmount field to given value.


### GetFormerMentors

`func (o *SchemasWayPopulatedResponse) GetFormerMentors() []SchemasUserPlainResponse`

GetFormerMentors returns the FormerMentors field if non-nil, zero value otherwise.

### GetFormerMentorsOk

`func (o *SchemasWayPopulatedResponse) GetFormerMentorsOk() (*[]SchemasUserPlainResponse, bool)`

GetFormerMentorsOk returns a tuple with the FormerMentors field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFormerMentors

`func (o *SchemasWayPopulatedResponse) SetFormerMentors(v []SchemasUserPlainResponse)`

SetFormerMentors sets FormerMentors field to given value.


### GetGoalDescription

`func (o *SchemasWayPopulatedResponse) GetGoalDescription() string`

GetGoalDescription returns the GoalDescription field if non-nil, zero value otherwise.

### GetGoalDescriptionOk

`func (o *SchemasWayPopulatedResponse) GetGoalDescriptionOk() (*string, bool)`

GetGoalDescriptionOk returns a tuple with the GoalDescription field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetGoalDescription

`func (o *SchemasWayPopulatedResponse) SetGoalDescription(v string)`

SetGoalDescription sets GoalDescription field to given value.


### GetId

`func (o *SchemasWayPopulatedResponse) GetId() string`

GetId returns the Id field if non-nil, zero value otherwise.

### GetIdOk

`func (o *SchemasWayPopulatedResponse) GetIdOk() (*string, bool)`

GetIdOk returns a tuple with the Id field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetId

`func (o *SchemasWayPopulatedResponse) SetId(v string)`

SetId sets Id field to given value.


### GetIsCompleted

`func (o *SchemasWayPopulatedResponse) GetIsCompleted() bool`

GetIsCompleted returns the IsCompleted field if non-nil, zero value otherwise.

### GetIsCompletedOk

`func (o *SchemasWayPopulatedResponse) GetIsCompletedOk() (*bool, bool)`

GetIsCompletedOk returns a tuple with the IsCompleted field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsCompleted

`func (o *SchemasWayPopulatedResponse) SetIsCompleted(v bool)`

SetIsCompleted sets IsCompleted field to given value.


### GetIsPrivate

`func (o *SchemasWayPopulatedResponse) GetIsPrivate() bool`

GetIsPrivate returns the IsPrivate field if non-nil, zero value otherwise.

### GetIsPrivateOk

`func (o *SchemasWayPopulatedResponse) GetIsPrivateOk() (*bool, bool)`

GetIsPrivateOk returns a tuple with the IsPrivate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsPrivate

`func (o *SchemasWayPopulatedResponse) SetIsPrivate(v bool)`

SetIsPrivate sets IsPrivate field to given value.


### GetJobTags

`func (o *SchemasWayPopulatedResponse) GetJobTags() []SchemasJobTagResponse`

GetJobTags returns the JobTags field if non-nil, zero value otherwise.

### GetJobTagsOk

`func (o *SchemasWayPopulatedResponse) GetJobTagsOk() (*[]SchemasJobTagResponse, bool)`

GetJobTagsOk returns a tuple with the JobTags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetJobTags

`func (o *SchemasWayPopulatedResponse) SetJobTags(v []SchemasJobTagResponse)`

SetJobTags sets JobTags field to given value.


### GetMentorRequests

`func (o *SchemasWayPopulatedResponse) GetMentorRequests() []SchemasUserPlainResponse`

GetMentorRequests returns the MentorRequests field if non-nil, zero value otherwise.

### GetMentorRequestsOk

`func (o *SchemasWayPopulatedResponse) GetMentorRequestsOk() (*[]SchemasUserPlainResponse, bool)`

GetMentorRequestsOk returns a tuple with the MentorRequests field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMentorRequests

`func (o *SchemasWayPopulatedResponse) SetMentorRequests(v []SchemasUserPlainResponse)`

SetMentorRequests sets MentorRequests field to given value.


### GetMentors

`func (o *SchemasWayPopulatedResponse) GetMentors() []SchemasUserPlainResponse`

GetMentors returns the Mentors field if non-nil, zero value otherwise.

### GetMentorsOk

`func (o *SchemasWayPopulatedResponse) GetMentorsOk() (*[]SchemasUserPlainResponse, bool)`

GetMentorsOk returns a tuple with the Mentors field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMentors

`func (o *SchemasWayPopulatedResponse) SetMentors(v []SchemasUserPlainResponse)`

SetMentors sets Mentors field to given value.


### GetMetrics

`func (o *SchemasWayPopulatedResponse) GetMetrics() []SchemasMetricResponse`

GetMetrics returns the Metrics field if non-nil, zero value otherwise.

### GetMetricsOk

`func (o *SchemasWayPopulatedResponse) GetMetricsOk() (*[]SchemasMetricResponse, bool)`

GetMetricsOk returns a tuple with the Metrics field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMetrics

`func (o *SchemasWayPopulatedResponse) SetMetrics(v []SchemasMetricResponse)`

SetMetrics sets Metrics field to given value.


### GetName

`func (o *SchemasWayPopulatedResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *SchemasWayPopulatedResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *SchemasWayPopulatedResponse) SetName(v string)`

SetName sets Name field to given value.


### GetOwner

`func (o *SchemasWayPopulatedResponse) GetOwner() SchemasUserPlainResponse`

GetOwner returns the Owner field if non-nil, zero value otherwise.

### GetOwnerOk

`func (o *SchemasWayPopulatedResponse) GetOwnerOk() (*SchemasUserPlainResponse, bool)`

GetOwnerOk returns a tuple with the Owner field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwner

`func (o *SchemasWayPopulatedResponse) SetOwner(v SchemasUserPlainResponse)`

SetOwner sets Owner field to given value.


### GetUpdatedAt

`func (o *SchemasWayPopulatedResponse) GetUpdatedAt() string`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *SchemasWayPopulatedResponse) GetUpdatedAtOk() (*string, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *SchemasWayPopulatedResponse) SetUpdatedAt(v string)`

SetUpdatedAt sets UpdatedAt field to given value.


### GetWayTags

`func (o *SchemasWayPopulatedResponse) GetWayTags() []SchemasWayTagResponse`

GetWayTags returns the WayTags field if non-nil, zero value otherwise.

### GetWayTagsOk

`func (o *SchemasWayPopulatedResponse) GetWayTagsOk() (*[]SchemasWayTagResponse, bool)`

GetWayTagsOk returns a tuple with the WayTags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWayTags

`func (o *SchemasWayPopulatedResponse) SetWayTags(v []SchemasWayTagResponse)`

SetWayTags sets WayTags field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


