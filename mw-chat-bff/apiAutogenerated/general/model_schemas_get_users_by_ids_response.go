/*
Masters way general API

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

// checks if the SchemasGetUsersByIDsResponse type satisfies the MappedNullable interface at compile time
var _ MappedNullable = &SchemasGetUsersByIDsResponse{}

// SchemasGetUsersByIDsResponse struct for SchemasGetUsersByIDsResponse
type SchemasGetUsersByIDsResponse struct {
	ImageUrl string `json:"imageUrl"`
	Name string `json:"name"`
	UserId string `json:"userId"`
}

type _SchemasGetUsersByIDsResponse SchemasGetUsersByIDsResponse

// NewSchemasGetUsersByIDsResponse instantiates a new SchemasGetUsersByIDsResponse object
// This constructor will assign default values to properties that have it defined,
// and makes sure properties required by API are set, but the set of arguments
// will change when the set of required properties is changed
func NewSchemasGetUsersByIDsResponse(imageUrl string, name string, userId string) *SchemasGetUsersByIDsResponse {
	this := SchemasGetUsersByIDsResponse{}
	this.ImageUrl = imageUrl
	this.Name = name
	this.UserId = userId
	return &this
}

// NewSchemasGetUsersByIDsResponseWithDefaults instantiates a new SchemasGetUsersByIDsResponse object
// This constructor will only assign default values to properties that have it defined,
// but it doesn't guarantee that properties required by API are set
func NewSchemasGetUsersByIDsResponseWithDefaults() *SchemasGetUsersByIDsResponse {
	this := SchemasGetUsersByIDsResponse{}
	return &this
}

// GetImageUrl returns the ImageUrl field value
func (o *SchemasGetUsersByIDsResponse) GetImageUrl() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.ImageUrl
}

// GetImageUrlOk returns a tuple with the ImageUrl field value
// and a boolean to check if the value has been set.
func (o *SchemasGetUsersByIDsResponse) GetImageUrlOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return &o.ImageUrl, true
}

// SetImageUrl sets field value
func (o *SchemasGetUsersByIDsResponse) SetImageUrl(v string) {
	o.ImageUrl = v
}

// GetName returns the Name field value
func (o *SchemasGetUsersByIDsResponse) GetName() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.Name
}

// GetNameOk returns a tuple with the Name field value
// and a boolean to check if the value has been set.
func (o *SchemasGetUsersByIDsResponse) GetNameOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return &o.Name, true
}

// SetName sets field value
func (o *SchemasGetUsersByIDsResponse) SetName(v string) {
	o.Name = v
}

// GetUserId returns the UserId field value
func (o *SchemasGetUsersByIDsResponse) GetUserId() string {
	if o == nil {
		var ret string
		return ret
	}

	return o.UserId
}

// GetUserIdOk returns a tuple with the UserId field value
// and a boolean to check if the value has been set.
func (o *SchemasGetUsersByIDsResponse) GetUserIdOk() (*string, bool) {
	if o == nil {
		return nil, false
	}
	return &o.UserId, true
}

// SetUserId sets field value
func (o *SchemasGetUsersByIDsResponse) SetUserId(v string) {
	o.UserId = v
}

func (o SchemasGetUsersByIDsResponse) MarshalJSON() ([]byte, error) {
	toSerialize,err := o.ToMap()
	if err != nil {
		return []byte{}, err
	}
	return json.Marshal(toSerialize)
}

func (o SchemasGetUsersByIDsResponse) ToMap() (map[string]interface{}, error) {
	toSerialize := map[string]interface{}{}
	toSerialize["imageUrl"] = o.ImageUrl
	toSerialize["name"] = o.Name
	toSerialize["userId"] = o.UserId
	return toSerialize, nil
}

func (o *SchemasGetUsersByIDsResponse) UnmarshalJSON(data []byte) (err error) {
	// This validates that all required properties are included in the JSON object
	// by unmarshalling the object into a generic map with string keys and checking
	// that every required field exists as a key in the generic map.
	requiredProperties := []string{
		"imageUrl",
		"name",
		"userId",
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

	varSchemasGetUsersByIDsResponse := _SchemasGetUsersByIDsResponse{}

	decoder := json.NewDecoder(bytes.NewReader(data))
	decoder.DisallowUnknownFields()
	err = decoder.Decode(&varSchemasGetUsersByIDsResponse)

	if err != nil {
		return err
	}

	*o = SchemasGetUsersByIDsResponse(varSchemasGetUsersByIDsResponse)

	return err
}

type NullableSchemasGetUsersByIDsResponse struct {
	value *SchemasGetUsersByIDsResponse
	isSet bool
}

func (v NullableSchemasGetUsersByIDsResponse) Get() *SchemasGetUsersByIDsResponse {
	return v.value
}

func (v *NullableSchemasGetUsersByIDsResponse) Set(val *SchemasGetUsersByIDsResponse) {
	v.value = val
	v.isSet = true
}

func (v NullableSchemasGetUsersByIDsResponse) IsSet() bool {
	return v.isSet
}

func (v *NullableSchemasGetUsersByIDsResponse) Unset() {
	v.value = nil
	v.isSet = false
}

func NewNullableSchemasGetUsersByIDsResponse(val *SchemasGetUsersByIDsResponse) *NullableSchemasGetUsersByIDsResponse {
	return &NullableSchemasGetUsersByIDsResponse{value: val, isSet: true}
}

func (v NullableSchemasGetUsersByIDsResponse) MarshalJSON() ([]byte, error) {
	return json.Marshal(v.value)
}

func (v *NullableSchemasGetUsersByIDsResponse) UnmarshalJSON(src []byte) error {
	v.isSet = true
	return json.Unmarshal(src, &v.value)
}


