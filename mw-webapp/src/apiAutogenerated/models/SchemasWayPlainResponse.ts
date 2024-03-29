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
/**
 * 
 * @export
 * @interface SchemasWayPlainResponse
 */
export interface SchemasWayPlainResponse {
    /**
     * 
     * @type {string}
     * @memberof SchemasWayPlainResponse
     */
    copiedFromWayUuid: string | null;
    /**
     * 
     * @type {string}
     * @memberof SchemasWayPlainResponse
     */
    createdAt: string;
    /**
     * 
     * @type {number}
     * @memberof SchemasWayPlainResponse
     */
    estimationTime: number;
    /**
     * 
     * @type {string}
     * @memberof SchemasWayPlainResponse
     */
    goalDescription: string;
    /**
     * 
     * @type {boolean}
     * @memberof SchemasWayPlainResponse
     */
    isPrivate: boolean;
    /**
     * 
     * @type {string}
     * @memberof SchemasWayPlainResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasWayPlainResponse
     */
    ownerUuid: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasWayPlainResponse
     */
    status: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasWayPlainResponse
     */
    updatedAt: string;
}

/**
 * Check if a given object implements the SchemasWayPlainResponse interface.
 */
export function instanceOfSchemasWayPlainResponse(
    value: object
): boolean {
    let isInstance = true;
    isInstance = isInstance && "copiedFromWayUuid" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "estimationTime" in value;
    isInstance = isInstance && "goalDescription" in value;
    isInstance = isInstance && "isPrivate" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "ownerUuid" in value;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "updatedAt" in value;

    return isInstance;
}

export function SchemasWayPlainResponseFromJSON(json: any): SchemasWayPlainResponse {
    return SchemasWayPlainResponseFromJSONTyped(json, false);
}

export function SchemasWayPlainResponseFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): SchemasWayPlainResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'copiedFromWayUuid': json['copiedFromWayUuid'],
        'createdAt': json['createdAt'],
        'estimationTime': json['estimationTime'],
        'goalDescription': json['goalDescription'],
        'isPrivate': json['isPrivate'],
        'name': json['name'],
        'ownerUuid': json['ownerUuid'],
        'status': json['status'],
        'updatedAt': json['updatedAt'],
    };
}


export function SchemasWayPlainResponseToJSON(value?: SchemasWayPlainResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'copiedFromWayUuid': value.copiedFromWayUuid,
        'createdAt': value.createdAt,
        'estimationTime': value.estimationTime,
        'goalDescription': value.goalDescription,
        'isPrivate': value.isPrivate,
        'name': value.name,
        'ownerUuid': value.ownerUuid,
        'status': value.status,
        'updatedAt': value.updatedAt,
    };
}

