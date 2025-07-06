import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import {Layout} from "src/logic/Layout";
import {LandingLayout} from "src/logic/staticPages/landingPages/LandingLayout";
import {pages} from "src/router/pages";
import {WithValidatedParams} from "src/router/PageUrlValidator/ValidatedParams";

/**
 * Router
 */

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={pages.home.getPath({})}
        element={<Layout />}
        errorElement={pages.errorPage.getPageComponent({})}
      >
        <Route
          path={pages.home.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.home} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.partnership.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.partnership} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.allWays.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.allWays} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.allTrainings.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.allTrainings} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.allTests.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.allTests} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.user.getPath({uuid: ":uuid"})}
          element={<WithValidatedParams paramsSchema={pages.user} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.way.getPath({uuid: ":uuid"})}
          element={<WithValidatedParams paramsSchema={pages.way} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.project.getPath({uuid: ":uuid"})}
          element={<WithValidatedParams paramsSchema={pages.project} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.training.getPath({uuid: ":uuid"})}
          element={<WithValidatedParams paramsSchema={pages.training} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.lobbyTest.getPath({uuid: ":uuid"})}
          element={<WithValidatedParams paramsSchema={pages.lobbyTest} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.runningTest.getPath({testUuid: ":testUuid", sessionUuid: ":sessionUuid"})}
          element={<WithValidatedParams paramsSchema={pages.runningTest} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.gameTest.getPath({testUuid: ":testUuid", sessionUuid: ":sessionUuid"})}
          element={<WithValidatedParams paramsSchema={pages.gameTest} />}
        />
        <Route
          path={pages.editTest.getPath({uuid: ":uuid"})}
          element={<WithValidatedParams paramsSchema={pages.editTest} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.resultTest.getPath({testUuid: ":testUuid", sessionUuid: ":sessionUuid"})}
          element={<WithValidatedParams paramsSchema={pages.resultTest} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.topic.getPath({trainingUuid: ":trainingUuid", topicUuid: ":topicUuid"})}
          element={<WithValidatedParams paramsSchema={pages.topic} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.allUsers.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.allUsers} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.settings.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.settings} />}
        />
        <Route
          path={pages.aboutProject.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.aboutProject} />}
        />
        <Route
          path={pages.pricing.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.pricing} />}
        />
        <Route
          path={pages.game.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.game} />}
        />
      </Route>

      <Route
        path={pages.home.getPath({})}
        element={<LandingLayout />}
        errorElement={pages.errorPage.getPageComponent({})}
      >
        <Route
          path={pages.privacyPolicy.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.privacyPolicy} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.landings.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.landings} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.landingMentors.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.landingMentors} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.landingStudentsWithMentors.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.landingStudentsWithMentors} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.landingStudentsWithAI.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.landingStudentsWithAI} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.landingTrainingWithAI.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.landingTrainingWithAI} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.landingTestWithAI.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.landingTestWithAI} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.landingUserFlowWithAI.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.landingUserFlowWithAI} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.landingLorem.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.landingLorem} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
        <Route
          path={pages.landingBusiness.getPath({})}
          element={<WithValidatedParams paramsSchema={pages.landingBusiness} />}
          errorElement={pages.errorPage.getPageComponent({})}
        />
      </Route>
    </>,
  ),
);
