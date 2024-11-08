/* eslint-disable jsdoc/require-jsdoc */
import React, {ReactElement} from "react";
import { ErrorPage } from "src/logic/errorPage/ErrorPage";
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
const getPathForWayPage = (params: { uuid: string }): string => `/way/${params.uuid}`;

/**
 * Create url with appropriate params for @ProjectPage
 */
const getPathForProjectPage = (params: {uuid: string}): string => `/project/${params.uuid}`;

const suspended = (lazyNode: React.ReactNode) => (<React.Suspense fallback={null}>
  {lazyNode}
</React.Suspense>);

const HomePageLazy = React.lazy(() => import("src/logic/homePage/HomePage")
  .then((module) => ({default: module.HomePage})));
const HomePage = () => (<>
  <HomePageLazy />
</>);
const PricingPageLazy = React.lazy(() => import("src/logic/pricingPage/PricingPage")
  .then((module) => ({default: module.PricingPage})));
const PricingPage = () => (<>
  <PricingPageLazy />
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
const ProjectPageLazy = React.lazy(() => import("src/logic/projectPage/ProjectPage")
  .then((module) => ({default: module.ProjectPage})));
const ProjectPage = (params: {uuid: string}) => (<>
  <ProjectPageLazy {...params} />
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
const ErrorPageLazy = React.lazy(() => import("src/logic/errorPage/ErrorPage")
  .then((module) => ({default: module.ErrorPage})));
const errorPage = () => (<>
  <ErrorPageLazy />
</>);
const PrivacyPolicyPageLazy = React.lazy(() => import("src/logic/privacyPolicyPage/PrivacyPolicyPage")
  .then((module) => ({default: module.PrivacyPolicyPage})));
const PrivacyPolicyPage = () => (<>
  <PrivacyPolicyPageLazy />
</>);

const LandingsPageLazy = React.lazy(() => import("src/land/allLandingsPage/AllLandingsPage")
  .then((module) => ({default: module.LandingsPage})));
const LandingsPage = () => (<>
  <LandingsPage />
</>);

const MentorsLandingPageLazy = React.lazy(() => import("src/land/landings/mentorsLandingPage/MentorsLandingPage")
  .then((module) => ({default: module.MentorsLandingPage})));
const MentorsLandingPage = () => (<>
  <MentorsLandingPageLazy />
</>);

const StudentsWithMentorsLandingPageLazy = React.lazy(() => import(
  "src/land/landings/studentsWithMentorsLandingPage/StudentsWithMentorsLandingPage"
)
  .then((module) => ({default: module.StudentsWithMentorsLandingPage})));
const StudentsWithMentorsLandingPage = () => (<>
  <StudentsWithMentorsLandingPageLazy />
</>);

const StudentsWithAILandingPageLazy = React.lazy(() => import(
  "src/land/landings/studentsWithAiLandingPage/StudentsWithAILandingPage"
)
  .then((module) => ({default: module.StudentsWithAILandingPage})));
const StudentsWithAILandingPage = () => (<>
  <StudentsWithAILandingPageLazy />
</>);

const SmallBusinessLandingPageLazy = React.lazy(() => import("src/land/landings/businessLandingPage/BusinessLandingPage")
  .then((module) => ({default: module.BusinessLandingPage})));
const SmallBusinessLandingPage = () => (<>
  <SmallBusinessLandingPageLazy />
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
  pricing: {
    getPath: () => "/pricing",
    getPageComponent: () => suspended(<PricingPage />),
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
  } as PageParams<{ uuid: string }>,
  project: {
    getPath: (params): string => getPathForProjectPage({uuid: params.uuid}),
    getPageComponent: (params) => suspended(<ProjectPage {...params} />),
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
  privacyPolicy: {
    getPath: () => "/privacyPolicy",
    getPageComponent: () => suspended(<PrivacyPolicyPage />),
    urlParams: {},
  } as PageParams,
  landings: {
    getPath: () => "/land",
    getPageComponent: () => suspended(<LandingsPageLazy />),
    urlParams: {},
  } as PageParams,
  landingMentors: {
    getPath: () => "/land/mentors",
    getPageComponent: () => suspended(<MentorsLandingPage />),
    urlParams: {},
  } as PageParams,
  landingStudentsWithMentors: {
    getPath: () => "/land/studentsWithMentors",
    // TODO
    getPageComponent: () => suspended(<StudentsWithMentorsLandingPage />),
    urlParams: {},
  } as PageParams,
  landingStudentsWithAI: {
    getPath: () => "/land/studentsWithAI",
    // TODO
    getPageComponent: () => suspended(<StudentsWithAILandingPage />),
    urlParams: {},
  } as PageParams,
  landingBusiness: {
    getPath: () => "/land/business",
    // TODO
    getPageComponent: () => suspended(<SmallBusinessLandingPage />),
    urlParams: {},
  } as PageParams,
  errorPage: {
    getPath: () => "*",
    getPageComponent: () => suspended(<ErrorPage />),
    urlParams: {},
  } as PageParams,
};

/**
 * Independent of server
 */
export const INDEPENDENT_ROUTES = [
  pages.landings.getPath({}),
  pages.landingMentors.getPath({}),
  pages.landingStudentsWithMentors.getPath({}),
  pages.landingStudentsWithAI.getPath({}),
  pages.landingBusiness.getPath({}),
  pages.aboutProject.getPath({}),
  pages.home.getPath({}),
  pages.privacyPolicy.getPath({}),
];
