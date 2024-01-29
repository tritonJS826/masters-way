import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, ButtonType} from "src/component/button/Button";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Loader} from "src/component/loader/Loader";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {useGlobalContext} from "src/GlobalContext";
import {useLoad} from "src/hooks/useLoad";
import {BaseWaysTable, FILTER_STATUS_ALL_VALUE} from "src/logic/waysTable/BaseWaysTable";
import {WayStatusType} from "src/logic/waysTable/wayStatus";
import {Way} from "src/model/businessModel/Way";
import {UserPreview, WaysCollection as WayCollection} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import {localStorageWorker, UserPageSettings} from "src/utils/LocalStorageWorker";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import styles from "src/logic/userPage/UserPage.module.scss";

/**
 * Update User params
 */
export interface UpdateUserParams {

  /**
   * User to update
   */
  userToUpdate: PartialWithUuid<UserPreview>;

  /**
   * Callback to update user
   */
  setUser: (user: PartialWithUuid<UserPreview>) => void;
}

/**
 * Update user
 */
export const updateUser = async (params: UpdateUserParams) => {
  params.setUser(params.userToUpdate);
  await UserPreviewDAL.updateUserPreview(params.userToUpdate);
};

/**
 * User Page Props
 */
interface UserPageProps {

  /**
   * User's uuid
   */
  uuid: string;
}

/**
 * Default ways collections
 */
enum DefaultCollections {
  OWN = "OWN",
  MENTORING = "MENTORING",
  FAVORITE = "FAVORITE",
}

const DEFAULT_USER_PAGE_SETTINGS: UserPageSettings = {
  openedTabId: DefaultCollections.OWN,
  filterStatus: FILTER_STATUS_ALL_VALUE,
};

/**
 * Safe opened tab from localStorage
 */
const getUserPageSavedSettings = (allCollections: WayCollection[]) => {
  const settings = localStorageWorker.getItemByKey<UserPageSettings>("wayPage") ?? DEFAULT_USER_PAGE_SETTINGS;
  const isTabExist = settings.openedTabId && allCollections.some(collection => collection.id === settings.openedTabId);

  if (!isTabExist) {
    settings.openedTabId = DEFAULT_USER_PAGE_SETTINGS.openedTabId;
  }

  if (!settings.filterStatus) {
    settings.filterStatus = FILTER_STATUS_ALL_VALUE;
  }

  return settings;
};

/**
 * User page
 */
export const UserPage = (props: UserPageProps) => {
  const [userPreview, setUserPreview] = useState<UserPreview>();
  const wayCollection: WayCollection[] = [
    ...(userPreview?.customWayCollections ?? []),
    {
      id: DefaultCollections.OWN,
      name: "Own ways",
      uuids: userPreview?.ownWays ?? [],
    }, {
      id: DefaultCollections.MENTORING,
      name: "Mentoring ways",
      uuids: userPreview?.mentoringWays ?? [],
    },
    {
      id: DefaultCollections.FAVORITE,
      name: "Favorite ways",
      uuids: userPreview?.favoriteWays ?? [],
    },
  ];

  const [userPageSettings, setUserPageSettings] = useState<UserPageSettings>(getUserPageSavedSettings(wayCollection));

  /**
   * Update way page settings
   */
  const updateUserPageSettings = (settingsToUpdate: Partial<UserPageSettings>) => {
    const previousWayPageSettings = getUserPageSavedSettings(wayCollection);
    const updatedSettings = {...previousWayPageSettings, ...settingsToUpdate};
    localStorageWorker.setItemByKey("wayPage", updatedSettings);
    setUserPageSettings(updatedSettings);
  };

  /**
   * Update userPreview state
   */
  const setUserPreviewPartial = (previousUser: Partial<UserPreview>) => {
    setUserPreview((prevUser?: UserPreview) => {
      if (!prevUser) {
        throw new Error("Previous user is undefined");
      }

      return {...prevUser, ...previousUser};
    });
  };

  const navigate = useNavigate();
  const {user} = useGlobalContext();
  const isPageOwner = !!user && !!userPreview && user.uuid === userPreview.uuid;

  /**
   * Callback that is called to fetch data
   */
  const loadData = async (): Promise<UserPreview> => {
    const fetchedUser = await UserPreviewDAL.getUserPreview(props.uuid);

    return fetchedUser;
  };

  /**
   * Callback that is called to validate data
   */
  const validateData = (data: UserPreview) => {
    return !!data;
  };

  /**
   * Callback that is called on fetch or validation error
   */
  const onError = () => {
    navigate(pages.page404.getPath({}));
  };

  /**
   * Callback that is called on fetch and validation success
   */
  const onSuccess = (data: UserPreview) => {
    setUserPreview(data);
  };

  useLoad(
    {
      loadData,
      validateData,
      onSuccess,
      onError,
      dependency: [props.uuid],
    },
  );

  if (!userPreview) {
    return (
      <Loader />
    );
  }

  /**
   * Create way
   */
  const createWay = async (owner: UserPreview) => {
    const newWay: Way = await WayDAL.createWay(owner);
    navigate(pages.way.getPath({uuid: newWay.uuid}));
  };

  return (
    <VerticalContainer>
      <HorizontalContainer className={styles.container}>
        <VerticalContainer className={styles.descriptionSection}>
          <Title
            level={HeadingLevel.h2}
            text={userPreview.name}
            onChangeFinish={(name) => updateUser({
              userToUpdate: {
                uuid: userPreview.uuid,
                name,
              },
              setUser: setUserPreviewPartial,
            })}
            isEditable={isPageOwner}
            className={styles.titleH2}
          />
          <Title
            level={HeadingLevel.h3}
            text={userPreview.email}
            onChangeFinish={(email) => updateUser({
              userToUpdate: {
                uuid: userPreview.uuid,
                email,
              },
              setUser: setUserPreviewPartial,
            })}
            isEditable={isPageOwner}
            className={styles.titleH3}
          />
          <EditableTextarea
            text={userPreview.description}
            onChangeFinish={(description) => updateUser({
              userToUpdate: {
                uuid: userPreview.uuid,
                description,
              },
              setUser: setUserPreviewPartial,
            })}
            isEditable={isPageOwner}
            className={styles.editableTextarea}
          />
        </VerticalContainer>

        <HorizontalContainer className={styles.tabsSection}>
          {wayCollection.map(collection => (
            <Button
              key={collection.id}
              value={`${collection.name} (${collection.uuids.length})`}
              onClick={() => updateUserPageSettings({openedTabId: collection.id})}
              className={styles.collectionButton}
              buttonType={collection.id === userPageSettings.openedTabId ? ButtonType.PRIMARY : ButtonType.SECONDARY}
            />
          ))}

        </HorizontalContainer>
      </HorizontalContainer>

      {isPageOwner &&
      <Button
        value="Create new way"
        onClick={() => createWay(user)}
        buttonType={ButtonType.PRIMARY}
        className={styles.button}
      />
      }

      {/* Render table only for appropriate collection */}
      {wayCollection.filter(collection => collection.id === userPageSettings.openedTabId)
        .map(collection => {

          return (
            <ScrollableBlock key={collection.id}>
              <BaseWaysTable
                title={collection.name}
                wayUuids={collection.uuids}
                filterStatus={userPageSettings.filterStatus}
                setFilterStatus={(
                  filterStatus: WayStatusType | typeof FILTER_STATUS_ALL_VALUE,
                ) => updateUserPageSettings({filterStatus})}
              />
            </ScrollableBlock>
          );
        })}
    </VerticalContainer>
  );
};
