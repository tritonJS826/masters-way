/* eslint-disable jsdoc/require-jsdoc */
import {ReactElement} from "react";
import {Params} from "react-router-dom";
import {AboutProjectPage} from "src/logic/aboutProjectPage/AboutProjectPage";
import {AllUsersPage} from "src/logic/allUsersPage/AllUsersPage";
import {AllWaysPage} from "src/logic/allWaysPage/AllWaysPage";
import {Page404} from "src/logic/page404/Page404";
import {UserPage} from "src/logic/userPage/UserPage";
import {UserProfilePage} from "src/logic/userProfilePage/UserProfilePage";
import {WayPage} from "src/logic/wayPage/WayPage";
import {UrlParamsType} from "src/router/PageUrlValidator/UrlParamsType";

export type PageParams = {

  /**
   * A
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPath: (params?: any) => string;

  /**
   * A
   */
  getPageComponent: (params: Readonly<Params<string>>) => ReactElement;

  /**
   * A
   */
  urlParams: Record<string, UrlParamsType>;
}

/**
 * Create url with appropriate params for @UserPage
 */
// const getPathForUserPage = (params: {uuid: string}): string => `/user/${params.uuid}`;

/**
 * Pages meta data
 */
export const pages: Record<string, PageParams> = {
  allWays: {
    getPath: () => "/",
    getPageComponent: () => <AllWaysPage />,
    urlParams: {},
  },
  user: {
    getPath: (uuid: string): string => `/user/${uuid}`,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    getPageComponent: (params: Readonly<Params<string>>) => <UserPage uuid={params.uuid!} />,
    urlParams: {uuid: UrlParamsType.UUID},
  },
  way: {
    getPath: (uuid: string): string => `/way/${uuid}`,
    getPageComponent: () => <WayPage />,
    urlParams: {uuid: UrlParamsType.UUID},
  },
  allUsers: {
    getPath: () => "/users",
    getPageComponent: () => <AllUsersPage />,
    urlParams: {},
  },
  userProfile: {
    getPath: (uuid: string): string => `/userProfile/${uuid}`,
    getPageComponent: () => <UserProfilePage />,
    urlParams: {uuid: UrlParamsType.UUID},
  },
  aboutProject: {
    getPath: () => "/aboutProject",
    getPageComponent: () => <AboutProjectPage />,
    urlParams: {},
  },
  page404: {
    getPath: () => "*",
    getPageComponent: () => <Page404 />,
    urlParams: {},
  },
};