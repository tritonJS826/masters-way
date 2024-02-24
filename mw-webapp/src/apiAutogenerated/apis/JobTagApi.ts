// @ts-nocheck
/* eslint-disable */
/**
 * Masters way API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  SchemasCreateJobTagPayload,
  SchemasJobTagResponse,
  SchemasUpdateJobTagPayload,
} from '../models/index';
import {
    SchemasCreateJobTagPayloadFromJSON,
    SchemasCreateJobTagPayloadToJSON,
    SchemasJobTagResponseFromJSON,
    SchemasJobTagResponseToJSON,
    SchemasUpdateJobTagPayloadFromJSON,
    SchemasUpdateJobTagPayloadToJSON,
} from '../models/index';

export interface CreateJobTagRequest {
    request: SchemasCreateJobTagPayload;
}

export interface DeleteJobTagRequest {
    jobTagId: string;
}

export interface GetJobTagsByWayUuidRequest {
    wayId: string;
}

export interface UpdateJobTagRequest {
    jobTagId: string;
    request: SchemasUpdateJobTagPayload;
}

/**
 * 
 */
export class JobTagApi extends runtime.BaseAPI {

    /**
     * Create a new jobTag
     */
    async createJobTagRaw(requestParameters: CreateJobTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SchemasJobTagResponse>> {
        if (requestParameters.request === null || requestParameters.request === undefined) {
            throw new runtime.RequiredError('request','Required parameter requestParameters.request was null or undefined when calling createJobTag.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/jobTags`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SchemasCreateJobTagPayloadToJSON(requestParameters.request),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SchemasJobTagResponseFromJSON(jsonValue));
    }

    /**
     * Create a new jobTag
     */
    async createJobTag(requestParameters: CreateJobTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SchemasJobTagResponse> {
        const response = await this.createJobTagRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete jobTag by UUID
     */
    async deleteJobTagRaw(requestParameters: DeleteJobTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.jobTagId === null || requestParameters.jobTagId === undefined) {
            throw new runtime.RequiredError('jobTagId','Required parameter requestParameters.jobTagId was null or undefined when calling deleteJobTag.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/jobTags/{jobTagId}`.replace(`{${"jobTagId"}}`, encodeURIComponent(String(requestParameters.jobTagId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete jobTag by UUID
     */
    async deleteJobTag(requestParameters: DeleteJobTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteJobTagRaw(requestParameters, initOverrides);
    }

    /**
     * Get jobTags by user UUID
     */
    async getJobTagsByWayUuidRaw(requestParameters: GetJobTagsByWayUuidRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<SchemasJobTagResponse>>> {
        if (requestParameters.wayId === null || requestParameters.wayId === undefined) {
            throw new runtime.RequiredError('wayId','Required parameter requestParameters.wayId was null or undefined when calling getJobTagsByWayUuid.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/jobTags/{wayId}`.replace(`{${"wayId"}}`, encodeURIComponent(String(requestParameters.wayId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(SchemasJobTagResponseFromJSON));
    }

    /**
     * Get jobTags by user UUID
     */
    async getJobTagsByWayUuid(requestParameters: GetJobTagsByWayUuidRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<SchemasJobTagResponse>> {
        const response = await this.getJobTagsByWayUuidRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update jobTag by UUID
     */
    async updateJobTagRaw(requestParameters: UpdateJobTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SchemasJobTagResponse>> {
        if (requestParameters.jobTagId === null || requestParameters.jobTagId === undefined) {
            throw new runtime.RequiredError('jobTagId','Required parameter requestParameters.jobTagId was null or undefined when calling updateJobTag.');
        }

        if (requestParameters.request === null || requestParameters.request === undefined) {
            throw new runtime.RequiredError('request','Required parameter requestParameters.request was null or undefined when calling updateJobTag.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/jobTags/{jobTagId}`.replace(`{${"jobTagId"}}`, encodeURIComponent(String(requestParameters.jobTagId))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: SchemasUpdateJobTagPayloadToJSON(requestParameters.request),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SchemasJobTagResponseFromJSON(jsonValue));
    }

    /**
     * Update jobTag by UUID
     */
    async updateJobTag(requestParameters: UpdateJobTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SchemasJobTagResponse> {
        const response = await this.updateJobTagRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
