/*
Masters way API

No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)

API version: 1.0
*/

// Code generated by OpenAPI Generator (https://openapi-generator.tech); DO NOT EDIT.

package openapi

import (
	"encoding/json"
	"bytes"
	"fmt"
)

// checks if the SchemasWayTagResponse type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &SchemasWayTagResponse{}

// SchemasWayTagResponse struct for SchemasWayTagResponse
type SchemasWayTagResponse struct {
	Name string `json:"name"`
	Uuid string `json:"uuid"`
}

type _SchemasWayTagResponse SchemasWayTagResponse

// NewSchemasWayTagResponse instantiates a new SchemasWayTagResponse object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewSchemasWayTagResponse(name string, uuid string) *SchemasWayTagResponse {
	this := SchemasWayTagResponse{}
	this.Name = name
	this.Uuid = uuid
	return &this
}

// NewSchemasWayTagResponseWithDefaults instantiates a new SchemasWayTagResponse object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewSchemasWayTagResponseWithDefaults() *SchemasWayTagResponse {
	this := SchemasWayTagResponse{}
	return &this
}

// GetName returns the Name field value
func (o *SchemasWayTagResponse) GetName() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.Name
}

// GetNameOk returns a tuple with the Name field value
// and a boolean to check if the value has been set.
func (o *SchemasWayTagResponse) GetNameOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Name, true
}

// SetName sets field value
func (o *SchemasWayTagResponse) SetName(v string) {
	o.Name = v
}

// GetUuid returns the Uuid field value
func (o *SchemasWayTagResponse) GetUuid() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.Uuid
}

// GetUuidOk returns a tuple with the Uuid field value
// and a boolean to check if the value has been set.
func (o *SchemasWayTagResponse) GetUuidOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Uuid, true
}

// SetUuid sets field value
func (o *SchemasWayTagResponse) SetUuid(v string) {
	o.Uuid = v
}

func (o SchemasWayTagResponse) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o SchemasWayTagResponse) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["name"] = o.Name
	toSerialize["uuid"] = o.Uuid
	return toSerialize, nil
}

func (o *SchemasWayTagResponse) UnmarshalJSON(data []byte) (err error) {
	// This validates that all required properties are included in the JSON object
	// by unmarshalling the object into a generic map with string keys and checking
	// that every required field exists as a key in the generic map.
	requiredProperties := []string{
		"name",
		"uuid",
	}

	allProperties := make(map[string]interface{})

	err = json.Unmarshal(data, &allProperties)

	if err != nil {
		return err;
	}

	for _, requiredProperty := range(requiredProperties) {
		if _, exists := allProperties[requiredProperty]; !exists {
			return fmt.Errorf("no value given for required property %v", requiredProperty)
		}
	}

	varSchemasWayTagResponse := _SchemasWayTagResponse{}

	decoder := json.NewDecoder(bytes.NewReader(data))
	decoder.DisallowUnknownFields()
	err = decoder.Decode(&varSchemasWayTagResponse)

	if err != nil {
		return err
	}

	*o = SchemasWayTagResponse(varSchemasWayTagResponse)

	return err
}

type NullableSchemasWayTagResponse struct {
	value *SchemasWayTagResponse
	isSet bool
}

func (v NullableSchemasWayTagResponse) Get() *SchemasWayTagResponse {
	return v.value
}

func (v *NullableSchemasWayTagResponse) Set(val *SchemasWayTagResponse) {
	v.value = val
	v.isSet = true
}

func (v NullableSchemasWayTagResponse) IsSet() bool {
	return v.isSet
}

func (v *NullableSchemasWayTagResponse) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableSchemasWayTagResponse(val *SchemasWayTagResponse) *NullableSchemasWayTagResponse {
	return &NullableSchemasWayTagResponse{value: val, isSet: true}
}

func (v NullableSchemasWayTagResponse) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableSchemasWayTagResponse) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


