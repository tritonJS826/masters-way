import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
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
   * Page's uuid
   */
  uuid: string;
}

/**
 * User page
 */
export const UserPage = (props: UserPageProps) => {
  const [userPreview, setUserPreview] = useState<UserPreview | null>(null);
  const navigate = useNavigate();

  /**
   * Load user
   */
  const getUser = async () => {
    const user = await UserPreviewDAL.getUserPreview(props.uuid);
    // Navigate to PageError if transmitted user's uuid is not exist
    if (!user.uuid) {
      navigate(pages.page404.getPath({}));
    }
    setUserPreview(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    userPreview &&
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
          isEditable={true}
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
          isEditable={true}
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
        />
      </div>
      <Title
        text= {`Own Ways (totally ${userPreview.ownWays.length} ways)`}
        level={HeadingLevel.h3}
      />
      <ScrollableBlock>
        <OwnWaysTable uuid={props.uuid} />
      </ScrollableBlock>
      <Title
        text={`Mentoring Ways (totally ${userPreview.mentoringWays.length} ways)`}
        level={HeadingLevel.h3}
      />
      <ScrollableBlock>
        <MentoringWaysTable uuid={props.uuid} />
      </ScrollableBlock>
      <Title
        text={`Favorite Ways (totally ${userPreview.favoriteWays.length} ways)`}
        level={HeadingLevel.h3}
      />
      <ScrollableBlock>
        <FavoriteWaysTable uuid={props.uuid} />
      </ScrollableBlock>
    </div>
  );
};
