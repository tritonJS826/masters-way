/* eslint-disable jsdoc/require-jsdoc */
import React, {ReactElement} from "react";
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

const suspended = (lazyNode: React.ReactNode) => (<React.Suspense fallback={null}>
  {lazyNode}
</React.Suspense>);

const HomePageLazy = React.lazy(() => import("src/logic/homePage/HomePage")
  .then((module) => ({default: module.HomePage})));
const HomePage = () => (<>
  <HomePageLazy />
</>);
const AlLWaysPageLazy = React.lazy(() => import("src/logic/allWaysPage/AllWaysPage")
  .then((module) => ({default: module.AllWaysPage})));
const AllWaysPage = () => (<>
  <AlLWaysPageLazy />
</>);
const UserPageLazy = React.lazy(() => import("src/logic/userPage/UserPage")
  .then((module) => ({default: module.UserPage})));
const UserPage = (params: {uuid: string}) => (<>
  <UserPageLazy {...params} />
</>);
const WayPageLazy = React.lazy(() => import("src/logic/wayPage/WayPage")
  .then((module) => ({default: module.WayPage})));
const WayPage = (params: {uuid: string}) => (<>
  <WayPageLazy {...params} />
</>);
const AllUsersPageLazy = React.lazy(() => import("src/logic/allUsersPage/AllUsersPage")
  .then((module) => ({default: module.AllUsersPage})));
const AllUsersPage = () => (<>
  <AllUsersPageLazy />
</>);
const SettingsPageLazy = React.lazy(() => import("src/logic/settingsPage/SettingsPage")
  .then((module) => ({default: module.SettingsPage})));
const SettingsPage = () => (<>
  <SettingsPageLazy />
</>);
const AboutProjectPageLazy = React.lazy(() => import("src/logic/aboutProjectPage/AboutProjectPage")
  .then((module) => ({default: module.AboutProjectPage})));
const AboutProjectPage = () => (<>
  <AboutProjectPageLazy />
</>);
const Page404Lazy = React.lazy(() => import("src/logic/page404/Page404")
  .then((module) => ({default: module.Page404})));
const Page404 = () => (<>
  <Page404Lazy />
</>);
const MentorsLandingPageLazy = React.lazy(() => import("src/land/mentorsLandingPage/MentorsLandingPage")
  .then((module) => ({default: module.MentorsLandingPage})));
const MentorsLandingPage = () => (<>
  <MentorsLandingPageLazy />
</>);

const LandingPageLazy = React.lazy(() => import("src/land/landingPage/LandingPage")
  .then((module) => ({default: module.LandingPage})));
const LandingPage = () => (<>
  <LandingPage />
</>);

/**
 * Pages meta data
 */
export const pages = {
  home: {
    getPath: () => "/",
    getPageComponent: () => suspended(<HomePage />),
    urlParams: {},
  } as PageParams,
  allWays: {
    getPath: () => "/ways",
    getPageComponent: () => suspended(<AllWaysPage />),
    urlParams: {},
  } as PageParams,
  user: {
    getPath: (params): string => getPathForUserPage({uuid: params.uuid}),
    getPageComponent: (params) => suspended(<UserPage {...params} />),
    urlParams: {uuid: UrlParamsType.UUID} as const,
  } as PageParams<{uuid: string}>,
  way: {
    getPath: (params): string => getPathForWayPage({uuid: params.uuid}),
    getPageComponent: (params) => suspended(<WayPage {...params} />),
    urlParams: {uuid: UrlParamsType.UUID} as const,
  } as PageParams<{uuid: string}>,
  allUsers: {
    getPath: () => "/users",
    getPageComponent: () => suspended(<AllUsersPage />),
    urlParams: {},
  } as PageParams,
  settings: {
    getPath: () => "/settings",
    getPageComponent: () => suspended(<SettingsPage />),
    urlParams: {},
  } as PageParams,
  aboutProject: {
    getPath: () => "/aboutProject",
    getPageComponent: () => suspended(<AboutProjectPage />),
    urlParams: {},
  } as PageParams,
  landing: {
    getPath: () => "/land",
    getPageComponent: () => suspended(<LandingPageLazy />),
    urlParams: {},
  } as PageParams,
  landingMentors: {
    getPath: () => "/land/mentors",
    getPageComponent: () => suspended(<MentorsLandingPage />),
    urlParams: {},
  } as PageParams,
  page404: {
    getPath: () => "*",
    getPageComponent: () => suspended(<Page404 />),
    urlParams: {},
  } as PageParams,
};
