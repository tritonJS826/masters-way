import {useEffect, useState} from "react";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {columns} from "src/logic/usersTable/columns";
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
    <UsersTable
      data={allUsers}
      columns={columns}
    />
  );
};