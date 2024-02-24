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
  SchemasCreateWayCollectionPayload,
  SchemasUpdateWayCollectionPayload,
  SchemasWayCollectionPlainResponse,
} from '../models/index';
import {
    SchemasCreateWayCollectionPayloadFromJSON,
    SchemasCreateWayCollectionPayloadToJSON,
    SchemasUpdateWayCollectionPayloadFromJSON,
    SchemasUpdateWayCollectionPayloadToJSON,
    SchemasWayCollectionPlainResponseFromJSON,
    SchemasWayCollectionPlainResponseToJSON,
} from '../models/index';

export interface CreateWayCollectionRequest {
    request: SchemasCreateWayCollectionPayload;
}

export interface DeleteWayCollectionRequest {
    wayCollectionId: string;
}

export interface GetWayCollectionsByUserUuidRequest {
    userId: string;
}

export interface UpdateWayCollectionRequest {
    wayCollectionId: string;
    request: SchemasUpdateWayCollectionPayload;
}

/**
 * 
 */
export class WayCollectionApi extends runtime.BaseAPI {

    /**
     * Create a new wayCollection
     */
    async createWayCollectionRaw(requestParameters: CreateWayCollectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SchemasWayCollectionPlainResponse>> {
        if (requestParameters.request === null || requestParameters.request === undefined) {
            throw new runtime.RequiredError('request','Required parameter requestParameters.request was null or undefined when calling createWayCollection.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/wayCollections`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SchemasCreateWayCollectionPayloadToJSON(requestParameters.request),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SchemasWayCollectionPlainResponseFromJSON(jsonValue));
    }

    /**
     * Create a new wayCollection
     */
    async createWayCollection(requestParameters: CreateWayCollectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SchemasWayCollectionPlainResponse> {
        const response = await this.createWayCollectionRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete wayCollection by UUID
     */
    async deleteWayCollectionRaw(requestParameters: DeleteWayCollectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.wayCollectionId === null || requestParameters.wayCollectionId === undefined) {
            throw new runtime.RequiredError('wayCollectionId','Required parameter requestParameters.wayCollectionId was null or undefined when calling deleteWayCollection.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/wayCollections/{wayCollectionId}`.replace(`{${"wayCollectionId"}}`, encodeURIComponent(String(requestParameters.wayCollectionId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete wayCollection by UUID
     */
    async deleteWayCollection(requestParameters: DeleteWayCollectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteWayCollectionRaw(requestParameters, initOverrides);
    }

    /**
     * Get wayCollections by user UUID
     */
    async getWayCollectionsByUserUuidRaw(requestParameters: GetWayCollectionsByUserUuidRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<SchemasWayCollectionPlainResponse>>> {
        if (requestParameters.userId === null || requestParameters.userId === undefined) {
            throw new runtime.RequiredError('userId','Required parameter requestParameters.userId was null or undefined when calling getWayCollectionsByUserUuid.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/wayCollections/{userId}`.replace(`{${"userId"}}`, encodeURIComponent(String(requestParameters.userId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(SchemasWayCollectionPlainResponseFromJSON));
    }

    /**
     * Get wayCollections by user UUID
     */
    async getWayCollectionsByUserUuid(requestParameters: GetWayCollectionsByUserUuidRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<SchemasWayCollectionPlainResponse>> {
        const response = await this.getWayCollectionsByUserUuidRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update wayCollection by UUID
     */
    async updateWayCollectionRaw(requestParameters: UpdateWayCollectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SchemasWayCollectionPlainResponse>> {
        if (requestParameters.wayCollectionId === null || requestParameters.wayCollectionId === undefined) {
            throw new runtime.RequiredError('wayCollectionId','Required parameter requestParameters.wayCollectionId was null or undefined when calling updateWayCollection.');
        }

        if (requestParameters.request === null || requestParameters.request === undefined) {
            throw new runtime.RequiredError('request','Required parameter requestParameters.request was null or undefined when calling updateWayCollection.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/wayCollections/{wayCollectionId}`.replace(`{${"wayCollectionId"}}`, encodeURIComponent(String(requestParameters.wayCollectionId))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: SchemasUpdateWayCollectionPayloadToJSON(requestParameters.request),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SchemasWayCollectionPlainResponseFromJSON(jsonValue));
    }

    /**
     * Update wayCollection by UUID
     */
    async updateWayCollection(requestParameters: UpdateWayCollectionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SchemasWayCollectionPlainResponse> {
        const response = await this.updateWayCollectionRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
