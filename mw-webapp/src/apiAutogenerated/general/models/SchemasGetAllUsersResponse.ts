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
import type { SchemasUserPlainResponseWithInfo } from './SchemasUserPlainResponseWithInfo';
import {
    SchemasUserPlainResponseWithInfoFromJSON,
    SchemasUserPlainResponseWithInfoFromJSONTyped,
    SchemasUserPlainResponseWithInfoToJSON,
} from './SchemasUserPlainResponseWithInfo';

/**
 * 
 * @export
 * @interface SchemasGetAllUsersResponse
 */
export interface SchemasGetAllUsersResponse {
    /**
     * 
     * @type {number}
     * @memberof SchemasGetAllUsersResponse
     */
    size: number;
    /**
     * 
     * @type {Array<SchemasUserPlainResponseWithInfo>}
     * @memberof SchemasGetAllUsersResponse
     */
    users: Array<SchemasUserPlainResponseWithInfo>;
}

/**
 * Check if a given object implements the SchemasGetAllUsersResponse interface.
 */
export function instanceOfSchemasGetAllUsersResponse(
    value: object
): boolean {
    let isInstance = true;
    isInstance = isInstance && "size" in value;
    isInstance = isInstance && "users" in value;

    return isInstance;
}

export function SchemasGetAllUsersResponseFromJSON(json: any): SchemasGetAllUsersResponse {
    return SchemasGetAllUsersResponseFromJSONTyped(json, false);
}

export function SchemasGetAllUsersResponseFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): SchemasGetAllUsersResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'size': json['size'],
        'users': ((json['users'] as Array<any>).map(SchemasUserPlainResponseWithInfoFromJSON)),
    };
}


export function SchemasGetAllUsersResponseToJSON(value?: SchemasGetAllUsersResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'size': value.size,
        'users': ((value.users as Array<any>).map(SchemasUserPlainResponseWithInfoToJSON)),
    };
}

