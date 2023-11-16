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

export type PageParams = {

  /**
   * A
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPath: (params?: any) => string;

  /**
   * A
   */
  pageComponent: ReactElement;

  /**
   * A
   */
  urlParams: Record<string, UrlParamsType>;
}

/**
 * Create url with appropriate params for @UserPage
 */
const getPathForUserPage = (params: {uuid: string}): string => `/user/${params.uuid}`;

/**
 * Pages meta data
 */
export const pages: Record<string, PageParams> = {
  allWays: {

    /**
     * A
     */
    getPath: () => "/",
    pageComponent: <AllWaysPage />,
    urlParams: {},
  },
  user: {
    getPath: getPathForUserPage,
    pageComponent: <UserPage uuid={""} />,
    urlParams: {uuid: UrlParamsType.UUID},
  },
  way: {

    /**
     * @param {string} uuid Could be param name (if we want to create new path) OR could be way uuid.
     * @returns {string} path to react-router OR Specific URl path to specific way
     */
    getPath: (uuid: string): string => `/way/${uuid}`,
    pageComponent: <WayPage />,
    urlParams: {uuid: UrlParamsType.UUID},
  },
  allUsers: {
    getPath: () => "/users",
    pageComponent: <AllUsersPage />,
    urlParams: {},
  },
  userProfile: {

    /**
     * @param {string} uuid Could be param name (if we want to create new path) OR could be userProfile uuid.
     * @returns {string} path to react-router OR Specific URl path to specific userProfile
     */
    getPath: (uuid: string): string => `/userProfile/${uuid}`,
    pageComponent: <UserProfilePage />,
    urlParams: {uuid: UrlParamsType.UUID},
  },
  aboutProject: {
    getPath: () => "/aboutProject",
    pageComponent: <AboutProjectPage />,
    urlParams: {},
  },
  page404: {
    getPath: () => "*",
    pageComponent: <Page404 />,
    urlParams: {},
  },
};