import {AboutProjectPage} from "src/logic/aboutProjectPage/AboutProjectPage";
import {AllUsersPage} from "src/logic/allUsersPage/AllUsersPage";
import {AllWaysPage} from "src/logic/allWaysPage/AllWaysPage";
import {Page404} from "src/logic/page404/Page404";
import {UserPage} from "src/logic/userPage/UserPage";
import {UserProfilePage} from "src/logic/userProfilePage/UserProfilePage";
import {WayPage} from "src/logic/wayPage/WayPage";

/**
 * Pages meta data
 */
export const pages = {
  allWays: {
    path: "/",
    element: <AllWaysPage />,
  },
  user: {

    /**
     * @param {string} uuid Could be param name (if we want to create new path) OR could be user uuid.
     * @returns {string} path to react-router OR Specific URl path to specific user
     */
    path: (uuid: string): string => `user/${uuid}`,
    element: <UserPage />,
  },
  way: {

    /**
     * @param {string} uuid Could be param name (if we want to create new path) OR could be way uuid.
     * @returns {string} path to react-router OR Specific URl path to specific way
     */
    path: (uuid: string): string => `way/${uuid}`,
    element: <WayPage />,
  },
  allUsers: {
    path: "users",
    element: <AllUsersPage />,
  },
  userProfile: {

    /**
     * @param {string} uuid Could be param name (if we want to create new path) OR could be userProfile uuid.
     * @returns {string} path to react-router OR Specific URl path to specific userProfile
     */
    path: (uuid: string): string => `userProfile/${uuid}`,
    element: <UserProfilePage />,
  },
  aboutProject: {
    path: "aboutProject",
    element: <AboutProjectPage />,
  },
  page404: {
    path: "*",
    element: <Page404 />,
  },
};