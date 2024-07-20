/*
Masters way API

No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)

API version: 1.0
*/

// Code generated by OpenAPI Generator (https://openapi-generator.tech); DO NOT EDIT.

package openapi

import (
	"bytes"
	"context"
	"io"
	"net/http"
	"net/url"
	"strings"
)


// UserAPIService UserAPI service
type UserAPIService service

type ApiGetAllUsersRequest struct {
	ctx context.Context
	ApiService *UserAPIService
	page *int32
	limit *int32
	email *string
	name *string
	mentorStatus *string
}

// Page number for pagination
func (r ApiGetAllUsersRequest) Page(page int32) ApiGetAllUsersRequest {
	r.page = &page
	return r
}

// Number of items per page
func (r ApiGetAllUsersRequest) Limit(limit int32) ApiGetAllUsersRequest {
	r.limit = &limit
	return r
}

// Part of user email for filters
func (r ApiGetAllUsersRequest) Email(email string) ApiGetAllUsersRequest {
	r.email = &email
	return r
}

// Part of user name for filters
func (r ApiGetAllUsersRequest) Name(name string) ApiGetAllUsersRequest {
	r.name = &name
	return r
}

// &#39;mentor&#39; | &#39;all&#39; status for filter
func (r ApiGetAllUsersRequest) MentorStatus(mentorStatus string) ApiGetAllUsersRequest {
	r.mentorStatus = &mentorStatus
	return r
}

func (r ApiGetAllUsersRequest) Execute() (*SchemasGetAllUsersResponse, *http.Response, error) {
	return r.ApiService.GetAllUsersExecute(r)
}

/*
GetAllUsers Get all users

Get users with pagination

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @return ApiGetAllUsersRequest
*/
func (a *UserAPIService) GetAllUsers(ctx context.Context) ApiGetAllUsersRequest {
	return ApiGetAllUsersRequest{
		ApiService: a,
		ctx: ctx,
	}
}

// Execute executes the request
//  @return SchemasGetAllUsersResponse
func (a *UserAPIService) GetAllUsersExecute(r ApiGetAllUsersRequest) (*SchemasGetAllUsersResponse, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodGet
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *SchemasGetAllUsersResponse
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "UserAPIService.GetAllUsers")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/users"

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}

	if r.page != nil {
		parameterAddToHeaderOrQuery(localVarQueryParams, "page", r.page, "")
	}
	if r.limit != nil {
		parameterAddToHeaderOrQuery(localVarQueryParams, "limit", r.limit, "")
	}
	if r.email != nil {
		parameterAddToHeaderOrQuery(localVarQueryParams, "email", r.email, "")
	}
	if r.name != nil {
		parameterAddToHeaderOrQuery(localVarQueryParams, "name", r.name, "")
	}
	if r.mentorStatus != nil {
		parameterAddToHeaderOrQuery(localVarQueryParams, "mentorStatus", r.mentorStatus, "")
	}
	// to determine the Content-Type header
	localVarHTTPContentTypes := []string{}

	// set Content-Type header
	localVarHTTPContentType := selectHeaderContentType(localVarHTTPContentTypes)
	if localVarHTTPContentType != "" {
		localVarHeaderParams["Content-Type"] = localVarHTTPContentType
	}

	// to determine the Accept header
	localVarHTTPHeaderAccepts := []string{"application/json"}

	// set Accept header
	localVarHTTPHeaderAccept := selectHeaderAccept(localVarHTTPHeaderAccepts)
	if localVarHTTPHeaderAccept != "" {
		localVarHeaderParams["Accept"] = localVarHTTPHeaderAccept
	}
	req, err := a.client.prepareRequest(r.ctx, localVarPath, localVarHTTPMethod, localVarPostBody, localVarHeaderParams, localVarQueryParams, localVarFormParams, formFiles)
	if err != nil {
		return localVarReturnValue, nil, err
	}

	localVarHTTPResponse, err := a.client.callAPI(req)
	if err != nil || localVarHTTPResponse == nil {
		return localVarReturnValue, localVarHTTPResponse, err
	}

	localVarBody, err := io.ReadAll(localVarHTTPResponse.Body)
	localVarHTTPResponse.Body.Close()
	localVarHTTPResponse.Body = io.NopCloser(bytes.NewBuffer(localVarBody))
	if err != nil {
		return localVarReturnValue, localVarHTTPResponse, err
	}

	if localVarHTTPResponse.StatusCode >= 300 {
		newErr := &GenericOpenAPIError{
			body:  localVarBody,
			error: localVarHTTPResponse.Status,
		}
		return localVarReturnValue, localVarHTTPResponse, newErr
	}

	err = a.client.decode(&localVarReturnValue, localVarBody, localVarHTTPResponse.Header.Get("Content-Type"))
	if err != nil {
		newErr := &GenericOpenAPIError{
			body:  localVarBody,
			error: err.Error(),
		}
		return localVarReturnValue, localVarHTTPResponse, newErr
	}

	return localVarReturnValue, localVarHTTPResponse, nil
}

type ApiGetUserByUuidRequest struct {
	ctx context.Context
	ApiService *UserAPIService
	userId string
}

func (r ApiGetUserByUuidRequest) Execute() (*SchemasUserPopulatedResponse, *http.Response, error) {
	return r.ApiService.GetUserByUuidExecute(r)
}

/*
GetUserByUuid Get user by UUID

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param userId user ID
 @return ApiGetUserByUuidRequest
*/
func (a *UserAPIService) GetUserByUuid(ctx context.Context, userId string) ApiGetUserByUuidRequest {
	return ApiGetUserByUuidRequest{
		ApiService: a,
		ctx: ctx,
		userId: userId,
	}
}

// Execute executes the request
//  @return SchemasUserPopulatedResponse
func (a *UserAPIService) GetUserByUuidExecute(r ApiGetUserByUuidRequest) (*SchemasUserPopulatedResponse, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodGet
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *SchemasUserPopulatedResponse
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "UserAPIService.GetUserByUuid")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/users/{userId}"
	localVarPath = strings.Replace(localVarPath, "{"+"userId"+"}", url.PathEscape(parameterValueToString(r.userId, "userId")), -1)

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}

	// to determine the Content-Type header
	localVarHTTPContentTypes := []string{}

	// set Content-Type header
	localVarHTTPContentType := selectHeaderContentType(localVarHTTPContentTypes)
	if localVarHTTPContentType != "" {
		localVarHeaderParams["Content-Type"] = localVarHTTPContentType
	}

	// to determine the Accept header
	localVarHTTPHeaderAccepts := []string{"application/json"}

	// set Accept header
	localVarHTTPHeaderAccept := selectHeaderAccept(localVarHTTPHeaderAccepts)
	if localVarHTTPHeaderAccept != "" {
		localVarHeaderParams["Accept"] = localVarHTTPHeaderAccept
	}
	req, err := a.client.prepareRequest(r.ctx, localVarPath, localVarHTTPMethod, localVarPostBody, localVarHeaderParams, localVarQueryParams, localVarFormParams, formFiles)
	if err != nil {
		return localVarReturnValue, nil, err
	}

	localVarHTTPResponse, err := a.client.callAPI(req)
	if err != nil || localVarHTTPResponse == nil {
		return localVarReturnValue, localVarHTTPResponse, err
	}

	localVarBody, err := io.ReadAll(localVarHTTPResponse.Body)
	localVarHTTPResponse.Body.Close()
	localVarHTTPResponse.Body = io.NopCloser(bytes.NewBuffer(localVarBody))
	if err != nil {
		return localVarReturnValue, localVarHTTPResponse, err
	}

	if localVarHTTPResponse.StatusCode >= 300 {
		newErr := &GenericOpenAPIError{
			body:  localVarBody,
			error: localVarHTTPResponse.Status,
		}
		return localVarReturnValue, localVarHTTPResponse, newErr
	}

	err = a.client.decode(&localVarReturnValue, localVarBody, localVarHTTPResponse.Header.Get("Content-Type"))
	if err != nil {
		newErr := &GenericOpenAPIError{
			body:  localVarBody,
			error: err.Error(),
		}
		return localVarReturnValue, localVarHTTPResponse, newErr
	}

	return localVarReturnValue, localVarHTTPResponse, nil
}

type ApiUpdateUserRequest struct {
	ctx context.Context
	ApiService *UserAPIService
	userId string
	request *SchemasUpdateUserPayload
}

// query params
func (r ApiUpdateUserRequest) Request(request SchemasUpdateUserPayload) ApiUpdateUserRequest {
	r.request = &request
	return r
}

func (r ApiUpdateUserRequest) Execute() (*SchemasUserPlainResponse, *http.Response, error) {
	return r.ApiService.UpdateUserExecute(r)
}

/*
UpdateUser Update user by UUID

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param userId user ID
 @return ApiUpdateUserRequest
*/
func (a *UserAPIService) UpdateUser(ctx context.Context, userId string) ApiUpdateUserRequest {
	return ApiUpdateUserRequest{
		ApiService: a,
		ctx: ctx,
		userId: userId,
	}
}

// Execute executes the request
//  @return SchemasUserPlainResponse
func (a *UserAPIService) UpdateUserExecute(r ApiUpdateUserRequest) (*SchemasUserPlainResponse, *http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPatch
		localVarPostBody     interface{}
		formFiles            []formFile
		localVarReturnValue  *SchemasUserPlainResponse
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "UserAPIService.UpdateUser")
	if err != nil {
		return localVarReturnValue, nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/users/{userId}"
	localVarPath = strings.Replace(localVarPath, "{"+"userId"+"}", url.PathEscape(parameterValueToString(r.userId, "userId")), -1)

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}
	if r.request == nil {
		return localVarReturnValue, nil, reportError("request is required and must be specified")
	}

	// to determine the Content-Type header
	localVarHTTPContentTypes := []string{"application/json"}

	// set Content-Type header
	localVarHTTPContentType := selectHeaderContentType(localVarHTTPContentTypes)
	if localVarHTTPContentType != "" {
		localVarHeaderParams["Content-Type"] = localVarHTTPContentType
	}

	// to determine the Accept header
	localVarHTTPHeaderAccepts := []string{"application/json"}

	// set Accept header
	localVarHTTPHeaderAccept := selectHeaderAccept(localVarHTTPHeaderAccepts)
	if localVarHTTPHeaderAccept != "" {
		localVarHeaderParams["Accept"] = localVarHTTPHeaderAccept
	}
	// body params
	localVarPostBody = r.request
	req, err := a.client.prepareRequest(r.ctx, localVarPath, localVarHTTPMethod, localVarPostBody, localVarHeaderParams, localVarQueryParams, localVarFormParams, formFiles)
	if err != nil {
		return localVarReturnValue, nil, err
	}

	localVarHTTPResponse, err := a.client.callAPI(req)
	if err != nil || localVarHTTPResponse == nil {
		return localVarReturnValue, localVarHTTPResponse, err
	}

	localVarBody, err := io.ReadAll(localVarHTTPResponse.Body)
	localVarHTTPResponse.Body.Close()
	localVarHTTPResponse.Body = io.NopCloser(bytes.NewBuffer(localVarBody))
	if err != nil {
		return localVarReturnValue, localVarHTTPResponse, err
	}

	if localVarHTTPResponse.StatusCode >= 300 {
		newErr := &GenericOpenAPIError{
			body:  localVarBody,
			error: localVarHTTPResponse.Status,
		}
		return localVarReturnValue, localVarHTTPResponse, newErr
	}

	err = a.client.decode(&localVarReturnValue, localVarBody, localVarHTTPResponse.Header.Get("Content-Type"))
	if err != nil {
		newErr := &GenericOpenAPIError{
			body:  localVarBody,
			error: err.Error(),
		}
		return localVarReturnValue, localVarHTTPResponse, newErr
	}

	return localVarReturnValue, localVarHTTPResponse, nil
}
