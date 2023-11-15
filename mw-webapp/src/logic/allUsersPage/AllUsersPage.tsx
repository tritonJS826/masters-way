import {HeadingLevel, Title} from "src/component/title/Title";
import {AllUsersTable} from "src/logic/usersTable/AllUsersTable";

/**
 * Users page
 */
export const AllUsersPage = () => {
  return (
    <>
      <Title
        level={HeadingLevel.h2}
        text="Users page"
      />
      <AllUsersTable />
    </>
  );
};