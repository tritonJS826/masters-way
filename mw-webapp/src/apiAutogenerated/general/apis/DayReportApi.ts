// @ts-nocheck
/* eslint-disable */
/**
 * Masters way general API
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
  SchemasCreateDayReportPayload,
  SchemasDayReportPopulatedResponse,
  SchemasUpdateDayReportPayload,
} from '../models/index';
import {
    SchemasCreateDayReportPayloadFromJSON,
    SchemasCreateDayReportPayloadToJSON,
    SchemasDayReportPopulatedResponseFromJSON,
    SchemasDayReportPopulatedResponseToJSON,
    SchemasUpdateDayReportPayloadFromJSON,
    SchemasUpdateDayReportPayloadToJSON,
} from '../models/index';

export interface CreateDayReportRequest {
    request: SchemasCreateDayReportPayload;
}

export interface GetDayReportsByWayUuidRequest {
    wayId: string;
}

export interface UpdateDayReportRequest {
    dayReportId: string;
    request: SchemasUpdateDayReportPayload;
}

/**
 * 
 */
export class DayReportApi extends runtime.BaseAPI {

    /**
     * Create a new dayReport
     */
    async createDayReportRaw(requestParameters: CreateDayReportRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SchemasDayReportPopulatedResponse>> {
        if (requestParameters.request === null || requestParameters.request === undefined) {
            throw new runtime.RequiredError('request','Required parameter requestParameters.request was null or undefined when calling createDayReport.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/dayReports`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SchemasCreateDayReportPayloadToJSON(requestParameters.request),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SchemasDayReportPopulatedResponseFromJSON(jsonValue));
    }

    /**
     * Create a new dayReport
     */
    async createDayReport(requestParameters: CreateDayReportRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SchemasDayReportPopulatedResponse> {
        const response = await this.createDayReportRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get all dayReports by Way UUID
     */
    async getDayReportsByWayUuidRaw(requestParameters: GetDayReportsByWayUuidRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<SchemasDayReportPopulatedResponse>>> {
        if (requestParameters.wayId === null || requestParameters.wayId === undefined) {
            throw new runtime.RequiredError('wayId','Required parameter requestParameters.wayId was null or undefined when calling getDayReportsByWayUuid.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/dayReports/{wayId}`.replace(`{${"wayId"}}`, encodeURIComponent(String(requestParameters.wayId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(SchemasDayReportPopulatedResponseFromJSON));
    }

    /**
     * Get all dayReports by Way UUID
     */
    async getDayReportsByWayUuid(requestParameters: GetDayReportsByWayUuidRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<SchemasDayReportPopulatedResponse>> {
        const response = await this.getDayReportsByWayUuidRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Update dayReport by UUID
     */
    async updateDayReportRaw(requestParameters: UpdateDayReportRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<SchemasDayReportPopulatedResponse>> {
        if (requestParameters.dayReportId === null || requestParameters.dayReportId === undefined) {
            throw new runtime.RequiredError('dayReportId','Required parameter requestParameters.dayReportId was null or undefined when calling updateDayReport.');
        }

        if (requestParameters.request === null || requestParameters.request === undefined) {
            throw new runtime.RequiredError('request','Required parameter requestParameters.request was null or undefined when calling updateDayReport.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/dayReports/{dayReportId}`.replace(`{${"dayReportId"}}`, encodeURIComponent(String(requestParameters.dayReportId))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: SchemasUpdateDayReportPayloadToJSON(requestParameters.request),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => SchemasDayReportPopulatedResponseFromJSON(jsonValue));
    }

    /**
     * Update dayReport by UUID
     */
    async updateDayReport(requestParameters: UpdateDayReportRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<SchemasDayReportPopulatedResponse> {
        const response = await this.updateDayReportRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
