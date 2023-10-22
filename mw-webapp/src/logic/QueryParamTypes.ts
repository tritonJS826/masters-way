import {Params} from "react-router-dom";

/**
 * Query param types
 */
export interface QueryParamTypes extends Params {

  /**
   * User's uuid
   */
  uuid: string;
}