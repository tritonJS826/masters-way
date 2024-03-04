import {useState} from "react";
import clsx from "clsx";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Input} from "src/component/input/Input";
import {Loader} from "src/component/loader/Loader";
import {displayNotification} from "src/component/notification/displayNotification";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {UserCard} from "src/component/userCard/UserCard";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {useLoad} from "src/hooks/useLoad";
import {usePersistanceState} from "src/hooks/usePersistanceState";
import {LAST_INDEX} from "src/logic/mathConstants";
import {UsersTableBlock} from "src/logic/usersTable/UsersTableBlock";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {AllUsersPageSettings, View} from "src/utils/LocalStorageWorker";
import {useDebounce} from "use-debounce";
import styles from "src/logic/allUsersPage/AllUsersPage.module.scss";

const DEBOUNCE_DELAY_MILLISECONDS = 1000;
const DEFAULT_ALL_USERS_PAGE_SETTINGS: AllUsersPageSettings = {view: View.Card};

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
  const [debouncedEmail ] = useDebounce(email, DEBOUNCE_DELAY_MILLISECONDS);

  const [allUsersPageSettings, updateAllUsersPageSettings] = usePersistanceState({
    key: "allUsersPage",
    defaultValue: DEFAULT_ALL_USERS_PAGE_SETTINGS,
  });

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
    throw error;
  };

  useLoad({
    loadData,
    onSuccess,
    onError,
    dependency: [debouncedEmail],
  });

  if (!allUsers) {
    return (
      <Loader />
    );
  }

  return (
    <>
      <HorizontalContainer className={styles.filterView}>
        <Input
          value={email}
          onChange={(value) => setEmail(value)}
          placeholder="Search by first letters in email"
          className={styles.searchFilter}
        />
        <HorizontalContainer className={styles.iconsView}>
          <Tooltip
            position={PositionTooltip.LEFT}
            content={`Switch to ${View.Card} view`}
          >
            <button
              className={styles.iconView}
              onClick={() =>
                updateAllUsersPageSettings({view: View.Card})}
            >
              <Icon
                size={IconSize.MEDIUM}
                name={"GridViewIcon"}
                className={clsx(allUsersPageSettings.view === View.Card && styles.activeView)}
              />
            </button>
          </Tooltip>
          <Tooltip
            position={PositionTooltip.LEFT}
            content={`Switch to ${View.Table} view`}
          >
            <button
              className={styles.iconView}
              onClick={() =>
                updateAllUsersPageSettings({view: View.Table})}
            >
              <Icon
                size={IconSize.MEDIUM}
                name={"TableViewIcon"}
                className={clsx(allUsersPageSettings.view === View.Table && styles.activeView)}
              />
            </button>
          </Tooltip>
        </HorizontalContainer>
      </HorizontalContainer>

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
      {allUsersPageSettings.view === View.Table ?
        <ScrollableBlock>
          <UsersTableBlock users={allUsers} />
        </ScrollableBlock>
        :
        <HorizontalContainer className={styles.userCards}>
          {allUsers.map((user) => {
            return (
              <UserCard
                key={user.uuid}
                userPreview={user}
              />
            );
          })
          }
        </HorizontalContainer>
      }
      {isMoreUsersExist &&
      <Tooltip
        position={PositionTooltip.TOP_DOUBLE}
        content={"More users"}
      >
        <Button
          value="More"
          onClick={() => loadMoreUsers(allUsers)}
          buttonType={ButtonType.PRIMARY}
          className={styles.button}
        />
      </Tooltip>
      }
    </>
  );
};
