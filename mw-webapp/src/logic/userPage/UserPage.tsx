import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {useGlobalContext} from "src/GlobalContext";
import {useLoad} from "src/hooks/useLoad";
import {FavoriteWaysTable} from "src/logic/waysTable/FavoriteWaysTable";
import {MentoringWaysTable} from "src/logic/waysTable/MentoringWaysTable";
import {OwnWaysTable} from "src/logic/waysTable/OwnWaysTable";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
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
 * PageProps
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
  const navigate = useNavigate();
  const {user} = useGlobalContext();
  const isPageOwner = !!user && !!userPreview && user.uuid === userPreview.uuid;

  /**
   * Callback that is called to fetch data
   */
  const loadData = () => UserPreviewDAL.getUserPreview(props.uuid);

  /**
   * Callback that is called to validate data
   */
  const validateData = (data: UserPreview) => !!data.uuid;

  /**
   * Callback that is called on fetch and validation success
   */
  const onSuccess = (data: UserPreview) => {
    setUserPreview(data);
  };

  /**
   * Callback this is called on fetch or validation error
   */
  const onError = () => {
    // Navigate to PageError if transmitted user's uuid is not exist
    navigate(pages.page404.getPath({}));
  };

  const {isLoading} = useLoad({
    loadData,
    validateData,
    onSuccess,
    onError,
    dependencies: [props.uuid],
  },
  );

  if (isLoading || !userPreview) {
    return (
      <span>
        loading..
      </span>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Title
          text="Name:"
          level={HeadingLevel.h3}
        />
        {" "}
        <Title
          level={HeadingLevel.h3}
          text={userPreview.name}
          onChangeFinish={(text) => changeUserName(userPreview, text, setUserPreview)}
          isEditable={isPageOwner}
        />
      </div>
      <div className={styles.row}>
        <Title
          text="Email:"
          level={HeadingLevel.h3}
        />
        {" "}
        <Title
          level={HeadingLevel.h3}
          text={userPreview.email}
          onChangeFinish={(text) => changeUserEmail(userPreview, text, setUserPreview)}
          isEditable={isPageOwner}
        />
      </div>
      <div>
        <Title
          text="Description:"
          level={HeadingLevel.h3}
        />
        <EditableTextarea
          text={userPreview.description}
          onChangeFinish={(text) => changeUserDescription(userPreview, text, setUserPreview)}
          isEditable={isPageOwner}
        />
      </div>
      <Title
        text={`Own Ways (total amount: ${userPreview.ownWays.length} ways)`}
        level={HeadingLevel.h3}
      />
      <ScrollableBlock>
        <OwnWaysTable uuid={props.uuid} />
      </ScrollableBlock>
      <Title
        text={`Mentoring Ways (total amount: ${userPreview.mentoringWays.length} ways)`}
        level={HeadingLevel.h3}
      />
      <ScrollableBlock>
        <MentoringWaysTable
          uuid={props.uuid}
          isPageOwner={isPageOwner}
          handleUserPreviewChange={setUserPreview}
        />
      </ScrollableBlock>
      <Title
        text={`Favorite Ways (total amount: ${userPreview.favoriteWays.length} ways)`}
        level={HeadingLevel.h3}
      />
      <ScrollableBlock>
        <FavoriteWaysTable uuid={props.uuid} />
      </ScrollableBlock>
    </div>
  );
};
