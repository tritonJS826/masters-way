# SchemasGetProjectsByUserIDResponse

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Projects** | [**[]SchemasProjectPlainResponse**](SchemasProjectPlainResponse.md) |  | 

## Methods

### NewSchemasGetProjectsByUserIDResponse

`func NewSchemasGetProjectsByUserIDResponse(projects []SchemasProjectPlainResponse, ) *SchemasGetProjectsByUserIDResponse`

NewSchemasGetProjectsByUserIDResponse instantiates a new SchemasGetProjectsByUserIDResponse object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewSchemasGetProjectsByUserIDResponseWithDefaults

`func NewSchemasGetProjectsByUserIDResponseWithDefaults() *SchemasGetProjectsByUserIDResponse`

NewSchemasGetProjectsByUserIDResponseWithDefaults instantiates a new SchemasGetProjectsByUserIDResponse object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetProjects

`func (o *SchemasGetProjectsByUserIDResponse) GetProjects() []SchemasProjectPlainResponse`

GetProjects returns the Projects field if non-nil, zero value otherwise.

### GetProjectsOk

`func (o *SchemasGetProjectsByUserIDResponse) GetProjectsOk() (*[]SchemasProjectPlainResponse, bool)`

GetProjectsOk returns a tuple with the Projects field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetProjects

`func (o *SchemasGetProjectsByUserIDResponse) SetProjects(v []SchemasProjectPlainResponse)`

SetProjects sets Projects field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


