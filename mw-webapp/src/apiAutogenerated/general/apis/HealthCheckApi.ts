import * as runtime from "../runtime";

import type { SchemasHealthCheckResponse } from "../models/index";
import {
  SchemasHealthCheckResponseFromJSON,
} from "../models/index";

export class HealthCheckApi extends runtime.BaseAPI {
  async getHealthCheckRaw(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<runtime.ApiResponse<SchemasHealthCheckResponse>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    const response = await this.request(
      {
        path: `/healthcheckq`,
        method: "GET",
        headers: headerParameters,
        query: queryParameters,
      },
      initOverrides
    );

    return new runtime.JSONApiResponse(response, (jsonValue) =>
      SchemasHealthCheckResponseFromJSON(jsonValue)
    );
  }

  async getHealthCheck(
    initOverrides?: RequestInit | runtime.InitOverrideFunction
  ): Promise<SchemasHealthCheckResponse> {
    const response = await this.getHealthCheckRaw(initOverrides);
    return await response.value();
  }
}
