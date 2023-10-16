import {AboutProjectPage} from "src/logic/aboutProjectPage/AboutProjectPage";
import {Page404} from "src/logic/page404/Page404";
import {UserPage} from "src/logic/userPage/UserPage";
import {UserProfilePage} from "src/logic/userProfilePage/UserProfilePage";
import {UsersPage} from "src/logic/usersPage/UsersPage";
import {WayPage} from "src/logic/wayPage/WayPage";
import {WaysPage} from "src/logic/waysPage/WaysPage";

/**
 * Pages meta data
 */
export const pages = {
  ways: {
    path: "/",
    element: <WaysPage />,
  },
  user: {
    path: "user",
    element: <UserPage />,
  },
  way: {
    path: "way",
    element: <WayPage />,
  },
  users: {
    path: "users",
    element: <UsersPage />,
  },
  userProfile: {
    path: "userProfile",
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