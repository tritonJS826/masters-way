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
import type { SchemasUserPlainResponse } from './SchemasUserPlainResponse';
import {
    SchemasUserPlainResponseFromJSON,
    SchemasUserPlainResponseFromJSONTyped,
    SchemasUserPlainResponseToJSON,
} from './SchemasUserPlainResponse';

/**
 * 
 * @export
 * @interface SchemasCommentPlainResponse
 */
export interface SchemasCommentPlainResponse {
    /**
     * 
     * @type {string}
     * @memberof SchemasCommentPlainResponse
     */
    description: string;
    /**
     * 
     * @type {SchemasUserPlainResponse}
     * @memberof SchemasCommentPlainResponse
     */
    owner: SchemasUserPlainResponse;
}

/**
 * Check if a given object implements the SchemasCommentPlainResponse interface.
 */
export function instanceOfSchemasCommentPlainResponse(
    value: object
): boolean {
    let isInstance = true;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "owner" in value;

    return isInstance;
}

export function SchemasCommentPlainResponseFromJSON(json: any): SchemasCommentPlainResponse {
    return SchemasCommentPlainResponseFromJSONTyped(json, false);
}

export function SchemasCommentPlainResponseFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): SchemasCommentPlainResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'description': json['description'],
        'owner': SchemasUserPlainResponseFromJSON(json['owner']),
    };
}


export function SchemasCommentPlainResponseToJSON(value?: SchemasCommentPlainResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'description': value.description,
        'owner': SchemasUserPlainResponseToJSON(value.owner),
    };
}
