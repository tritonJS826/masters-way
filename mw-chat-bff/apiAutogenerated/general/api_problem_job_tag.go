/*
Masters way general API

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


// ProblemJobTagAPIService ProblemJobTagAPI service
type ProblemJobTagAPIService service

type ApiCreateProblemJobTagRequest struct {
	ctx context.Context
	ApiService *ProblemJobTagAPIService
	request *SchemasCreateProblemJobTagPayload
}

// query params
func (r ApiCreateProblemJobTagRequest) Request(request SchemasCreateProblemJobTagPayload) ApiCreateProblemJobTagRequest {
	r.request = &request
	return r
}

func (r ApiCreateProblemJobTagRequest) Execute() (*http.Response, error) {
	return r.ApiService.CreateProblemJobTagExecute(r)
}

/*
CreateProblemJobTag Create a new problemJobTag

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @return ApiCreateProblemJobTagRequest
*/
func (a *ProblemJobTagAPIService) CreateProblemJobTag(ctx context.Context) ApiCreateProblemJobTagRequest {
	return ApiCreateProblemJobTagRequest{
		ApiService: a,
		ctx: ctx,
	}
}

// Execute executes the request
func (a *ProblemJobTagAPIService) CreateProblemJobTagExecute(r ApiCreateProblemJobTagRequest) (*http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodPost
		localVarPostBody     interface{}
		formFiles            []formFile
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "ProblemJobTagAPIService.CreateProblemJobTag")
	if err != nil {
		return nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/problemJobTags"

	localVarHeaderParams := make(map[string]string)
	localVarQueryParams := url.Values{}
	localVarFormParams := url.Values{}
	if r.request == nil {
		return nil, reportError("request is required and must be specified")
	}

	// to determine the Content-Type header
	localVarHTTPContentTypes := []string{"application/json"}

	// set Content-Type header
	localVarHTTPContentType := selectHeaderContentType(localVarHTTPContentTypes)
	if localVarHTTPContentType != "" {
		localVarHeaderParams["Content-Type"] = localVarHTTPContentType
	}

	// to determine the Accept header
	localVarHTTPHeaderAccepts := []string{}

	// set Accept header
	localVarHTTPHeaderAccept := selectHeaderAccept(localVarHTTPHeaderAccepts)
	if localVarHTTPHeaderAccept != "" {
		localVarHeaderParams["Accept"] = localVarHTTPHeaderAccept
	}
	// body params
	localVarPostBody = r.request
	req, err := a.client.prepareRequest(r.ctx, localVarPath, localVarHTTPMethod, localVarPostBody, localVarHeaderParams, localVarQueryParams, localVarFormParams, formFiles)
	if err != nil {
		return nil, err
	}

	localVarHTTPResponse, err := a.client.callAPI(req)
	if err != nil || localVarHTTPResponse == nil {
		return localVarHTTPResponse, err
	}

	localVarBody, err := io.ReadAll(localVarHTTPResponse.Body)
	localVarHTTPResponse.Body.Close()
	localVarHTTPResponse.Body = io.NopCloser(bytes.NewBuffer(localVarBody))
	if err != nil {
		return localVarHTTPResponse, err
	}

	if localVarHTTPResponse.StatusCode >= 300 {
		newErr := &GenericOpenAPIError{
			body:  localVarBody,
			error: localVarHTTPResponse.Status,
		}
		return localVarHTTPResponse, newErr
	}

	return localVarHTTPResponse, nil
}

type ApiDeleteProblemJobTagRequest struct {
	ctx context.Context
	ApiService *ProblemJobTagAPIService
	problemId string
	jobTagId string
}

func (r ApiDeleteProblemJobTagRequest) Execute() (*http.Response, error) {
	return r.ApiService.DeleteProblemJobTagExecute(r)
}

/*
DeleteProblemJobTag Delete problemJobTag by UUID

 @param ctx context.Context - for authentication, logging, cancellation, deadlines, tracing, etc. Passed from http.Request or context.Background().
 @param problemId problem ID
 @param jobTagId jobTag ID
 @return ApiDeleteProblemJobTagRequest
*/
func (a *ProblemJobTagAPIService) DeleteProblemJobTag(ctx context.Context, problemId string, jobTagId string) ApiDeleteProblemJobTagRequest {
	return ApiDeleteProblemJobTagRequest{
		ApiService: a,
		ctx: ctx,
		problemId: problemId,
		jobTagId: jobTagId,
	}
}

// Execute executes the request
func (a *ProblemJobTagAPIService) DeleteProblemJobTagExecute(r ApiDeleteProblemJobTagRequest) (*http.Response, error) {
	var (
		localVarHTTPMethod   = http.MethodDelete
		localVarPostBody     interface{}
		formFiles            []formFile
	)

	localBasePath, err := a.client.cfg.ServerURLWithContext(r.ctx, "ProblemJobTagAPIService.DeleteProblemJobTag")
	if err != nil {
		return nil, &GenericOpenAPIError{error: err.Error()}
	}

	localVarPath := localBasePath + "/problemJobTags/{jobTagId}/{problemId}"
	localVarPath = strings.Replace(localVarPath, "{"+"problemId"+"}", url.PathEscape(parameterValueToString(r.problemId, "problemId")), -1)
	localVarPath = strings.Replace(localVarPath, "{"+"jobTagId"+"}", url.PathEscape(parameterValueToString(r.jobTagId, "jobTagId")), -1)

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
	localVarHTTPHeaderAccepts := []string{}

	// set Accept header
	localVarHTTPHeaderAccept := selectHeaderAccept(localVarHTTPHeaderAccepts)
	if localVarHTTPHeaderAccept != "" {
		localVarHeaderParams["Accept"] = localVarHTTPHeaderAccept
	}
	req, err := a.client.prepareRequest(r.ctx, localVarPath, localVarHTTPMethod, localVarPostBody, localVarHeaderParams, localVarQueryParams, localVarFormParams, formFiles)
	if err != nil {
		return nil, err
	}

	localVarHTTPResponse, err := a.client.callAPI(req)
	if err != nil || localVarHTTPResponse == nil {
		return localVarHTTPResponse, err
	}

	localVarBody, err := io.ReadAll(localVarHTTPResponse.Body)
	localVarHTTPResponse.Body.Close()
	localVarHTTPResponse.Body = io.NopCloser(bytes.NewBuffer(localVarBody))
	if err != nil {
		return localVarHTTPResponse, err
	}

	if localVarHTTPResponse.StatusCode >= 300 {
		newErr := &GenericOpenAPIError{
			body:  localVarBody,
			error: localVarHTTPResponse.Status,
		}
		return localVarHTTPResponse, newErr
	}

	return localVarHTTPResponse, nil
}
