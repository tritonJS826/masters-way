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
 * @interface SchemasCreateWay
 */
export interface SchemasCreateWay {
    /**
     * 
     * @type {string}
     * @memberof SchemasCreateWay
     */
    copiedFromWayUuid: string;
    /**
     * 
     * @type {number}
     * @memberof SchemasCreateWay
     */
    estimationTime: number;
    /**
     * 
     * @type {string}
     * @memberof SchemasCreateWay
     */
    goalDescription: string;
    /**
     * 
     * @type {boolean}
     * @memberof SchemasCreateWay
     */
    isPrivate: boolean;
    /**
     * 
     * @type {string}
     * @memberof SchemasCreateWay
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasCreateWay
     */
    ownerUuid: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasCreateWay
     */
    status: string;
}

/**
 * Check if a given object implements the SchemasCreateWay interface.
 */
export function instanceOfSchemasCreateWay(
    value: object
): boolean {
    let isInstance = true;
    isInstance = isInstance && "copiedFromWayUuid" in value;
    isInstance = isInstance && "estimationTime" in value;
    isInstance = isInstance && "goalDescription" in value;
    isInstance = isInstance && "isPrivate" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "ownerUuid" in value;
    isInstance = isInstance && "status" in value;

    return isInstance;
}

export function SchemasCreateWayFromJSON(json: any): SchemasCreateWay {
    return SchemasCreateWayFromJSONTyped(json, false);
}

export function SchemasCreateWayFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): SchemasCreateWay {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'copiedFromWayUuid': json['copiedFromWayUuid'],
        'estimationTime': json['estimationTime'],
        'goalDescription': json['goalDescription'],
        'isPrivate': json['isPrivate'],
        'name': json['name'],
        'ownerUuid': json['ownerUuid'],
        'status': json['status'],
    };
}


export function SchemasCreateWayToJSON(value?: SchemasCreateWay | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'copiedFromWayUuid': value.copiedFromWayUuid,
        'estimationTime': value.estimationTime,
        'goalDescription': value.goalDescription,
        'isPrivate': value.isPrivate,
        'name': value.name,
        'ownerUuid': value.ownerUuid,
        'status': value.status,
    };
}

