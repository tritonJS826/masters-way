import {useEffect, useState} from "react";
import {HeadingLevel, Title} from "src/component/title/Title";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {usersColumns} from "src/logic/usersTable/usersColumns";
import {UsersTable} from "src/logic/usersTable/UsersTable";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";

/**
 * Render table of all Users
 */
export const AllUsersTable = () => {
  const [allUsers, setAllUsers] = useState<UserPreview[]>([]);

  /**
   * Load all Users
   */
  const loadAllUsers = async () => {
    const data = await UserPreviewDAL.getUsersPreview();
    setAllUsers(data);
  };

  useEffect(() => {
    loadAllUsers();
  }, []);

  return (
    <>
      <Title
        text={`All users (total amount: ${allUsers.length} users)`}
        level={HeadingLevel.h2}
      />
      <UsersTable
        data={allUsers}
        columns={usersColumns}
      />
    </>
  );
};
