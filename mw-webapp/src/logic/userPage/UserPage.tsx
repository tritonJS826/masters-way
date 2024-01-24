import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {Loader} from "src/component/loader/Loader";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {SafeMap} from "src/dataAccessLogic/SafeMap";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {useGlobalContext} from "src/GlobalContext";
import {useLoad} from "src/hooks/useLoad";
import {FavoriteWaysTable} from "src/logic/waysTable/FavoriteWaysTable";
import {MentoringWaysTable} from "src/logic/waysTable/MentoringWaysTable";
import {OwnWaysTable} from "src/logic/waysTable/OwnWaysTable";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WAY_UUID_FIELD} from "src/model/DTOModel/WayDTO";
import {pages} from "src/router/pages";
import {arrayToHashMap} from "src/utils/arrayToHashMap";
import styles from "src/logic/userPage/UserPage.module.scss";

/**
 * Change user's name
 */
const changeUserName = (user: UserPreview, text: string, callback: (user: UserPreview) => void) => {
  const updatedUser = new UserPreview({...user, name: text});
  callback(updatedUser);
  UserPreviewDAL.updateUserPreview(updatedUser);
};

/**
 * Change user's email
 */
const changeUserEmail = (user: UserPreview, text: string, callback: (user: UserPreview) => void) => {
  const updatedUser = new UserPreview({...user, email: text});
  callback(updatedUser);
  UserPreviewDAL.updateUserPreview(updatedUser);
};

/**
 * Change user's description
 */
const changeUserDescription = (user: UserPreview, text: string, callback: (user: UserPreview) => void) => {
  const updatedUser = new UserPreview({...user, description: text});
  callback(updatedUser);
  UserPreviewDAL.updateUserPreview(updatedUser);
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

  return (
    <div className={styles.container}>
      <Title
        level={HeadingLevel.h2}
        text={userPreview.name}
        onChangeFinish={(text) => changeUserName(userPreview, text, setUserPreview)}
        isEditable={isPageOwner}
        className={styles.titleH2}
      />
      <Title
        level={HeadingLevel.h3}
        text={userPreview.email}
        onChangeFinish={(text) => changeUserEmail(userPreview, text, setUserPreview)}
        isEditable={isPageOwner}
        className={styles.titleH3}
      />
      <EditableTextarea
        text={userPreview.description}
        onChangeFinish={(text) => changeUserDescription(userPreview, text, setUserPreview)}
        isEditable={isPageOwner}
        className={styles.editableTextarea}
      />
      <ScrollableBlock>
        <OwnWaysTable
          uuid={props.uuid}
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
