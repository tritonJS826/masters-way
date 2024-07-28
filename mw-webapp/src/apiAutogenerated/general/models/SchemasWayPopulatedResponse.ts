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
import type { SchemasDayReportPopulatedResponse } from './SchemasDayReportPopulatedResponse';
import {
    SchemasDayReportPopulatedResponseFromJSON,
    SchemasDayReportPopulatedResponseFromJSONTyped,
    SchemasDayReportPopulatedResponseToJSON,
} from './SchemasDayReportPopulatedResponse';
import type { SchemasJobTagResponse } from './SchemasJobTagResponse';
import {
    SchemasJobTagResponseFromJSON,
    SchemasJobTagResponseFromJSONTyped,
    SchemasJobTagResponseToJSON,
} from './SchemasJobTagResponse';
import type { SchemasMetricResponse } from './SchemasMetricResponse';
import {
    SchemasMetricResponseFromJSON,
    SchemasMetricResponseFromJSONTyped,
    SchemasMetricResponseToJSON,
} from './SchemasMetricResponse';
import type { SchemasUserPlainResponse } from './SchemasUserPlainResponse';
import {
    SchemasUserPlainResponseFromJSON,
    SchemasUserPlainResponseFromJSONTyped,
    SchemasUserPlainResponseToJSON,
} from './SchemasUserPlainResponse';
import type { SchemasWayTagResponse } from './SchemasWayTagResponse';
import {
    SchemasWayTagResponseFromJSON,
    SchemasWayTagResponseFromJSONTyped,
    SchemasWayTagResponseToJSON,
} from './SchemasWayTagResponse';

/**
 * 
 * @export
 * @interface SchemasWayPopulatedResponse
 */
export interface SchemasWayPopulatedResponse {
    /**
     * 
     * @type {Array<SchemasWayPopulatedResponse>}
     * @memberof SchemasWayPopulatedResponse
     */
    children: Array<SchemasWayPopulatedResponse>;
    /**
     * 
     * @type {string}
     * @memberof SchemasWayPopulatedResponse
     */
    copiedFromWayUuid: string | null;
    /**
     * 
     * @type {string}
     * @memberof SchemasWayPopulatedResponse
     */
    createdAt: string;
    /**
     * 
     * @type {Array<SchemasDayReportPopulatedResponse>}
     * @memberof SchemasWayPopulatedResponse
     */
    dayReports: Array<SchemasDayReportPopulatedResponse>;
    /**
     * 
     * @type {number}
     * @memberof SchemasWayPopulatedResponse
     */
    estimationTime: number;
    /**
     * 
     * @type {number}
     * @memberof SchemasWayPopulatedResponse
     */
    favoriteForUsersAmount: number;
    /**
     * 
     * @type {Array<SchemasUserPlainResponse>}
     * @memberof SchemasWayPopulatedResponse
     */
    formerMentors: Array<SchemasUserPlainResponse>;
    /**
     * 
     * @type {string}
     * @memberof SchemasWayPopulatedResponse
     */
    goalDescription: string;
    /**
     * 
     * @type {boolean}
     * @memberof SchemasWayPopulatedResponse
     */
    isCompleted: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SchemasWayPopulatedResponse
     */
    isPrivate: boolean;
    /**
     * 
     * @type {Array<SchemasJobTagResponse>}
     * @memberof SchemasWayPopulatedResponse
     */
    jobTags: Array<SchemasJobTagResponse>;
    /**
     * 
     * @type {Array<SchemasUserPlainResponse>}
     * @memberof SchemasWayPopulatedResponse
     */
    mentorRequests: Array<SchemasUserPlainResponse>;
    /**
     * 
     * @type {Array<SchemasUserPlainResponse>}
     * @memberof SchemasWayPopulatedResponse
     */
    mentors: Array<SchemasUserPlainResponse>;
    /**
     * 
     * @type {Array<SchemasMetricResponse>}
     * @memberof SchemasWayPopulatedResponse
     */
    metrics: Array<SchemasMetricResponse>;
    /**
     * 
     * @type {string}
     * @memberof SchemasWayPopulatedResponse
     */
    name: string;
    /**
     * 
     * @type {SchemasUserPlainResponse}
     * @memberof SchemasWayPopulatedResponse
     */
    owner: SchemasUserPlainResponse;
    /**
     * 
     * @type {string}
     * @memberof SchemasWayPopulatedResponse
     */
    updatedAt: string;
    /**
     * 
     * @type {string}
     * @memberof SchemasWayPopulatedResponse
     */
    uuid: string;
    /**
     * 
     * @type {Array<SchemasWayTagResponse>}
     * @memberof SchemasWayPopulatedResponse
     */
    wayTags: Array<SchemasWayTagResponse>;
}

/**
 * Check if a given object implements the SchemasWayPopulatedResponse interface.
 */
export function instanceOfSchemasWayPopulatedResponse(
    value: object
): boolean {
    let isInstance = true;
    isInstance = isInstance && "children" in value;
    isInstance = isInstance && "copiedFromWayUuid" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "dayReports" in value;
    isInstance = isInstance && "estimationTime" in value;
    isInstance = isInstance && "favoriteForUsersAmount" in value;
    isInstance = isInstance && "formerMentors" in value;
    isInstance = isInstance && "goalDescription" in value;
    isInstance = isInstance && "isCompleted" in value;
    isInstance = isInstance && "isPrivate" in value;
    isInstance = isInstance && "jobTags" in value;
    isInstance = isInstance && "mentorRequests" in value;
    isInstance = isInstance && "mentors" in value;
    isInstance = isInstance && "metrics" in value;
    isInstance = isInstance && "name" in value;
    isInstance = isInstance && "owner" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "uuid" in value;
    isInstance = isInstance && "wayTags" in value;

    return isInstance;
}

export function SchemasWayPopulatedResponseFromJSON(json: any): SchemasWayPopulatedResponse {
    return SchemasWayPopulatedResponseFromJSONTyped(json, false);
}

export function SchemasWayPopulatedResponseFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): SchemasWayPopulatedResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'children': ((json['children'] as Array<any>).map(SchemasWayPopulatedResponseFromJSON)),
        'copiedFromWayUuid': json['copiedFromWayUuid'],
        'createdAt': json['createdAt'],
        'dayReports': ((json['dayReports'] as Array<any>).map(SchemasDayReportPopulatedResponseFromJSON)),
        'estimationTime': json['estimationTime'],
        'favoriteForUsersAmount': json['favoriteForUsersAmount'],
        'formerMentors': ((json['formerMentors'] as Array<any>).map(SchemasUserPlainResponseFromJSON)),
        'goalDescription': json['goalDescription'],
        'isCompleted': json['isCompleted'],
        'isPrivate': json['isPrivate'],
        'jobTags': ((json['jobTags'] as Array<any>).map(SchemasJobTagResponseFromJSON)),
        'mentorRequests': ((json['mentorRequests'] as Array<any>).map(SchemasUserPlainResponseFromJSON)),
        'mentors': ((json['mentors'] as Array<any>).map(SchemasUserPlainResponseFromJSON)),
        'metrics': ((json['metrics'] as Array<any>).map(SchemasMetricResponseFromJSON)),
        'name': json['name'],
        'owner': SchemasUserPlainResponseFromJSON(json['owner']),
        'updatedAt': json['updatedAt'],
        'uuid': json['uuid'],
        'wayTags': ((json['wayTags'] as Array<any>).map(SchemasWayTagResponseFromJSON)),
    };
}


export function SchemasWayPopulatedResponseToJSON(value?: SchemasWayPopulatedResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'children': ((value.children as Array<any>).map(SchemasWayPopulatedResponseToJSON)),
        'copiedFromWayUuid': value.copiedFromWayUuid,
        'createdAt': value.createdAt,
        'dayReports': ((value.dayReports as Array<any>).map(SchemasDayReportPopulatedResponseToJSON)),
        'estimationTime': value.estimationTime,
        'favoriteForUsersAmount': value.favoriteForUsersAmount,
        'formerMentors': ((value.formerMentors as Array<any>).map(SchemasUserPlainResponseToJSON)),
        'goalDescription': value.goalDescription,
        'isCompleted': value.isCompleted,
        'isPrivate': value.isPrivate,
        'jobTags': ((value.jobTags as Array<any>).map(SchemasJobTagResponseToJSON)),
        'mentorRequests': ((value.mentorRequests as Array<any>).map(SchemasUserPlainResponseToJSON)),
        'mentors': ((value.mentors as Array<any>).map(SchemasUserPlainResponseToJSON)),
        'metrics': ((value.metrics as Array<any>).map(SchemasMetricResponseToJSON)),
        'name': value.name,
        'owner': SchemasUserPlainResponseToJSON(value.owner),
        'updatedAt': value.updatedAt,
        'uuid': value.uuid,
        'wayTags': ((value.wayTags as Array<any>).map(SchemasWayTagResponseToJSON)),
    };
}

