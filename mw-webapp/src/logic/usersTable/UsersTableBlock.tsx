import {observer} from "mobx-react-lite";
import {languageStore} from "src/globalStore/LanguageStore";
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
export const UsersTableBlock = observer((props: UsersTableProps) => {
  const {language} = languageStore;

  return (
    <UsersTable
      data={props.users}
      columns={getUsersColumns(language)}
    />
  );
});
