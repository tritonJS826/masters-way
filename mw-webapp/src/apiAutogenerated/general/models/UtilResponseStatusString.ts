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
 * @interface UtilResponseStatusString
 */
export interface UtilResponseStatusString {
    /**
     * 
     * @type {string}
     * @memberof UtilResponseStatusString
     */
    status: string;
}

/**
 * Check if a given object implements the UtilResponseStatusString interface.
 */
export function instanceOfUtilResponseStatusString(
    value: object
): boolean {
    let isInstance = true;
    isInstance = isInstance && "status" in value;

    return isInstance;
}

export function UtilResponseStatusStringFromJSON(json: any): UtilResponseStatusString {
    return UtilResponseStatusStringFromJSONTyped(json, false);
}

export function UtilResponseStatusStringFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): UtilResponseStatusString {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'status': json['status'],
    };
}


export function UtilResponseStatusStringToJSON(value?: UtilResponseStatusString | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'status': value.status,
    };
}

