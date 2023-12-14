/* eslint-disable jsdoc/require-jsdoc */
import {ReactElement} from "react";
import {AboutProjectPage} from "src/logic/aboutProjectPage/AboutProjectPage";
import {AllUsersPage} from "src/logic/allUsersPage/AllUsersPage";
import {AllWaysPage} from "src/logic/allWaysPage/AllWaysPage";
import {Page404} from "src/logic/page404/Page404";
import {UserPage} from "src/logic/userPage/UserPage";
import {WayPage} from "src/logic/wayPage/WayPage";
import {UrlParamsType} from "src/router/PageUrlValidator/UrlParamsType";

export type ParamName = string;
type ParamValue = string;
type EmptyObject = object;
export type PageParams<T extends Record<ParamName, ParamValue> | EmptyObject = EmptyObject> = {

  /**
   * Page's path
   */
  getPath: (params: T) => string;

  /**
   * Page's component
   */
  getPageComponent: (params: T) => ReactElement;

  /**
   * Page's query params
   */
  urlParams: Record<keyof T, UrlParamsType> ;
}

/**
 * Create url with appropriate params for @UserPage
 */
const getPathForUserPage = (params: { uuid: string }): string => `/user/${params.uuid}`;

/**
 * Create url with appropriate params for @WayPage
 */
const getPathForWayPage = (params: {uuid: string}): string => `/way/${params.uuid}`;

/**
 * Pages meta data
 */
export const pages = {
  allWays: {
    getPath: () => "/",
    getPageComponent: () => <AllWaysPage />,
    urlParams: {},
  } as PageParams,
  user: {
    getPath: (params): string => getPathForUserPage({uuid: params.uuid}),
    getPageComponent: (params) => <UserPage {...params} />,
    urlParams: {uuid: UrlParamsType.UUID} as const,
  } as PageParams<{uuid: string}>,
  way: {
    getPath: (params): string => getPathForWayPage({uuid: params.uuid}),
    getPageComponent: (params) => <WayPage {...params} />,
    urlParams: {uuid: UrlParamsType.UUID} as const,
  } as PageParams<{uuid: string}>,
  allUsers: {
    getPath: () => "/users",
    getPageComponent: () => <AllUsersPage />,
    urlParams: {},
  } as PageParams,
  aboutProject: {
    getPath: () => "/aboutProject",
    getPageComponent: () => <AboutProjectPage />,
    urlParams: {},
  } as PageParams,
  page404: {
    getPath: () => "*",
    getPageComponent: () => <Page404 />,
    urlParams: {},
  } as PageParams,
};
