import {useState} from "react";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Input} from "src/component/input/Input";
import {Loader} from "src/component/loader/Loader";
import {displayNotification} from "src/component/notification/displayNotification";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {useLoad} from "src/hooks/useLoad";
import {LAST_INDEX} from "src/logic/mathConstants";
import {UsersTableBlock} from "src/logic/usersTable/UsersTableBlock";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import styles from "src/logic/allUsersPage/AllUsersPage.module.scss";

/**
 * Fetched data
 */
interface AllUsersFetchData {

  /**
   * Fetched users
   */
  users: UserPreview[];

  /**
   * Amount of filtered users
   */
  usersAmount: number;
}

/**
 * Users page
 */
export const AllUsersPage = () => {
  const [allUsers, setAllUsers] = useState<UserPreview[]>();
  const [allUsersAmount, setAllUsersAmount] = useState<number>();
  const [email, setEmail] = useState<string>("");

  const isMoreUsersExist = !!allUsers && !!allUsersAmount && allUsers.length < allUsersAmount;

  /**
   * Callback that is called to fetch data
   */
  const loadData = async (): Promise<AllUsersFetchData> => {
    const [
      users,
      usersAmount,
    ] = await Promise.all([
      UserPreviewDAL.getUsersPreview({email}),
      UserPreviewDAL.getUsersPreviewAmount({email}),
    ]);

    return {users, usersAmount};
  };

  /**
   * Load more users
   */
  const loadMoreUsers = async (loadedUsers: UserPreview[]) => {
    const lastUserUuid = loadedUsers.at(LAST_INDEX)?.uuid;

    const users = await UserPreviewDAL.getUsersPreview({email, lastUserUuid});
    setAllUsers([...loadedUsers, ...users]);
  };

  /**
   * Callback that is called on fetch and validation success
   */
  const onSuccess = (data: AllUsersFetchData) => {
    setAllUsers(data.users);
    setAllUsersAmount(data.usersAmount);
  };

  /**
   * Callback this is called on fetch or validation error
   */
  const onError = (error: Error) => {
    // TODO #511: research how onError works in app and update onError (we need to get error on firebase statistics)
    displayNotification({text: error.message, type: "error"});
  };

  useLoad({
    loadData,
    onSuccess,
    onError,
    dependency: [email],
  });

  if (!allUsers) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <Input
        value={email}
        onChange={(value) => setEmail(value)}
        placeholder="Search by first letters in email"
        className={styles.searchFilter}
      />
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
      {isMoreUsersExist &&
        <Button
          value="More"
          onClick={() => loadMoreUsers(allUsers)}
          buttonType={ButtonType.PRIMARY}
          className={styles.button}
        />
      }
    </>
  );
};
