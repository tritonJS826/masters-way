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
import type { SchemasWayCollectionPopulatedResponse } from './SchemasWayCollectionPopulatedResponse';
import {
    SchemasWayCollectionPopulatedResponseFromJSON,
    SchemasWayCollectionPopulatedResponseFromJSONTyped,
    SchemasWayCollectionPopulatedResponseToJSON,
} from './SchemasWayCollectionPopulatedResponse';

/**
 * 
 * @export
 * @interface SchemasDefaultWayCollections
 */
export interface SchemasDefaultWayCollections {
    /**
     * 
     * @type {SchemasWayCollectionPopulatedResponse}
     * @memberof SchemasDefaultWayCollections
     */
    favorite: SchemasWayCollectionPopulatedResponse;
    /**
     * 
     * @type {SchemasWayCollectionPopulatedResponse}
     * @memberof SchemasDefaultWayCollections
     */
    mentoring: SchemasWayCollectionPopulatedResponse;
    /**
     * 
     * @type {SchemasWayCollectionPopulatedResponse}
     * @memberof SchemasDefaultWayCollections
     */
    own: SchemasWayCollectionPopulatedResponse;
}

/**
 * Check if a given object implements the SchemasDefaultWayCollections interface.
 */
export function instanceOfSchemasDefaultWayCollections(
    value: object
): boolean {
    let isInstance = true;
    isInstance = isInstance && "favorite" in value;
    isInstance = isInstance && "mentoring" in value;
    isInstance = isInstance && "own" in value;

    return isInstance;
}

export function SchemasDefaultWayCollectionsFromJSON(json: any): SchemasDefaultWayCollections {
    return SchemasDefaultWayCollectionsFromJSONTyped(json, false);
}

export function SchemasDefaultWayCollectionsFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): SchemasDefaultWayCollections {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'favorite': SchemasWayCollectionPopulatedResponseFromJSON(json['favorite']),
        'mentoring': SchemasWayCollectionPopulatedResponseFromJSON(json['mentoring']),
        'own': SchemasWayCollectionPopulatedResponseFromJSON(json['own']),
    };
}


export function SchemasDefaultWayCollectionsToJSON(value?: SchemasDefaultWayCollections | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'favorite': SchemasWayCollectionPopulatedResponseToJSON(value.favorite),
        'mentoring': SchemasWayCollectionPopulatedResponseToJSON(value.mentoring),
        'own': SchemasWayCollectionPopulatedResponseToJSON(value.own),
    };
}

