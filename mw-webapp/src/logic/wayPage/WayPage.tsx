import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {HeadingLevel, Title} from "src/component/title/Title";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {DayReportsTable} from "src/logic/reportsTable/DayReportsTable";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import styles from "src/logic/wayPage/WayPage.module.scss";

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
    if (!data.uuid) {
      navigate(pages.page404.getPath({}));
    }
    setWay(data);
  };

  useEffect(() => {
    loadWay();
  }, []);

  return (
    <div className={styles.container}>
      <Title
        level={HeadingLevel.h2}
        text={`Way: ${way?.name}`}
      />
      <DayReportsTable wayUuid={props.uuid} />
    </div>
  );
};
