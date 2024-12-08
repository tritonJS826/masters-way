# MwServerInternalSchemasMetricTreeNode

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**Children** | [**[]MwServerInternalSchemasMetricTreeNode**](MwServerInternalSchemasMetricTreeNode.md) |  | 
**Metric** | [**MwServerInternalSchemasMetricResponse**](MwServerInternalSchemasMetricResponse.md) |  | 

## Methods

### NewMwServerInternalSchemasMetricTreeNode

`func NewMwServerInternalSchemasMetricTreeNode(children []MwServerInternalSchemasMetricTreeNode, metric MwServerInternalSchemasMetricResponse, ) *MwServerInternalSchemasMetricTreeNode`

NewMwServerInternalSchemasMetricTreeNode instantiates a new MwServerInternalSchemasMetricTreeNode object
This constructor will assign default values to properties that have it defined,
and makes sure properties required by API are set, but the set of arguments
will change when the set of required properties is changed

### NewMwServerInternalSchemasMetricTreeNodeWithDefaults

`func NewMwServerInternalSchemasMetricTreeNodeWithDefaults() *MwServerInternalSchemasMetricTreeNode`

NewMwServerInternalSchemasMetricTreeNodeWithDefaults instantiates a new MwServerInternalSchemasMetricTreeNode object
This constructor will only assign default values to properties that have it defined,
but it doesn't guarantee that properties required by API are set

### GetChildren

`func (o *MwServerInternalSchemasMetricTreeNode) GetChildren() []MwServerInternalSchemasMetricTreeNode`

GetChildren returns the Children field if non-nil, zero value otherwise.

### GetChildrenOk

`func (o *MwServerInternalSchemasMetricTreeNode) GetChildrenOk() (*[]MwServerInternalSchemasMetricTreeNode, bool)`

GetChildrenOk returns a tuple with the Children field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetChildren

`func (o *MwServerInternalSchemasMetricTreeNode) SetChildren(v []MwServerInternalSchemasMetricTreeNode)`

SetChildren sets Children field to given value.


### GetMetric

`func (o *MwServerInternalSchemasMetricTreeNode) GetMetric() MwServerInternalSchemasMetricResponse`

GetMetric returns the Metric field if non-nil, zero value otherwise.

### GetMetricOk

`func (o *MwServerInternalSchemasMetricTreeNode) GetMetricOk() (*MwServerInternalSchemasMetricResponse, bool)`

GetMetricOk returns a tuple with the Metric field if it's non-nil, zero value otherwise
and a boolean to check if the value has been set.

### SetMetric

`func (o *MwServerInternalSchemasMetricTreeNode) SetMetric(v MwServerInternalSchemasMetricResponse)`

SetMetric sets Metric field to given value.



[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


