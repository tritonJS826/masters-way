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
  SchemasCreateMentorUserWayPayload,
  SchemasDeleteMentorUserWayPayload,
} from '../models/index';
import {
    SchemasCreateMentorUserWayPayloadFromJSON,
    SchemasCreateMentorUserWayPayloadToJSON,
    SchemasDeleteMentorUserWayPayloadFromJSON,
    SchemasDeleteMentorUserWayPayloadToJSON,
} from '../models/index';

export interface CreateMentorUserWayRequest {
    request: SchemasCreateMentorUserWayPayload;
}

export interface DeleteMentorUserWayRequest {
    request: SchemasDeleteMentorUserWayPayload;
}

/**
 * 
 */
export class MentorUserWayApi extends runtime.BaseAPI {

    /**
     * Make user mentor and also added to appropriate mentoring collection
     * Create a new mentorUserWay
     */
    async createMentorUserWayRaw(requestParameters: CreateMentorUserWayRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.request === null || requestParameters.request === undefined) {
            throw new runtime.RequiredError('request','Required parameter requestParameters.request was null or undefined when calling createMentorUserWay.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/mentorUserWays`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SchemasCreateMentorUserWayPayloadToJSON(requestParameters.request),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Make user mentor and also added to appropriate mentoring collection
     * Create a new mentorUserWay
     */
    async createMentorUserWay(requestParameters: CreateMentorUserWayRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.createMentorUserWayRaw(requestParameters, initOverrides);
    }

    /**
     * Delete mentorUserWay by UUID
     */
    async deleteMentorUserWayRaw(requestParameters: DeleteMentorUserWayRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.request === null || requestParameters.request === undefined) {
            throw new runtime.RequiredError('request','Required parameter requestParameters.request was null or undefined when calling deleteMentorUserWay.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/mentorUserWays`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: SchemasDeleteMentorUserWayPayloadToJSON(requestParameters.request),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete mentorUserWay by UUID
     */
    async deleteMentorUserWay(requestParameters: DeleteMentorUserWayRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteMentorUserWayRaw(requestParameters, initOverrides);
    }

}
