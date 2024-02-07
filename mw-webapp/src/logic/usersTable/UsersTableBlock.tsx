import {usersColumns} from "src/logic/usersTable/usersColumns";
import {UsersTable} from "src/logic/usersTable/UsersTable";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";

/**
 * Users table props
 */
interface UsersTableProps {

  /**
   * Users
   */
  users: UserPreview[];
}

/**
 * Render table of all Users
 */
export const UsersTableBlock = (props: UsersTableProps) => {
  return (
    <>
      <UsersTable
        data={props.users}
        columns={usersColumns}
      />
    </>
  );
};
