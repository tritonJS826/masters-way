import {HeadingLevel, Title} from "src/component/title/Title";
import {usersColumns} from "src/logic/usersTable/usersColumns";
import {UsersTable} from "src/logic/usersTable/UsersTable";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";

/**
 * Users table props
 */
interface UsersTableProps {

  /**
   * Uses
   */
  users: UserPreview[];
}

/**
 * Render table of all Users
 */
export const UsersTableBlock = (props: UsersTableProps) => {
  return (
    <>
      <Title
        text={`All users (total amount: ${props.users.length} users)`}
        level={HeadingLevel.h2}
      />
      <UsersTable
        data={props.users}
        columns={usersColumns}
      />
    </>
  );
};
