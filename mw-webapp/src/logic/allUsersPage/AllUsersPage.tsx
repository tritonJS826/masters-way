import {useState} from "react";
import {Loader} from "src/component/loader/Loader";
import {displayNotification} from "src/component/notification/displayNotification";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {useLoad} from "src/hooks/useLoad";
import {UsersTableBlock} from "src/logic/usersTable/UsersTableBlock";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";

/**
 * Users page
 */
export const AllUsersPage = () => {
  const [allUsers, setAllUsers] = useState<UserPreview[]>();

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

  if (!allUsers) {
    return (
      <Loader />
    );
  }

  return (
    <ScrollableBlock>
      <UsersTableBlock users={allUsers} />
    </ScrollableBlock>
  );
};
