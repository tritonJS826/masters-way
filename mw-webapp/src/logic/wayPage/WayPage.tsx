import {useNavigate, useParams} from "react-router-dom";
import {HeadingLevel, Title} from "src/component/title/Title";
import {DayReportsTable} from "src/logic/reportsTable/DayReportsTable";
import {pages} from "src/router/pages";
import styles from "src/logic/wayPage/WayPage.module.scss";

/**
 * Way page
 */
export const WayPage = () => {
  const navigate = useNavigate();
  const {uuid} = useParams();

  return (
    <>
      {uuid ?
        <div className={styles.container}>
          <Title
            level={HeadingLevel.h2}
            text="Way page"
          />
          <DayReportsTable wayUuid={uuid} />
        </div>
        :
        navigate(pages.page404.getPath())
      }
    </>
  );
};
