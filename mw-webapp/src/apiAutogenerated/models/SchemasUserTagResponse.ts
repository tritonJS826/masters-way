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
 * @interface SchemasUserTagResponse
 */
export interface SchemasUserTagResponse {
    /**
     * 
     * @type {string}
     * @memberof SchemasUserTagResponse
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasUserTagResponse
     */
    uuid?: string;
}

/**
 * Check if a given object implements the SchemasUserTagResponse interface.
 */
export function instanceOfSchemasUserTagResponse(
    value: object
): boolean {
    let isInstance = true;

    return isInstance;
}

export function SchemasUserTagResponseFromJSON(json: any): SchemasUserTagResponse {
    return SchemasUserTagResponseFromJSONTyped(json, false);
}

export function SchemasUserTagResponseFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): SchemasUserTagResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'uuid': !exists(json, 'uuid') ? undefined : json['uuid'],
    };
}


export function SchemasUserTagResponseToJSON(value?: SchemasUserTagResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'uuid': value.uuid,
    };
}
