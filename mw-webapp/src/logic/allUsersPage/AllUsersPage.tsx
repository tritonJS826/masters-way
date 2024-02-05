import {useState} from "react";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Loader} from "src/component/loader/Loader";
import {displayNotification} from "src/component/notification/displayNotification";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {useLoad} from "src/hooks/useLoad";
import {UsersTableBlock} from "src/logic/usersTable/UsersTableBlock";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import styles from "src/logic/allUsersPage/AllUsersPage.module.scss";

const ALL_USERS_LAST_INDEX = 9;

/**
 * Users page
 */
export const AllUsersPage = () => {
  const [allUsers, setAllUsers] = useState<UserPreview[]>();
  const [lastUserUuid, setLastUserUuid] = useState<string>();
  const [allUsersAmount, setAllUsersAmount] = useState<number>();

  /**
   * Get amount of all ways
   */
  const getAllUsersAmount = async () => {
    const usersAmount = await UserPreviewDAL.getUsersPreviewAmount();
    setAllUsersAmount(usersAmount);
  };

  /**
   * Callback that is called to fetch data
   */
  const loadData = () => {
    getAllUsersAmount();

    return UserPreviewDAL.getUsersPreview();
  };

  /**
   * Load more ways
   */
  const loadMoreUsers = async () => {
    const users = await UserPreviewDAL.getUsersPreview(lastUserUuid);
    allUsers && setAllUsers([...allUsers, ...users]);
    setLastUserUuid(users[ALL_USERS_LAST_INDEX].uuid);
  };

  /**
   * Callback that is called on fetch and validation success
   */
  const onSuccess = (data: UserPreview[]) => {
    setAllUsers(data);
    setLastUserUuid(data[ALL_USERS_LAST_INDEX].uuid);
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
    <>
      <HorizontalContainer className={styles.titleContainer}>
        <Title
          level={HeadingLevel.h2}
          text={`Users (${allUsers.length})`}
        />
        <Title
          level={HeadingLevel.h2}
          text={`Total found: ${allUsersAmount}`}
        />
      </HorizontalContainer>
      <ScrollableBlock>
        <UsersTableBlock users={allUsers} />
      </ScrollableBlock>
      <Button
        value="More ways"
        onClick={() => loadMoreUsers()}
        buttonType={ButtonType.PRIMARY}
        className={styles.button}
      />
    </>
  );
};
