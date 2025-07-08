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
const getPathForWayPage = (params: { uuid: string }): string => `/way/${params.uuid}`;

/**
 * Create url with appropriate params for @TrainingPage
 */
const getPathForTrainingPage = (params: { uuid: string }): string => `/training/${params.uuid}`;

/**
 * Create url with appropriate params for @TopicPage
 */
const getPathForTopicPage = (params: { trainingUuid: string; topicUuid: string }): string =>
  `/training/${params.trainingUuid}/topic/${params.topicUuid}`;

/**
 * Create url with appropriate params for @ProjectPage
 */
const getPathForProjectPage = (params: {uuid: string}): string => `/project/${params.uuid}`;

/**
 * Create url with appropriate params for @LobbyTestPage
 */
const getPathForLobbyTestPage = (params: {uuid: string}): string => `/lobbyTest/${params.uuid}`;

/**
 * Create url with appropriate params for @EditTestPage
 */
const getPathForEditTestPage = (params: {uuid: string}): string => `/editTest/${params.uuid}`;

/**
 * Create url with appropriate params for @RunningTestPage
 */
const getPathForRunningTestPage = (params: {testUuid: string; sessionUuid: string; isGameMode: boolean}): string =>
  `/runningTest/${params.testUuid}/session/${params.sessionUuid}`;

// /**
//  * Create url with appropriate params for @GameTestPage
//  */
// const getPathForGameTestPage = (params: {testUuid: string; sessionUuid: string}): string =>
//   `/gameTest/${params.testUuid}/session/${params.sessionUuid}`;

/**
 * Create url with appropriate params for @ResultTestPage
 */
const getPathForResultTestPage = (params: { testUuid: string; sessionUuid: string }): string =>
  `/resultTest/${params.testUuid}/session/${params.sessionUuid}`;

const suspended = (lazyNode: React.ReactNode) => (<React.Suspense fallback={null}>
  {lazyNode}
</React.Suspense>);

const HomePageLazy = React.lazy(() => import("src/logic/staticPages/homePage/HomePage")
  .then((module) => ({default: module.HomePage})));
const HomePage = () => (<>
  <HomePageLazy />
</>);

// Const GamePageLazy = React.lazy(() => import("src/logic/gamePage/GamePage")
//   .then((module) => ({default: module.GamePage})));
// const GamePage = (params: {testUuid: string; sessionUuid: string; isGameMode: boolean}) => (<>
//   <GamePageLazy {...params} />
// </>);

const PricingPageLazy = React.lazy(() => import("src/logic/staticPages/pricingPage/PricingPage")
  .then((module) => ({default: module.PricingPage})));
const PricingPage = () => (<>
  <PricingPageLazy />
</>);

const AllWaysPageLazy = React.lazy(() => import("src/logic/allWaysPage/AllWaysPage")
  .then((module) => ({default: module.AllWaysPage})));
const AllWaysPage = () => (<>
  <AllWaysPageLazy />
</>);

const AllTrainingsPageLazy = React.lazy(() => import("src/logic/allTrainingsPage/AllTrainingsPage")
  .then((module) => ({default: module.AllTrainingsPage})));
const AllTrainingsPage = () => (<>
  <AllTrainingsPageLazy />
</>);

const AllTestsPageLazy = React.lazy(() => import("src/logic/allTestsPage/AllTestsPage")
  .then((module) => ({default: module.AllTestsPage})));
const AllTestsPage = () => (<>
  <AllTestsPageLazy />
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

const TrainingPageLazy = React.lazy(() => import("src/logic/trainingPage/TrainingPage")
  .then((module) => ({default: module.TrainingPage})));
const TrainingPage = (params: {uuid: string}) => (<>
  <TrainingPageLazy {...params} />
</>);

const ProjectPageLazy = React.lazy(() => import("src/logic/projectPage/ProjectPage")
  .then((module) => ({default: module.ProjectPage})));
const ProjectPage = (params: {uuid: string}) => (<>
  <ProjectPageLazy {...params} />
</>);

const TopicPageLazy = React.lazy(() => import("src/logic/topicPage/TopicPage")
  .then((module) => ({default: module.TopicPage})));
const TopicPage = (params: {trainingUuid: string; topicUuid: string}) => (<>
  <TopicPageLazy {...params} />
</>);

const LobbyTestPageLazy = React.lazy(() => import("src/logic/lobbyTestPage/LobbyTestPage")
  .then((module) => ({default: module.LobbyTestPage})));
const LobbyTestPage = (params: {uuid: string}) => (<>
  <LobbyTestPageLazy {...params} />
</>);

const EditTestPageLazy = React.lazy(() => import("src/logic/editTestPage/EditTestPage")
  .then((module) => ({default: module.EditTestPage})));
const EditTestPage = (params: {uuid: string}) => (<>
  <EditTestPageLazy {...params} />
</>);

const RunningTestPageLazy = React.lazy(() => import("src/logic/runningTestPage/RunningTestPage")
  .then((module) => ({default: module.RunningTestPage})));
const RunningTestPage = (params: {testUuid: string; sessionUuid: string; isGameMode: boolean}) => (<>
  <RunningTestPageLazy {...params} />
</>);

const ResultTestPageLazy = React.lazy(() => import("src/logic/resultTestPage/ResultTestPage")
  .then((module) => ({default: module.ResultTestPage})));
const ResultTestPage = (params: {testUuid: string; sessionUuid: string}) => (<>
  <ResultTestPageLazy {...params} />
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

const AboutProjectPageLazy = React.lazy(() => import("src/logic/staticPages/aboutProjectPage/AboutProjectPage")
  .then((module) => ({default: module.AboutProjectPage})));
const AboutProjectPage = () => (<>
  <AboutProjectPageLazy />
</>);

const PartnershipPageLazy = React.lazy(() => import("src/logic/staticPages/partnershipPage/PartnershipPage")
  .then((module) => ({default: module.PartnershipPage})));
const PartnershipPage = () => (<>
  <PartnershipPageLazy />
</>);

const ErrorPageLazy = React.lazy(() => import("src/logic/errorPage/ErrorPage")
  .then((module) => ({default: module.ErrorPage})));
const ErrorPage = () => (<>
  <ErrorPageLazy />
</>);

const PrivacyPolicyPageLazy = React.lazy(() => import("src/logic/staticPages/privacyPolicyPage/PrivacyPolicyPage")
  .then((module) => ({default: module.PrivacyPolicyPage})));
const PrivacyPolicyPage = () => (<>
  <PrivacyPolicyPageLazy />
</>);

const LandingsPageLazy = React.lazy(() => import("src/logic/staticPages/landingPages/allLandingsPage/AllLandingsPage")
  .then((module) => ({default: module.LandingsPage})));
const LandingsPage = () => (<>
  <LandingsPage />
</>);

const MentorsLandingPageLazy = React.lazy(() => import(
  "src/logic/staticPages/landingPages/landings/mentorsLandingPage/MentorsLandingPage"
)
  .then((module) => ({default: module.MentorsLandingPage})));
const MentorsLandingPage = () => (<>
  <MentorsLandingPageLazy />
</>);

const StudentsWithMentorsLandingPageLazy = React.lazy(() => import(
  "src/logic/staticPages/landingPages/landings/studentsWithMentorsLandingPage/StudentsWithMentorsLandingPage"
)
  .then((module) => ({default: module.StudentsWithMentorsLandingPage})));
const StudentsWithMentorsLandingPage = () => (<>
  <StudentsWithMentorsLandingPageLazy />
</>);

const StudentsWithAILandingPageLazy = React.lazy(() => import(
  "src/logic/staticPages/landingPages/landings/studentsWithAiLandingPage/StudentsWithAILandingPage"
)
  .then((module) => ({default: module.StudentsWithAILandingPage})));
const StudentsWithAILandingPage = () => (<>
  <StudentsWithAILandingPageLazy />
</>);

const TrainingWithAILandingPageLazy = React.lazy(() => import(
  "src/logic/staticPages/landingPages/landings/trainingWithAiLandingPage/TrainingWithAILandingPage"
)
  .then((module) => ({default: module.TrainingWithAILandingPage})));
const TrainingWithAILandingPage = () => (<>
  <TrainingWithAILandingPageLazy />
</>);

const TestWithAILandingPageLazy = React.lazy(() => import(
  "src/logic/staticPages/landingPages/landings/testWithAiLandingPage/TestWithAILandingPage"
)
  .then((module) => ({default: module.TestWithAILandingPage})));
const TestWithAILandingPage = () => (<>
  <TestWithAILandingPageLazy />
</>);

const UserFlowWithAILandingPageLazy = React.lazy(() => import(
  "src/logic/staticPages/landingPages/landings/userFlowWithAiLandingPage/UserFlowWithAILandingPage"
)
  .then((module) => ({default: module.UserFlowWithAILandingPage})));
const UserFlowWithAILandingPage = () => (<>
  <UserFlowWithAILandingPageLazy />
</>);

const LoremLandingPageLazy = React.lazy(() => import(
  "src/logic/staticPages/landingPages/landings/loremLandingPage/LoremLandingPage"
)
  .then((module) => ({default: module.LoremLandingPage})));
const LoremLandingPage = () => (<>
  <LoremLandingPageLazy />
</>);

const SmallBusinessLandingPageLazy = React.lazy(() => import(
  "src/logic/staticPages/landingPages/landings/businessLandingPage/BusinessLandingPage"
)
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
  partnership: {
    getPath: () => "/partnership",
    getPageComponent: () => suspended(<PartnershipPage />),
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
  allTrainings: {
    getPath: () => "/trainings",
    getPageComponent: () => suspended(<AllTrainingsPage />),
    urlParams: {},
  } as PageParams,
  allTests: {
    getPath: () => "/tests",
    getPageComponent: () => suspended(<AllTestsPage />),
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
  training: {
    getPath: (params): string => getPathForTrainingPage({uuid: params.uuid}),
    getPageComponent: (params) => suspended(<TrainingPage {...params} />),
    urlParams: {uuid: UrlParamsType.UUID} as const,
  } as PageParams<{ uuid: string }>,
  topic: {
    getPath: (params): string => getPathForTopicPage({trainingUuid: params.trainingUuid, topicUuid: params.topicUuid}),
    getPageComponent: (params) => suspended(<TopicPage {...params} />),
    urlParams: {trainingUuid: UrlParamsType.UUID, topicUuid: UrlParamsType.UUID} as const,
  } as PageParams<{trainingUuid: string; topicUuid: string}>,
  project: {
    getPath: (params): string => getPathForProjectPage({uuid: params.uuid}),
    getPageComponent: (params) => suspended(<ProjectPage {...params} />),
    urlParams: {uuid: UrlParamsType.UUID} as const,
  } as PageParams<{uuid: string}>,
  lobbyTest: {
    getPath: (params): string => getPathForLobbyTestPage({uuid: params.uuid}),
    getPageComponent: (params) => suspended(<LobbyTestPage {...params} />),
    urlParams: {uuid: UrlParamsType.UUID} as const,
  } as PageParams<{uuid: string}>,
  editTest: {
    getPath: (params): string => getPathForEditTestPage({uuid: params.uuid}),
    getPageComponent: (params) => suspended(<EditTestPage {...params} />),
    urlParams: {uuid: UrlParamsType.UUID} as const,
  } as PageParams<{uuid: string}>,
  runningTest: {
    getPath: (params): string => getPathForRunningTestPage({
      testUuid: params.testUuid,
      sessionUuid: params.sessionUuid,
      isGameMode: params.isGameMode,
    }),
    getPageComponent: (params) => suspended(<RunningTestPage {...params} />),
    urlParams: {testUuid: UrlParamsType.UUID, sessionUuid: UrlParamsType.UUID} as const,
  } as PageParams<{testUuid: string; sessionUuid: string; isGameMode: boolean}>,
  // GameTest: {
  //   getPath: (params): string => getPathForGameTestPage({testUuid: params.testUuid, sessionUuid: params.sessionUuid}),
  //   getPageComponent: (params) => suspended(<GamePage {...params} />),
  //   urlParams: {testUuid: UrlParamsType.UUID, sessionUuid: UrlParamsType.UUID} as const,
  // } as PageParams<{testUuid: string; sessionUuid: string}>,
  resultTest: {
    getPath: (params): string => getPathForResultTestPage({testUuid: params.testUuid, sessionUuid: params.sessionUuid}),
    getPageComponent: (params) => suspended(<ResultTestPage {...params} />),
    urlParams: {testUuid: UrlParamsType.UUID, sessionUuid: UrlParamsType.UUID} as const,
  } as PageParams<{testUuid: string; sessionUuid: string}>,
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
  landingTrainingWithAI: {
    getPath: () => "/land/trainingWithAI",
    // TODO
    getPageComponent: () => suspended(<TrainingWithAILandingPage />),
    urlParams: {},
  } as PageParams,
  landingTestWithAI: {
    getPath: () => "/land/testWithAI",
    // TODO
    getPageComponent: () => suspended(<TestWithAILandingPage />),
    urlParams: {},
  } as PageParams,
  landingUserFlowWithAI: {
    getPath: () => "/land/userFlowWithAI",
    // TODO
    getPageComponent: () => suspended(<UserFlowWithAILandingPage />),
    urlParams: {},
  } as PageParams,
  landingLorem: {
    getPath: () => "/land/loremWithAI",
    // TODO
    getPageComponent: () => suspended(<LoremLandingPage />),
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
  pages.partnership.getPath({}),
];
