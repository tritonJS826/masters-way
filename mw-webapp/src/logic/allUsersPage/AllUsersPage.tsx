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
import {usePersistanceState} from "src/hooks/usePersistanceState";
import {LAST_INDEX} from "src/logic/mathConstants";
import {UsersTableBlock} from "src/logic/usersTable/UsersTableBlock";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {AllUsersPageSettings} from "src/utils/LocalStorageWorker";
import styles from "src/logic/allUsersPage/AllUsersPage.module.scss";

const FILTER_EMAIL_EMPTY_STRING = "";
const DEFAULT_ALL_USERS_PAGE_SETTINGS: AllUsersPageSettings = {filterEmail: FILTER_EMAIL_EMPTY_STRING};

/**
 * Safe opened tab from localStorage
 */
const allUsersPageSettingsValidator = (currentSettings: AllUsersPageSettings) => {
  return !!currentSettings.filterEmail;
};

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
  const [filterEmail, setFilterEmail] = useState<string>(DEFAULT_ALL_USERS_PAGE_SETTINGS.filterEmail);

  const [allUsersPageSettings, updateAllUsersPageSettings] = usePersistanceState({
    key: "allUsersPage",
    defaultValue: DEFAULT_ALL_USERS_PAGE_SETTINGS,

    /**
     * Check is stored data valid
     */
    storedDataValidator: (
      currentSettings: AllUsersPageSettings,
    ) => allUsersPageSettingsValidator(currentSettings),
  });

  /**
   * Callback that is called to fetch data
   */
  const loadData = async (): Promise<AllUsersFetchData> => {
    const [
      users,
      usersAmount,
    ] = await Promise.all([
      UserPreviewDAL.getUsersPreview({filterEmail}),
      UserPreviewDAL.getUsersPreviewAmount(filterEmail),
    ]);

    return {users, usersAmount};
  };

  /**
   * Load more ways
   */
  const loadMoreUsers = async (loadedUsers: UserPreview[]) => {
    const lastUserUuid = loadedUsers.at(LAST_INDEX)?.uuid;

    const users = await UserPreviewDAL.getUsersPreview({filterEmail, lastUserUuid});
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
    dependency: [allUsersPageSettings.filterEmail],
  });

  if (!allUsers) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <div
        onKeyDown={() => updateAllUsersPageSettings({filterEmail})}
        className={styles.searchFilter}
      >
        <Input
          value={filterEmail}
          onChange={(value) => setFilterEmail(value)}
          placeholder="Search by first letters in email"
        />
        <Button
          value="Search"
          onClick={() => updateAllUsersPageSettings({filterEmail})}
        />
      </div>
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
        value="More"
        onClick={() => loadMoreUsers(allUsers)}
        buttonType={ButtonType.PRIMARY}
        className={styles.button}
      />
    </>
  );
};
