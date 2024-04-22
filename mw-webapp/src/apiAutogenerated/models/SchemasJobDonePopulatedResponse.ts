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

import { exists, mapValues } from '../runtime';
import type { SchemasJobTagResponse } from './SchemasJobTagResponse';
import {
    SchemasJobTagResponseFromJSON,
    SchemasJobTagResponseFromJSONTyped,
    SchemasJobTagResponseToJSON,
} from './SchemasJobTagResponse';

/**
 * 
 * @export
 * @interface SchemasJobDonePopulatedResponse
 */
export interface SchemasJobDonePopulatedResponse {
    /**
     * 
     * @type {string}
     * @memberof SchemasJobDonePopulatedResponse
     */
    createdAt: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasJobDonePopulatedResponse
     */
    dayReportUuid: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasJobDonePopulatedResponse
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasJobDonePopulatedResponse
     */
    ownerName: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasJobDonePopulatedResponse
     */
    ownerUuid: string;
    /**
     * 
     * @type {Array<SchemasJobTagResponse>}
     * @memberof SchemasJobDonePopulatedResponse
     */
    tags: Array<SchemasJobTagResponse>;
    /**
     * 
     * @type {number}
     * @memberof SchemasJobDonePopulatedResponse
     */
    time: number;
    /**
     * 
     * @type {string}
     * @memberof SchemasJobDonePopulatedResponse
     */
    updatedAt: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasJobDonePopulatedResponse
     */
    uuid: string;
}

/**
 * Check if a given object implements the SchemasJobDonePopulatedResponse interface.
 */
export function instanceOfSchemasJobDonePopulatedResponse(
    value: object
): boolean {
    let isInstance = true;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "dayReportUuid" in value;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "ownerName" in value;
    isInstance = isInstance && "ownerUuid" in value;
    isInstance = isInstance && "tags" in value;
    isInstance = isInstance && "time" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "uuid" in value;

    return isInstance;
}

export function SchemasJobDonePopulatedResponseFromJSON(json: any): SchemasJobDonePopulatedResponse {
    return SchemasJobDonePopulatedResponseFromJSONTyped(json, false);
}

export function SchemasJobDonePopulatedResponseFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): SchemasJobDonePopulatedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'createdAt': json['createdAt'],
        'dayReportUuid': json['dayReportUuid'],
        'description': json['description'],
        'ownerName': json['ownerName'],
        'ownerUuid': json['ownerUuid'],
        'tags': ((json['tags'] as Array<any>).map(SchemasJobTagResponseFromJSON)),
        'time': json['time'],
        'updatedAt': json['updatedAt'],
        'uuid': json['uuid'],
    };
}


export function SchemasJobDonePopulatedResponseToJSON(value?: SchemasJobDonePopulatedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'createdAt': value.createdAt,
        'dayReportUuid': value.dayReportUuid,
        'description': value.description,
        'ownerName': value.ownerName,
        'ownerUuid': value.ownerUuid,
        'tags': ((value.tags as Array<any>).map(SchemasJobTagResponseToJSON)),
        'time': value.time,
        'updatedAt': value.updatedAt,
        'uuid': value.uuid,
    };
}

