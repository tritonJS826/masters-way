/**
 * @export
 * @interface SchemasHealthCheckResponse
 */
export interface SchemasHealthCheckResponse {
    /**
     * 
     * @type {string}
     * @memberof SchemasHealthCheckResponse
     */
    message: string;
}

/**
 * Check if a given object implements the SchemasHealthCheckResponse interface
 */
export function instanceOfSchemasHealthCheckResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "message" in value;
    return isInstance;
}

export function SchemasHealthCheckResponseFromJSON(json: any): SchemasHealthCheckResponse {
    return SchemasHealthCheckResponseFromJSONTyped(json, false);
}

export function SchemasHealthCheckResponseFromJSONTyped(
    json: any,
    ignoreDiscriminator: boolean
): SchemasHealthCheckResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'message': json['message'],
    };
}