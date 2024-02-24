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
  SchemasCreatePlanJobTagPayload,
} from '../models/index';
import {
    SchemasCreatePlanJobTagPayloadFromJSON,
    SchemasCreatePlanJobTagPayloadToJSON,
} from '../models/index';

export interface CreatePlanJobTagRequest {
    request: SchemasCreatePlanJobTagPayload;
}

export interface DeletePlanJobTagRequest {
    jobTagId: string;
    planId: string;
}

/**
 * 
 */
export class PlanJobTagApi extends runtime.BaseAPI {

    /**
     * Create a new planJobTag
     */
    async createPlanJobTagRaw(requestParameters: CreatePlanJobTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.request === null || requestParameters.request === undefined) {
            throw new runtime.RequiredError('request','Required parameter requestParameters.request was null or undefined when calling createPlanJobTag.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/planJobTags`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SchemasCreatePlanJobTagPayloadToJSON(requestParameters.request),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Create a new planJobTag
     */
    async createPlanJobTag(requestParameters: CreatePlanJobTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.createPlanJobTagRaw(requestParameters, initOverrides);
    }

    /**
     * Delete planJobTag by UUID
     */
    async deletePlanJobTagRaw(requestParameters: DeletePlanJobTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.jobTagId === null || requestParameters.jobTagId === undefined) {
            throw new runtime.RequiredError('jobTagId','Required parameter requestParameters.jobTagId was null or undefined when calling deletePlanJobTag.');
        }

        if (requestParameters.planId === null || requestParameters.planId === undefined) {
            throw new runtime.RequiredError('planId','Required parameter requestParameters.planId was null or undefined when calling deletePlanJobTag.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/planJobTags/{jobTagId}/{planId}`.replace(`{${"jobTagId"}}`, encodeURIComponent(String(requestParameters.jobTagId))).replace(`{${"planId"}}`, encodeURIComponent(String(requestParameters.planId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete planJobTag by UUID
     */
    async deletePlanJobTag(requestParameters: DeletePlanJobTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deletePlanJobTagRaw(requestParameters, initOverrides);
    }

}
