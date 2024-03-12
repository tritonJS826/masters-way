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
  SchemasCreateUserTagPayload,
  SchemasUserTagResponse,
} from '../models/index';
import {
    SchemasCreateUserTagPayloadFromJSON,
    SchemasCreateUserTagPayloadToJSON,
    SchemasUserTagResponseFromJSON,
    SchemasUserTagResponseToJSON,
} from '../models/index';

export interface CreateUserTagRequest {
    request: SchemasCreateUserTagPayload;
}

export interface DeleteUserTagRequest {
    userTagId: string;
    userId: string;
}

/**
 * 
 */
export class UserTagApi extends runtime.BaseAPI {

    /**
     * Create a new userTag
     */
    async createUserTagRaw(requestParameters: CreateUserTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SchemasUserTagResponse>> {
        if (requestParameters.request === null || requestParameters.request === undefined) {
            throw new runtime.RequiredError('request','Required parameter requestParameters.request was null or undefined when calling createUserTag.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/usersTags`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SchemasCreateUserTagPayloadToJSON(requestParameters.request),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SchemasUserTagResponseFromJSON(jsonValue));
    }

    /**
     * Create a new userTag
     */
    async createUserTag(requestParameters: CreateUserTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SchemasUserTagResponse> {
        const response = await this.createUserTagRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete userTag by UUID
     */
    async deleteUserTagRaw(requestParameters: DeleteUserTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.userTagId === null || requestParameters.userTagId === undefined) {
            throw new runtime.RequiredError('userTagId','Required parameter requestParameters.userTagId was null or undefined when calling deleteUserTag.');
        }

        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling deleteUserTag.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/userTags/{userTagId}/{userId}`.replace(`{${"userTagId"}}`, encodeURIComponent(String(requestParameters.userTagId))).replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete userTag by UUID
     */
    async deleteUserTag(requestParameters: DeleteUserTagRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteUserTagRaw(requestParameters, initOverrides);
    }

}
