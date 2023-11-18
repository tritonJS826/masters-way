/* eslint-disable jsdoc/require-jsdoc */
import {ReactElement} from "react";
import {AboutProjectPage} from "src/logic/aboutProjectPage/AboutProjectPage";
import {AllUsersPage} from "src/logic/allUsersPage/AllUsersPage";
import {AllWaysPage} from "src/logic/allWaysPage/AllWaysPage";
import {Page404} from "src/logic/page404/Page404";
import {UserPage} from "src/logic/userPage/UserPage";
import {UserProfilePage} from "src/logic/userProfilePage/UserProfilePage";
import {WayPage} from "src/logic/wayPage/WayPage";
import {UrlParamsType} from "src/router/PageUrlValidator/UrlParamsType";

export type ParamName = string;
type ParamValue = string;
type EmptyObject = object;
export type PageParams<T extends Record<ParamName, ParamValue> | EmptyObject = EmptyObject> = {

  /**
   * A
   */
  getPath: (params: T) => string;

  /**
   * A
   */
  getPageComponent: (params: T) => ReactElement;

  /**
   * A
   */
  urlParams: Record<keyof T, UrlParamsType> ;
}

/**
 * Create url with appropriate params for @UserPage
 */
const getPathForUserPage = (params: {uuid: string}): string => `/user/${params.uuid}`;

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
    getPath: (params): string => `/way/${params}`,
    // TODO add uuid param
    getPageComponent: () => <WayPage />,
    urlParams: {uuid: UrlParamsType.UUID} as const,
  } as PageParams<{uuid: string}>,
  allUsers: {
    getPath: () => "/users",
    getPageComponent: () => <AllUsersPage />,
    urlParams: {},
  } as PageParams,
  userProfile: {
    getPath: (params): string => `/userProfile/${params}`,
    // TODO add uuid param
    getPageComponent: () => <UserProfilePage />,
    urlParams: {uuid: UrlParamsType.UUID},
  } as PageParams<{uuid: string}>,
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