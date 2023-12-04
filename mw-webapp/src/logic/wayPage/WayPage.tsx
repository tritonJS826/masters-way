import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {useUserContext} from "src/component/header/UserContext";
import {Link} from "src/component/link/Link";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {GoalPreviewDAL} from "src/dataAccessLogic/GoalPreviewDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {DayReportsTable} from "src/logic/wayPage/reportsTable/DayReportsTable";
import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import styles from "src/logic/wayPage/WayPage.module.scss";

/**
 * Change description of Way
 */
const updateGoalWay = (wayPreview: WayPreview, description: string) => {
  const newGoal = new GoalPreview({...wayPreview.goal, description});
  GoalPreviewDAL.updateGoalPreview(newGoal);
};

/**
 * PageProps
 */
interface WayPageProps {

  /**
   * Pages's uuid
   */
  uuid: string;
}

/**
 * Way page
 */
export const WayPage = (props: WayPageProps) => {
  const navigate = useNavigate();
  const [way, setWay] = useState<WayPreview>();
  const {user} = useUserContext();
  const isOwner = user?.uid === way?.owner.uuid;

  /**
   * Get Way
   */
  const loadWay = async () => {
    const data = await WayPreviewDAL.getWayPreview(props.uuid);
    // Navigate to PageError if transmitted way's uuid is not exist
    if (!data) {
      navigate(pages.page404.getPath({}));
    }
    setWay(data);
  };

  useEffect(() => {
    loadWay();
  }, []);

  /**
   * Change name of Way
   */
  const changeWayName = (wayPreview: WayPreview, text: string) => {
    const updatedWay = new WayPreview({...wayPreview, name: text});
    WayPreviewDAL.updateWayPreview(updatedWay);
  };

  /**
   * Render all way's mentors
   */
  const renderMentors = (wayPreview: WayPreview) => {
    return wayPreview.currentMentors.map((item) => (
      <Link
        key={item.uuid}
        value={item.name}
        path={pages.user.getPath({uuid: item.uuid})}
        className={styles.mentors}
      />
    ));
  };

  return (
    <>
      {way &&
        <div className={styles.container}>
          <Title
            level={HeadingLevel.h2}
            text={`${way.name}`}
            onChangeFinish={(text) => changeWayName(way, text)}
            isEditable={isOwner}
          />
          <Title
            level={HeadingLevel.h3}
            text="Goal"
            onChangeFinish={(text) => changeWayName(way, text)}
          />
          <EditableTextarea
            text={way.goal.description}
            onChangeFinish={(description) => updateGoalWay(way, description)}
            rows={5}
            isEditable={isOwner}
          />
          {!!renderMentors(way).length && (
            <>
              <Title
                level={HeadingLevel.h3}
                text="Mentors of this way:"
              />
              {renderMentors(way)}
            </>
          )}
          <ScrollableBlock>
            <DayReportsTable way={way} />
          </ScrollableBlock>
        </div>
      }
    </>
  );
};
