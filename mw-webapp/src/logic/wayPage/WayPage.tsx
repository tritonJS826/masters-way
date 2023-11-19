import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {EditableText} from "src/component/editableText/EditableText";
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
  const [wayName, setWayName] = useState<string>("");

  let data: WayPreview;

  /**
   * Get Way
   */
  const loadWay = async () => {
    data = await WayPreviewDAL.getWayPreview(props.uuid);
    // Navigate to PageError if transmitted way's uuid is not exist
    if (!data.uuid) {
      navigate(pages.page404.getPath({}));
    }
    setWayName(data.name);
  };

  useEffect(() => {
    loadWay();
  }, []);

  return (
    <>
      {wayName &&
        <div className={styles.container}>
          <EditableText
            text={`${wayName}`}
            onChangeFinish={(text) => WayPreviewDAL.updateWayPreview({...data, name: text})}
            className={styles.wayName}
          />
          <DayReportsTable wayUuid={props.uuid} />
        </div>
      }
    </>
  );
};
