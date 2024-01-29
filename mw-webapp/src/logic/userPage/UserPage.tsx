import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, ButtonType} from "src/component/button/Button";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {Loader} from "src/component/loader/Loader";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {SafeMap} from "src/dataAccessLogic/SafeMap";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {useGlobalContext} from "src/GlobalContext";
import {useLoad} from "src/hooks/useLoad";
import {FavoriteWaysTable} from "src/logic/waysTable/FavoriteWaysTable";
import {MentoringWaysTable} from "src/logic/waysTable/MentoringWaysTable";
import {OwnWaysTable} from "src/logic/waysTable/OwnWaysTable";
import {Way} from "src/model/businessModel/Way";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WAY_UUID_FIELD} from "src/model/DTOModel/WayDTO";
import {pages} from "src/router/pages";
import {arrayToHashMap} from "src/utils/arrayToHashMap";
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
 * User Page Data
 */
interface UserPageData {

  /**
   * User Preview
   */
  userPreview: UserPreview;

  /**
   * Own Ways Preview
   */
  ownWaysPreview: WayPreview[];

  /**
   * Mentoring Ways Preview
   */
  mentoringWaysPreview: WayPreview[];

  /**
   * Favorite Ways Preview
   */
  favoriteWaysPreview: WayPreview[];
}

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
 * User page
 */
export const UserPage = (props: UserPageProps) => {
  const [userPreview, setUserPreview] = useState<UserPreview>();

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

  const [ownWays, setOwnWays] = useState<WayPreview[]>([]);
  const [mentoringWays, setMentoringWays] = useState<WayPreview[]>([]);
  const [favoriteWays, setFavoriteWays] = useState<WayPreview[]>([]);

  const navigate = useNavigate();
  const {user} = useGlobalContext();
  const isPageOwner = !!user && !!userPreview && user.uuid === userPreview.uuid;

  /**
   * Callback that is called to fetch data
   */
  const loadData = async (): Promise<UserPageData> => {
    const fetchedUserPreview = await UserPreviewDAL.getUserPreview(props.uuid);

    const allNeededWayUuids = new Set([
      ...fetchedUserPreview.ownWays,
      ...fetchedUserPreview.mentoringWays,
      ...fetchedUserPreview.favoriteWays,
    ]);

    const allNeededWaysPreviewPromise = WayPreviewDAL.getWaysPreviewByUuids(Array.from(allNeededWayUuids));

    const [allNeededWaysPreview] = await Promise.all([allNeededWaysPreviewPromise]);

    const waysHashmap = arrayToHashMap({keyField: WAY_UUID_FIELD, list: allNeededWaysPreview});

    const waysSafeHashmap = new SafeMap(waysHashmap);

    const ownWaysPreview = fetchedUserPreview.ownWays.map((ownWay) => waysSafeHashmap.getValue(ownWay));
    const mentoringWaysPreview = fetchedUserPreview.mentoringWays.map((mentoringWay) => waysSafeHashmap.getValue(mentoringWay));
    const favoriteWaysPreview = fetchedUserPreview.favoriteWays.map((favoriteWay) => waysSafeHashmap.getValue(favoriteWay));

    return {
      userPreview: fetchedUserPreview,
      ownWaysPreview,
      mentoringWaysPreview,
      favoriteWaysPreview,
    };
  };

  /**
   * Callback that is called to validate data
   */
  const validateData = (data: UserPageData) => {
    return !!data.userPreview && !!data.ownWaysPreview && !!data.mentoringWaysPreview && !!data.favoriteWaysPreview;
  };

  /**
   * Callback that is called on fetch or validation error
   */
  const onError = () => {
    // Navigate to 404 Page if user with transmitted uuid doesn't exist
    navigate(pages.page404.getPath({}));
  };

  /**
   * Callback that is called on fetch and validation success
   */
  const onSuccess = (data: UserPageData) => {
    setOwnWays(data.ownWaysPreview);
    setMentoringWays(data.mentoringWaysPreview);
    setFavoriteWays(data.favoriteWaysPreview);

    setUserPreview(data.userPreview);
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
    <div className={styles.container}>
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
      {isPageOwner &&
      <Button
        value="Create new way"
        onClick={() => createWay(user)}
        buttonType={ButtonType.PRIMARY}
        className={styles.button}
      />
      }
      <ScrollableBlock>
        <OwnWaysTable
          ownWays={ownWays}
          isPageOwner={isPageOwner}
        />
      </ScrollableBlock>
      <ScrollableBlock>
        <MentoringWaysTable
          uuid={props.uuid}
          mentoringWays={mentoringWays}
          isPageOwner={isPageOwner}
        />
      </ScrollableBlock>
      <ScrollableBlock>
        <FavoriteWaysTable favoriteWays={favoriteWays} />
      </ScrollableBlock>
    </div>
  );
};
