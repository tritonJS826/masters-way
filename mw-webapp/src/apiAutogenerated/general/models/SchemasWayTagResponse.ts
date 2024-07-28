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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface SchemasWayTagResponse
 */
export interface SchemasWayTagResponse {
    /**
     * 
     * @type {string}
     * @memberof SchemasWayTagResponse
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasWayTagResponse
     */
    uuid: string;
}

/**
 * Check if a given object implements the SchemasWayTagResponse interface.
 */
export function instanceOfSchemasWayTagResponse(
    value: object
): boolean {
    let isInstance = true;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "uuid" in value;

    return isInstance;
}

export function SchemasWayTagResponseFromJSON(json: any): SchemasWayTagResponse {
    return SchemasWayTagResponseFromJSONTyped(json, false);
}

export function SchemasWayTagResponseFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): SchemasWayTagResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': json['name'],
        'uuid': json['uuid'],
    };
}


export function SchemasWayTagResponseToJSON(value?: SchemasWayTagResponse | null): any {
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

