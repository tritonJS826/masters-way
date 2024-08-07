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
 * @interface SchemasCompositeWayRelation
 */
export interface SchemasCompositeWayRelation {
    /**
     * 
     * @type {string}
     * @memberof SchemasCompositeWayRelation
     */
    childWayUuid: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasCompositeWayRelation
     */
    parentWayUuid: string;
}

/**
 * Check if a given object implements the SchemasCompositeWayRelation interface.
 */
export function instanceOfSchemasCompositeWayRelation(
    value: object
): boolean {
    let isInstance = true;
    isInstance = isInstance && "childWayUuid" in value;
    isInstance = isInstance && "parentWayUuid" in value;

    return isInstance;
}

export function SchemasCompositeWayRelationFromJSON(json: any): SchemasCompositeWayRelation {
    return SchemasCompositeWayRelationFromJSONTyped(json, false);
}

export function SchemasCompositeWayRelationFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): SchemasCompositeWayRelation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'childWayUuid': json['childWayUuid'],
        'parentWayUuid': json['parentWayUuid'],
    };
}


export function SchemasCompositeWayRelationToJSON(value?: SchemasCompositeWayRelation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'childWayUuid': value.childWayUuid,
        'parentWayUuid': value.parentWayUuid,
    };
}

