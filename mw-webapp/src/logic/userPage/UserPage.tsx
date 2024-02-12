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
import {usePersistanceState} from "src/hooks/usePersistanceState";
import {BaseWaysTable, FILTER_STATUS_ALL_VALUE} from "src/logic/waysTable/BaseWaysTable";
import {WayStatusType} from "src/logic/waysTable/wayStatus";
import {Way} from "src/model/businessModel/Way";
import {UserPreview, WaysCollection as WayCollection} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import {UserPageSettings, WayView} from "src/utils/LocalStorageWorker";
import {PartialWithId, PartialWithUuid} from "src/utils/PartialWithUuid";
import {v4 as uuidv4} from "uuid";
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
  view: WayView.Card,
};

/**
 * Safe opened tab from localStorage
 */
const userPageSettingsValidator = (currentSettings: UserPageSettings, allCollections: WayCollection[]) => {
  const isTabExist = currentSettings.openedTabId
    && allCollections.some(collection => collection.id === currentSettings.openedTabId);

  if (!isTabExist || !currentSettings.filterStatus) {
    return false;
  }

  return true;
};

/**
 * Get all way collections
 */
const getAllWayCollections = (userPreview: UserPreview): WayCollection[] => [
  {
    id: DefaultCollections.OWN,
    name: "Own ways",
    wayUuids: userPreview.ownWays ?? [],
  }, {
    id: DefaultCollections.MENTORING,
    name: "Mentoring ways",
    wayUuids: userPreview.mentoringWays ?? [],
  },
  {
    id: DefaultCollections.FAVORITE,
    name: "Favorite ways",
    wayUuids: userPreview.favoriteWays ?? [],
  },
  ...(userPreview.customWayCollections ?? []),
];

/**
 * User page
 */
export const UserPage = (props: UserPageProps) => {
  const [userPreview, setUserPreview] = useState<UserPreview>();
  const [userPageSettings,, updateUserPageSettings] = usePersistanceState({
    key: "userPage",
    defaultValue: DEFAULT_USER_PAGE_SETTINGS,

    /**
     * Check is stored data valid
     */
    storedDataValidator: (
      currentSettings: UserPageSettings,
    ) => userPreview?.customWayCollections
      ? userPageSettingsValidator(currentSettings, getAllWayCollections(userPreview))
      : true,
  });

  /**
   * Update userPreview state
   */
  const setUserPreviewPartial = (updatedUser: Partial<UserPreview>) => {
    setUserPreview((prevUser?: UserPreview) => {
      if (!prevUser) {
        throw new Error("Previous user is undefined");
      }

      return {...prevUser, ...updatedUser};
    });
  };

  const navigate = useNavigate();
  const {user, setUser} = useGlobalContext();
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

  if (!userPreview || !userPageSettings) {
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

  /**
   * Create collection
   */
  const createCustomWayCollection = async () => {
    if (!user) {
      throw new Error("User is not defined");
    }
    const newWayCollectionId = uuidv4();
    const newWayCollection: WayCollection = {
      id: newWayCollectionId,
      name: "New collection",
      wayUuids: [],
    };

    const updatedCustomWayCollections = user.customWayCollections.concat(newWayCollection);

    await UserPreviewDAL.updateUserPreview({
      uuid: user.uuid,
      customWayCollections: updatedCustomWayCollections,
    });
    setUserPreviewPartial({customWayCollections: updatedCustomWayCollections});
    setUser({...user, customWayCollections: updatedCustomWayCollections});

    updateUserPageSettings({openedTabId: newWayCollectionId});
  };

  /**
   * Delete custom way collection
   */
  const deleteCustomWayCollections = async (collectionId: string) => {
    if (!user) {
      throw new Error("User is not defined");
    }
    const updatedCustomWayCollections = user.customWayCollections
      .filter(collection => collection.id !== collectionId);

    await UserPreviewDAL.updateUserPreview({
      uuid: user.uuid,
      customWayCollections: updatedCustomWayCollections,
    });
    setUserPreviewPartial({customWayCollections: updatedCustomWayCollections});
    setUser({...user, customWayCollections: updatedCustomWayCollections});

    updateUserPageSettings({openedTabId: DEFAULT_USER_PAGE_SETTINGS.openedTabId});
  };

  /**
   * Update custom way collection
   */
  const updateCustomWayCollection = async (wayCollectionToUpdate: PartialWithId<WayCollection>) => {
    if (!user) {
      throw new Error("User is not defined");
    }

    const updatedCustomWayCollections = user.customWayCollections
      .map(collection => {
        if (collection.id === wayCollectionToUpdate.id) {
          return {...collection, ...wayCollectionToUpdate};
        } else {
          return collection;
        }
      });

    await UserPreviewDAL.updateUserPreview({
      uuid: user.uuid,
      customWayCollections: updatedCustomWayCollections,
    });
    setUserPreviewPartial({customWayCollections: updatedCustomWayCollections});
    setUser({...user, customWayCollections: updatedCustomWayCollections});

    updateUserPageSettings({openedTabId: wayCollectionToUpdate.id});
  };

  const isCollectionExist = userPreview.customWayCollections.find(x => x.id === userPageSettings.openedTabId);

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
          {getAllWayCollections(userPreview).map(collection => (
            <Button
              key={collection.id}
              value={`${collection.name} (${collection.wayUuids.length})`}
              onClick={() => updateUserPageSettings({openedTabId: collection.id})}
              className={styles.collectionButton}
              buttonType={collection.id === userPageSettings.openedTabId ? ButtonType.PRIMARY : ButtonType.SECONDARY}
            />
          ))}

          {isPageOwner && (
            <Button
              value="Add collection"
              onClick={createCustomWayCollection}
              className={styles.collectionButton}
              buttonType={ButtonType.SECONDARY}
            />
          )}

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
      {getAllWayCollections(userPreview)
        .filter(collection => isCollectionExist
          ? collection.id === userPageSettings.openedTabId
          : collection.id === DefaultCollections.OWN)
        .map(collection => {
          const isCustomCollection = userPreview.customWayCollections.some((col) => col.id === collection.id);

          return (
            <ScrollableBlock key={collection.id}>
              <BaseWaysTable
                title={collection.name}
                wayUuids={collection.wayUuids}
                updateCollection={isCustomCollection
                  ? (wayCollection: Partial<WayCollection>) => updateCustomWayCollection({id: collection.id, ...wayCollection})
                  : undefined
                }
                deleteCollection={isCustomCollection ? () => deleteCustomWayCollections(collection.id) : undefined}
                filterStatus={userPageSettings.filterStatus}
                setFilterStatus={(
                  filterStatus: WayStatusType | typeof FILTER_STATUS_ALL_VALUE,
                ) => updateUserPageSettings({filterStatus})}
                view={userPageSettings.view}
                setView={(view: WayView) => updateUserPageSettings({view})}
              />
            </ScrollableBlock>
          );
        })}

    </VerticalContainer>
  );
};
