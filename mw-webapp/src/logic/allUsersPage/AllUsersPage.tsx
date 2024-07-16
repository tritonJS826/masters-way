import {useState} from "react";
import {allUsersAccessIds} from "cypress/accessIds/allUsersAccessIds";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {Input, InputType} from "src/component/input/Input";
import {Loader} from "src/component/loader/Loader";
import {displayNotification} from "src/component/notification/displayNotification";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {Select} from "src/component/select/Select";
import {HeadingLevel, Title} from "src/component/title/Title";
import {UserCard} from "src/component/userCard/UserCard";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {renderViewCardOption, renderViewTableOption, ViewSwitcher} from "src/component/viewSwitcher/ViewSwitcher";
import {UserDAL} from "src/dataAccessLogic/UserDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {useLoad} from "src/hooks/useLoad";
import {usePersistanceState} from "src/hooks/usePersistanceState";
import {UsersTableBlock} from "src/logic/usersTable/UsersTableBlock";
import {UserNotSaturatedWay} from "src/model/businessModelPreview/UserNotSaturatedWay";
import {LanguageService} from "src/service/LanguageService";
import {AllUsersPageSettings, View} from "src/utils/LocalStorageWorker";
import {useDebounce} from "use-debounce";
import styles from "src/logic/allUsersPage/AllUsersPage.module.scss";

/**
 * Available mentoring statuses
 */
export const MentoringStatus = {
  mentor: "mentor",
  all: "all",
} as const;

export type MentoringStatusType = typeof MentoringStatus[keyof typeof MentoringStatus];

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
export const AllUsersPage = observer(() => {
  const [allUsers, setAllUsers] = useState<UserNotSaturatedWay[]>();
  const [allUsersAmount, setAllUsersAmount] = useState<number>();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [mentorStatus, setMentorStatus] = useState<string>(MentoringStatus.all);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(DEFAULT_PAGE_PAGINATION_VALUE);
  const [debouncedEmail] = useDebounce(email, DEBOUNCE_DELAY_MILLISECONDS);
  const [debouncedName] = useDebounce(name, DEBOUNCE_DELAY_MILLISECONDS);

  const {language} = languageStore;
  const {theme} = themeStore;

  const [allUsersPageSettings, updateAllUsersPageSettings] = usePersistanceState({
    key: "allUsersPage",
    defaultValue: DEFAULT_ALL_USERS_PAGE_SETTINGS,
  });

  const isMoreUsersExist = !!allUsers && !!allUsersAmount && allUsers.length < allUsersAmount;

  /**
   * Callback that is called to fetch data
   */
  const loadData = async (): Promise<AllUsersFetchData> => {
    setCurrentPageNumber(DEFAULT_PAGE_PAGINATION_VALUE);
    const users = await UserDAL.getUsers({
      page: DEFAULT_PAGE_PAGINATION_VALUE,
      limit: DEFAULT_USER_LIMIT,
      email,
      name,
      mentorStatus,
    });

    return {users: users.usersPreview, usersAmount: users.size};
  };

  /**
   * Load more users
   */
  const loadMoreUsers = async () => {
    const nextPage = currentPageNumber + DEFAULT_PAGE_PAGINATION_VALUE;
    const users = await UserDAL.getUsers({
      page: nextPage,
      limit: DEFAULT_USER_LIMIT,
      email,
      name,
      mentorStatus,
    });

    setAllUsers([...allUsers ?? [], ...users.usersPreview]);
    setCurrentPageNumber(nextPage);
  };

  /**
   * Callback that is called on fetch and validation success
   */
  const onSuccess = (data: AllUsersFetchData) => {
    setAllUsers(data.users);
    setAllUsersAmount(data.usersAmount);
    setCurrentPageNumber(DEFAULT_PAGE_PAGINATION_VALUE);
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
    dependency: [debouncedEmail, debouncedName, mentorStatus],
  });

  if (!allUsers) {
    return (
      <Loader theme={theme} />
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
            typeInputIcon={"SearchIcon"}
            typeInput={InputType.Border}
            dataCy={allUsersAccessIds.filterViewBlock.searchByEmailInput}
          />
          <Input
            value={name}
            onChange={setName}
            placeholder={LanguageService.allUsers.filterBlock.namePlaceholder[language]}
            typeInputIcon={"SearchIcon"}
            typeInput={InputType.Border}
            dataCy={allUsersAccessIds.filterViewBlock.searchByNameInput}
          />
        </HorizontalContainer>
        <HorizontalContainer className={styles.filterBlock}>
          <Select
            label={`${LanguageService.allUsers.filterBlock.type[language]}`}
            defaultValue={MentoringStatus.all}
            name="filterStatus"
            options={[
              {
                id: "1",
                value: MentoringStatus.all,
                text: LanguageService.allUsers.filterBlock.mentoringTypeOptions.all[language],
              },
              {
                id: "2",
                value: MentoringStatus.mentor,
                text: LanguageService.allUsers.filterBlock.mentoringTypeOptions.mentor[language],
              },
            ]}
            onChange={(value) => setMentorStatus(value)}
          />
        </HorizontalContainer>
        <ViewSwitcher
          view={allUsersPageSettings.view}
          setView={(view) => updateAllUsersPageSettings({view})}
          options={[
            renderViewCardOption(LanguageService.common.view.cardViewTooltip[language]),
            renderViewTableOption(LanguageService.common.view.tableViewTooltip[language]),
          ]}
        />
      </HorizontalContainer>

      <HorizontalContainer className={styles.titleContainer}>
        <Title
          level={HeadingLevel.h2}
          text={`${LanguageService.allUsers.usersTable.leftTitle[language]} (${allUsers.length})`}
          placeholder=""
          dataCy={allUsersAccessIds.allUsersTitles.title}
        />
        <Title
          level={HeadingLevel.h2}
          text={`${LanguageService.allUsers.usersTable.rightTitle[language]}: ${allUsersAmount}`}
          placeholder=""
          dataCy={allUsersAccessIds.allUsersTitles.totalFoundTitle}
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
                  dataCy={allUsersAccessIds.allUsersCard.userCardLink}
                />
              );
            })
            }
          </HorizontalGridContainer>
        }
        {isMoreUsersExist &&
        <Button
          value={LanguageService.allUsers.usersTable.loadMoreButton[language]}
          onClick={loadMoreUsers}
          buttonType={ButtonType.SECONDARY}
          className={styles.loadMoreButton}
          dataCy={allUsersAccessIds.loadMoreButton}
        />
        }

      </div>
    </VerticalContainer>
  );
});
