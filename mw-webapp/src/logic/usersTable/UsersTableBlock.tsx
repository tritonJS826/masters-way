import {useGlobalContext} from "src/GlobalContext";
import {getUsersColumns} from "src/logic/usersTable/usersColumns";
import {UsersTable} from "src/logic/usersTable/UsersTable";
import {UserNotSaturatedWay} from "src/model/businessModelPreview/UserNotSaturatedWay";

/**
 * Users table props
 */
interface UsersTableProps {

  /**
   * Users
   */
  users: UserNotSaturatedWay[];
}

/**
 * Render table of all Users
 */
export const UsersTableBlock = (props: UsersTableProps) => {
  const {language} = useGlobalContext();

  return (
    <UsersTable
      data={props.users}
      columns={getUsersColumns(language)}
    />
  );
};
