import {useState} from "react";
import clsx from "clsx";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Input, InputType} from "src/component/input/Input";
import {Loader} from "src/component/loader/Loader";
import {displayNotification} from "src/component/notification/displayNotification";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {UserCard} from "src/component/userCard/UserCard";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {UserDAL} from "src/dataAccessLogic/UserDAL";
import {useGlobalContext} from "src/GlobalContext";
import {useLoad} from "src/hooks/useLoad";
import {usePersistanceState} from "src/hooks/usePersistanceState";
import {UsersTableBlock} from "src/logic/usersTable/UsersTableBlock";
import {UserNotSaturatedWay} from "src/model/businessModelPreview/UserNotSaturatedWay";
import {LanguageService} from "src/service/LangauageService";
import {AllUsersPageSettings, View} from "src/utils/LocalStorageWorker";
import {useDebounce} from "use-debounce";
import styles from "src/logic/allUsersPage/AllUsersPage.module.scss";

const DEFAULT_PAGE_PAGINATION_VALUE = 1;
const DEFAULT_USER_LIMIT = 10;
const DEBOUNCE_DELAY_MILLISECONDS = 1000;
const DEFAULT_ALL_USERS_PAGE_SETTINGS: AllUsersPageSettings = {view: View.Card};

/**
 * Fetched data
 */
interface AllUsersFetchData {

  /**
   * Fetched users
   */
  users: UserNotSaturatedWay[];

  /**
   * Amount of filtered users
   */
  usersAmount: number;

}

/**
 * Users page
 */
export const AllUsersPage = () => {
  const [allUsers, setAllUsers] = useState<UserNotSaturatedWay[]>();
  const [allUsersAmount, setAllUsersAmount] = useState<number>();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [pagePagination, setPagePagination] = useState<number>(DEFAULT_PAGE_PAGINATION_VALUE);
  const [debouncedEmail] = useDebounce(email, DEBOUNCE_DELAY_MILLISECONDS);
  const [debouncedName] = useDebounce(name, DEBOUNCE_DELAY_MILLISECONDS);

  const {language} = useGlobalContext();

  const [allUsersPageSettings, updateAllUsersPageSettings] = usePersistanceState({
    key: "allUsersPage",
    defaultValue: DEFAULT_ALL_USERS_PAGE_SETTINGS,
  });

  const isMoreUsersExist = !!allUsers && !!allUsersAmount && allUsers.length < allUsersAmount;

  /**
   * Callback that is called to fetch data
   */
  const loadData = async (): Promise<AllUsersFetchData> => {
    const users = await UserDAL.getUsers({
      page: DEFAULT_PAGE_PAGINATION_VALUE,
      limit: DEFAULT_USER_LIMIT,
      email,
      name,
    });
    const nextPage = pagePagination + DEFAULT_PAGE_PAGINATION_VALUE;
    setPagePagination(nextPage);

    return {users: users.usersPreview, usersAmount: users.size};
  };

  /**
   * Load more users
   */
  const loadMoreUsers = async (loadedUsers: UserNotSaturatedWay[]) => {
    const nextPage = pagePagination + DEFAULT_PAGE_PAGINATION_VALUE;
    setPagePagination(nextPage);
    const users = await UserDAL.getUsers({page: pagePagination});
    setAllUsers([...loadedUsers, ...users.usersPreview]);
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
    dependency: [debouncedEmail, debouncedName],
  });

  if (!allUsers) {
    return (
      <Loader />
    );
  }

  return (
    <VerticalContainer className={styles.allUsersContainer}>
      <HorizontalContainer className={styles.filterView}>
        <HorizontalContainer>
          <Input
            value={email}
            onChange={setEmail}
            placeholder={LanguageService.allUsers.filterBlock.emailPlaceholder[language]}
            className={styles.inputFilter}
            typeInputIcon={
              {
                name: "SearchIcon",
                size: IconSize.SMALL,
              }
            }
            typeInput={InputType.Border}
          />
          <Input
            value={name}
            onChange={setName}
            placeholder={LanguageService.allUsers.filterBlock.namePlaceholder[language]}
            className={styles.inputFilter}
            typeInputIcon={
              {
                name: "SearchIcon",
                size: IconSize.SMALL,
              }
            }
            typeInput={InputType.Border}
          />
        </HorizontalContainer>
        <HorizontalContainer>
          <Tooltip
            position={PositionTooltip.LEFT}
            content={LanguageService.allUsers.filterBlock.cardViewTooltip[language]}
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
            content={LanguageService.allUsers.filterBlock.tableViewTooltip[language]}
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
          text={`${LanguageService.allUsers.usersTable.leftTitle[language]} (${allUsers.length})`}
        />
        <Title
          level={HeadingLevel.h2}
          text={`${LanguageService.allUsers.usersTable.rightTitle[language]}: ${allUsersAmount}`}
        />
      </HorizontalContainer>

      <div className={styles.usersContent}>
        {allUsersPageSettings.view === View.Table ?
          <ScrollableBlock>
            <UsersTableBlock users={allUsers} />
          </ScrollableBlock>
          :
          <HorizontalGridContainer className={styles.userCards}>
            {allUsers.map((user) => {
              return (
                <UserCard
                  key={user.uuid}
                  userPreview={user}
                />
              );
            })
            }
          </HorizontalGridContainer>
        }
        {isMoreUsersExist &&
        <Button
          value={LanguageService.allUsers.usersTable.loadMoreButton[language]}
          onClick={() => loadMoreUsers(allUsers)}
          buttonType={ButtonType.SECONDARY}
          className={styles.loadMoreButton}
        />
        }

      </div>
    </VerticalContainer>
  );
};
