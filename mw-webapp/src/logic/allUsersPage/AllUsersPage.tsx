import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {AllUsersTable} from "src/logic/usersTable/AllUsersTable";

/**
 * Users page
 */
export const AllUsersPage = () => {
  return (
    <ScrollableBlock>
      <AllUsersTable />
    </ScrollableBlock>
  );
};
