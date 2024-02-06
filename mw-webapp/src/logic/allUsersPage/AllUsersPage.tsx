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

const LAST_USER = -1;

/**
 * Users page
 */
export const AllUsersPage = () => {
  const [allUsers, setAllUsers] = useState<UserPreview[]>();
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
  const loadData = () => UserPreviewDAL.getUsersPreview();

  /**
   * Load more ways
   */
  const loadMoreUsers = async (loadedUsers: UserPreview[]) => {
    const lastUser = loadedUsers.at(LAST_USER);
    const lastUserUuid = lastUser ? lastUser.uuid : undefined;

    const users = await UserPreviewDAL.getUsersPreview(lastUserUuid);
    setAllUsers([...loadedUsers, ...users]);

  };

  /**
   * Callback that is called on fetch and validation success
   */
  const onSuccess = (data: UserPreview[]) => {
    setAllUsers(data);
    getAllUsersAmount();
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
        onClick={() => loadMoreUsers(allUsers)}
        buttonType={ButtonType.PRIMARY}
        className={styles.button}
      />
    </>
  );
};
