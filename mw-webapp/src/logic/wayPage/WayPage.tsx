import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HeadingLevel, Title} from "src/component/title/Title";
import {GoalPreviewDAL} from "src/dataAccessLogic/GoalPreviewDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {DayReportsTable} from "src/logic/reportsTable/DayReportsTable";
import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import styles from "src/logic/wayPage/WayPage.module.scss";

/**
 * Change name of Way
 */
const changeWayName = (wayPreview: WayPreview, text: string) => {
  const updatedWay = new WayPreview({...wayPreview, name: text});
  WayPreviewDAL.updateWayPreview(updatedWay);
};

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

  return (
    <>
      {way &&
        <div className={styles.container}>
          <Title
            level={HeadingLevel.h2}
            text={`${way.name}`}
            onChangeFinish={(text) => changeWayName(way, text)}
            isEditable={true}
          />
          <EditableTextarea
            text={way.goal.description}
            onChangeFinish={(description) => updateGoalWay(way, description)}
          />

          <DayReportsTable wayUuid={props.uuid} />
        </div>
      }
    </>
  );
};
