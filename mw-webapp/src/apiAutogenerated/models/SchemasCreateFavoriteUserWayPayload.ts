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
 * @interface SchemasCreateFavoriteUserWayPayload
 */
export interface SchemasCreateFavoriteUserWayPayload {
    /**
     * 
     * @type {string}
     * @memberof SchemasCreateFavoriteUserWayPayload
     */
    userUuid: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasCreateFavoriteUserWayPayload
     */
    wayUuid: string;
}

/**
 * Check if a given object implements the SchemasCreateFavoriteUserWayPayload interface.
 */
export function instanceOfSchemasCreateFavoriteUserWayPayload(
    value: object
): boolean {
    let isInstance = true;
    isInstance = isInstance && "userUuid" in value;
    isInstance = isInstance && "wayUuid" in value;

    return isInstance;
}

export function SchemasCreateFavoriteUserWayPayloadFromJSON(json: any): SchemasCreateFavoriteUserWayPayload {
    return SchemasCreateFavoriteUserWayPayloadFromJSONTyped(json, false);
}

export function SchemasCreateFavoriteUserWayPayloadFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): SchemasCreateFavoriteUserWayPayload {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'userUuid': json['userUuid'],
        'wayUuid': json['wayUuid'],
    };
}


export function SchemasCreateFavoriteUserWayPayloadToJSON(value?: SchemasCreateFavoriteUserWayPayload | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'userUuid': value.userUuid,
        'wayUuid': value.wayUuid,
    };
}

