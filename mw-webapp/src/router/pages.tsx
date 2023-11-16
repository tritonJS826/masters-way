import {AboutProjectPage} from "src/logic/aboutProjectPage/AboutProjectPage";
import {AllUsersPage} from "src/logic/allUsersPage/AllUsersPage";
import {AllWaysPage} from "src/logic/allWaysPage/AllWaysPage";
import {Page404} from "src/logic/page404/Page404";
import {UserProfilePage} from "src/logic/userProfilePage/UserProfilePage";
import {WayPage} from "src/logic/wayPage/WayPage";
import {ValidatedUser} from "src/router/ValidatedUser";

/**
 * Pages meta data
 */
export const pages = {
  allWays: {
    path: "/",
    pageComponent: <AllWaysPage />,
  },
  user: {

    /**
     * @param {string} uuid Could be param name (if we want to create new path) OR could be user uuid.
     * @returns {string} path to react-router OR Specific URl path to specific user
     */
    path: (uuid: string): string => `/user/${uuid}`,
    pageComponent: <ValidatedUser />,
  },
  way: {

    /**
     * @param {string} uuid Could be param name (if we want to create new path) OR could be way uuid.
     * @returns {string} path to react-router OR Specific URl path to specific way
     */
    path: (uuid: string): string => `/way/${uuid}`,
    pageComponent: <WayPage />,
  },
  allUsers: {
    path: "/users",
    pageComponent: <AllUsersPage />,
  },
  userProfile: {

    /**
     * @param {string} uuid Could be param name (if we want to create new path) OR could be userProfile uuid.
     * @returns {string} path to react-router OR Specific URl path to specific userProfile
     */
    path: (uuid: string): string => `/userProfile/${uuid}`,
    pageComponent: <UserProfilePage />,
  },
  aboutProject: {
    path: "/aboutProject",
    pageComponent: <AboutProjectPage />,
  },
  page404: {
    path: "*",
    pageComponent: <Page404 />,
  },
};