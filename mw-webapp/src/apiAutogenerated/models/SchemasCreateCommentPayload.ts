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
 * @interface SchemasCreateCommentPayload
 */
export interface SchemasCreateCommentPayload {
    /**
     * 
     * @type {string}
     * @memberof SchemasCreateCommentPayload
     */
    dayReportUuid: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasCreateCommentPayload
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasCreateCommentPayload
     */
    ownerUuid: string;
}

/**
 * Check if a given object implements the SchemasCreateCommentPayload interface.
 */
export function instanceOfSchemasCreateCommentPayload(
    value: object
): boolean {
    let isInstance = true;
    isInstance = isInstance && "dayReportUuid" in value;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "ownerUuid" in value;

    return isInstance;
}

export function SchemasCreateCommentPayloadFromJSON(json: any): SchemasCreateCommentPayload {
    return SchemasCreateCommentPayloadFromJSONTyped(json, false);
}

export function SchemasCreateCommentPayloadFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): SchemasCreateCommentPayload {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'dayReportUuid': json['dayReportUuid'],
        'description': json['description'],
        'ownerUuid': json['ownerUuid'],
    };
}


export function SchemasCreateCommentPayloadToJSON(value?: SchemasCreateCommentPayload | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'dayReportUuid': value.dayReportUuid,
        'description': value.description,
        'ownerUuid': value.ownerUuid,
    };
}

