# SchemasWayPlainResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**ChildrenUuids** | **[]string** |  | 
**CopiedFromWayUuid** | **NullableString** |  | 
**CreatedAt** | **string** |  | 
**DayReportsAmount** | **int32** |  | 
**EstimationTime** | **int32** |  | 
**FavoriteForUsers** | **int32** |  | 
**GoalDescription** | **string** |  | 
**IsCompleted** | **bool** |  | 
**IsPrivate** | **bool** |  | 
**Mentors** | [**[]SchemasUserPlainResponse**](SchemasUserPlainResponse.md) |  | 
**MetricsDone** | **int32** |  | 
**MetricsTotal** | **int32** |  | 
**Name** | **string** |  | 
**Owner** | [**SchemasUserPlainResponse**](SchemasUserPlainResponse.md) |  | 
**ProjectUuid** | **NullableString** |  | 
**UpdatedAt** | **string** |  | 
**Uuid** | **string** |  | 
**WayTags** | [**[]SchemasWayTagResponse**](SchemasWayTagResponse.md) |  | 

## Methods

### NewSchemasWayPlainResponse

`func NewSchemasWayPlainResponse(childrenUuids []string, copiedFromWayUuid NullableString, createdAt string, dayReportsAmount int32, estimationTime int32, favoriteForUsers int32, goalDescription string, isCompleted bool, isPrivate bool, mentors []SchemasUserPlainResponse, metricsDone int32, metricsTotal int32, name string, owner SchemasUserPlainResponse, projectUuid NullableString, updatedAt string, uuid string, wayTags []SchemasWayTagResponse, ) *SchemasWayPlainResponse`

NewSchemasWayPlainResponse instantiates a new SchemasWayPlainResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasWayPlainResponseWithDefaults

`func NewSchemasWayPlainResponseWithDefaults() *SchemasWayPlainResponse`

NewSchemasWayPlainResponseWithDefaults instantiates a new SchemasWayPlainResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetChildrenUuids

`func (o *SchemasWayPlainResponse) GetChildrenUuids() []string`

GetChildrenUuids returns the ChildrenUuids field if non-nil, zero value otherwise.

### GetChildrenUuidsOk

`func (o *SchemasWayPlainResponse) GetChildrenUuidsOk() (*[]string, bool)`

GetChildrenUuidsOk returns a tuple with the ChildrenUuids field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetChildrenUuids

`func (o *SchemasWayPlainResponse) SetChildrenUuids(v []string)`

SetChildrenUuids sets ChildrenUuids field to given value.


### GetCopiedFromWayUuid

`func (o *SchemasWayPlainResponse) GetCopiedFromWayUuid() string`

GetCopiedFromWayUuid returns the CopiedFromWayUuid field if non-nil, zero value otherwise.

### GetCopiedFromWayUuidOk

`func (o *SchemasWayPlainResponse) GetCopiedFromWayUuidOk() (*string, bool)`

GetCopiedFromWayUuidOk returns a tuple with the CopiedFromWayUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCopiedFromWayUuid

`func (o *SchemasWayPlainResponse) SetCopiedFromWayUuid(v string)`

SetCopiedFromWayUuid sets CopiedFromWayUuid field to given value.


### SetCopiedFromWayUuidNil

`func (o *SchemasWayPlainResponse) SetCopiedFromWayUuidNil(b bool)`

 SetCopiedFromWayUuidNil sets the value for CopiedFromWayUuid to be an explicit nil

### UnsetCopiedFromWayUuid
`func (o *SchemasWayPlainResponse) UnsetCopiedFromWayUuid()`

UnsetCopiedFromWayUuid ensures that no value is present for CopiedFromWayUuid, not even an explicit nil
### GetCreatedAt

`func (o *SchemasWayPlainResponse) GetCreatedAt() string`

GetCreatedAt returns the CreatedAt field if non-nil, zero value otherwise.

### GetCreatedAtOk

`func (o *SchemasWayPlainResponse) GetCreatedAtOk() (*string, bool)`

GetCreatedAtOk returns a tuple with the CreatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetCreatedAt

`func (o *SchemasWayPlainResponse) SetCreatedAt(v string)`

SetCreatedAt sets CreatedAt field to given value.


### GetDayReportsAmount

`func (o *SchemasWayPlainResponse) GetDayReportsAmount() int32`

GetDayReportsAmount returns the DayReportsAmount field if non-nil, zero value otherwise.

### GetDayReportsAmountOk

`func (o *SchemasWayPlainResponse) GetDayReportsAmountOk() (*int32, bool)`

GetDayReportsAmountOk returns a tuple with the DayReportsAmount field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetDayReportsAmount

`func (o *SchemasWayPlainResponse) SetDayReportsAmount(v int32)`

SetDayReportsAmount sets DayReportsAmount field to given value.


### GetEstimationTime

`func (o *SchemasWayPlainResponse) GetEstimationTime() int32`

GetEstimationTime returns the EstimationTime field if non-nil, zero value otherwise.

### GetEstimationTimeOk

`func (o *SchemasWayPlainResponse) GetEstimationTimeOk() (*int32, bool)`

GetEstimationTimeOk returns a tuple with the EstimationTime field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetEstimationTime

`func (o *SchemasWayPlainResponse) SetEstimationTime(v int32)`

SetEstimationTime sets EstimationTime field to given value.


### GetFavoriteForUsers

`func (o *SchemasWayPlainResponse) GetFavoriteForUsers() int32`

GetFavoriteForUsers returns the FavoriteForUsers field if non-nil, zero value otherwise.

### GetFavoriteForUsersOk

`func (o *SchemasWayPlainResponse) GetFavoriteForUsersOk() (*int32, bool)`

GetFavoriteForUsersOk returns a tuple with the FavoriteForUsers field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetFavoriteForUsers

`func (o *SchemasWayPlainResponse) SetFavoriteForUsers(v int32)`

SetFavoriteForUsers sets FavoriteForUsers field to given value.


### GetGoalDescription

`func (o *SchemasWayPlainResponse) GetGoalDescription() string`

GetGoalDescription returns the GoalDescription field if non-nil, zero value otherwise.

### GetGoalDescriptionOk

`func (o *SchemasWayPlainResponse) GetGoalDescriptionOk() (*string, bool)`

GetGoalDescriptionOk returns a tuple with the GoalDescription field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetGoalDescription

`func (o *SchemasWayPlainResponse) SetGoalDescription(v string)`

SetGoalDescription sets GoalDescription field to given value.


### GetIsCompleted

`func (o *SchemasWayPlainResponse) GetIsCompleted() bool`

GetIsCompleted returns the IsCompleted field if non-nil, zero value otherwise.

### GetIsCompletedOk

`func (o *SchemasWayPlainResponse) GetIsCompletedOk() (*bool, bool)`

GetIsCompletedOk returns a tuple with the IsCompleted field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsCompleted

`func (o *SchemasWayPlainResponse) SetIsCompleted(v bool)`

SetIsCompleted sets IsCompleted field to given value.


### GetIsPrivate

`func (o *SchemasWayPlainResponse) GetIsPrivate() bool`

GetIsPrivate returns the IsPrivate field if non-nil, zero value otherwise.

### GetIsPrivateOk

`func (o *SchemasWayPlainResponse) GetIsPrivateOk() (*bool, bool)`

GetIsPrivateOk returns a tuple with the IsPrivate field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetIsPrivate

`func (o *SchemasWayPlainResponse) SetIsPrivate(v bool)`

SetIsPrivate sets IsPrivate field to given value.


### GetMentors

`func (o *SchemasWayPlainResponse) GetMentors() []SchemasUserPlainResponse`

GetMentors returns the Mentors field if non-nil, zero value otherwise.

### GetMentorsOk

`func (o *SchemasWayPlainResponse) GetMentorsOk() (*[]SchemasUserPlainResponse, bool)`

GetMentorsOk returns a tuple with the Mentors field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMentors

`func (o *SchemasWayPlainResponse) SetMentors(v []SchemasUserPlainResponse)`

SetMentors sets Mentors field to given value.


### GetMetricsDone

`func (o *SchemasWayPlainResponse) GetMetricsDone() int32`

GetMetricsDone returns the MetricsDone field if non-nil, zero value otherwise.

### GetMetricsDoneOk

`func (o *SchemasWayPlainResponse) GetMetricsDoneOk() (*int32, bool)`

GetMetricsDoneOk returns a tuple with the MetricsDone field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMetricsDone

`func (o *SchemasWayPlainResponse) SetMetricsDone(v int32)`

SetMetricsDone sets MetricsDone field to given value.


### GetMetricsTotal

`func (o *SchemasWayPlainResponse) GetMetricsTotal() int32`

GetMetricsTotal returns the MetricsTotal field if non-nil, zero value otherwise.

### GetMetricsTotalOk

`func (o *SchemasWayPlainResponse) GetMetricsTotalOk() (*int32, bool)`

GetMetricsTotalOk returns a tuple with the MetricsTotal field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMetricsTotal

`func (o *SchemasWayPlainResponse) SetMetricsTotal(v int32)`

SetMetricsTotal sets MetricsTotal field to given value.


### GetName

`func (o *SchemasWayPlainResponse) GetName() string`

GetName returns the Name field if non-nil, zero value otherwise.

### GetNameOk

`func (o *SchemasWayPlainResponse) GetNameOk() (*string, bool)`

GetNameOk returns a tuple with the Name field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetName

`func (o *SchemasWayPlainResponse) SetName(v string)`

SetName sets Name field to given value.


### GetOwner

`func (o *SchemasWayPlainResponse) GetOwner() SchemasUserPlainResponse`

GetOwner returns the Owner field if non-nil, zero value otherwise.

### GetOwnerOk

`func (o *SchemasWayPlainResponse) GetOwnerOk() (*SchemasUserPlainResponse, bool)`

GetOwnerOk returns a tuple with the Owner field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetOwner

`func (o *SchemasWayPlainResponse) SetOwner(v SchemasUserPlainResponse)`

SetOwner sets Owner field to given value.


### GetProjectUuid

`func (o *SchemasWayPlainResponse) GetProjectUuid() string`

GetProjectUuid returns the ProjectUuid field if non-nil, zero value otherwise.

### GetProjectUuidOk

`func (o *SchemasWayPlainResponse) GetProjectUuidOk() (*string, bool)`

GetProjectUuidOk returns a tuple with the ProjectUuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProjectUuid

`func (o *SchemasWayPlainResponse) SetProjectUuid(v string)`

SetProjectUuid sets ProjectUuid field to given value.


### SetProjectUuidNil

`func (o *SchemasWayPlainResponse) SetProjectUuidNil(b bool)`

 SetProjectUuidNil sets the value for ProjectUuid to be an explicit nil

### UnsetProjectUuid
`func (o *SchemasWayPlainResponse) UnsetProjectUuid()`

UnsetProjectUuid ensures that no value is present for ProjectUuid, not even an explicit nil
### GetUpdatedAt

`func (o *SchemasWayPlainResponse) GetUpdatedAt() string`

GetUpdatedAt returns the UpdatedAt field if non-nil, zero value otherwise.

### GetUpdatedAtOk

`func (o *SchemasWayPlainResponse) GetUpdatedAtOk() (*string, bool)`

GetUpdatedAtOk returns a tuple with the UpdatedAt field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUpdatedAt

`func (o *SchemasWayPlainResponse) SetUpdatedAt(v string)`

SetUpdatedAt sets UpdatedAt field to given value.


### GetUuid

`func (o *SchemasWayPlainResponse) GetUuid() string`

GetUuid returns the Uuid field if non-nil, zero value otherwise.

### GetUuidOk

`func (o *SchemasWayPlainResponse) GetUuidOk() (*string, bool)`

GetUuidOk returns a tuple with the Uuid field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetUuid

`func (o *SchemasWayPlainResponse) SetUuid(v string)`

SetUuid sets Uuid field to given value.


### GetWayTags

`func (o *SchemasWayPlainResponse) GetWayTags() []SchemasWayTagResponse`

GetWayTags returns the WayTags field if non-nil, zero value otherwise.

### GetWayTagsOk

`func (o *SchemasWayPlainResponse) GetWayTagsOk() (*[]SchemasWayTagResponse, bool)`

GetWayTagsOk returns a tuple with the WayTags field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetWayTags

`func (o *SchemasWayPlainResponse) SetWayTags(v []SchemasWayTagResponse)`

SetWayTags sets WayTags field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


