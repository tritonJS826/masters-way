import {useState} from "react";
import {displayNotification} from "src/component/notification/Notification";
import {HeadingLevel, Title} from "src/component/title/Title";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {useLoad} from "src/hooks/useLoad";
import {usersColumns} from "src/logic/usersTable/usersColumns";
import {UsersTable} from "src/logic/usersTable/UsersTable";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";

/**
 * Render table of all Users
 */
export const AllUsersTable = () => {
  const [allUsers, setAllUsers] = useState<UserPreview[]>([]);

  /**
   * Callback that is called to fetch data
   */
  const loadData = () => UserPreviewDAL.getUsersPreview();

  /**
   * Callback that is called on fetch and validation success
   */
  const onSuccess = (data: UserPreview[]) => {
    setAllUsers(data);
  };

  /**
   * Callback this is called on fetch or validation error
   */
  const onError = (error: Error) => {
    displayNotification({text: error.message, type: "error"});
  };

  useLoad({
    loadData,
    onSuccess,
    onError,
  });

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
