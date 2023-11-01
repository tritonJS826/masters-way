import {useParams} from "react-router-dom";
import {Button} from "src/component/button/Button";
import {HeadingLevel, Title} from "src/component/title/Title";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {QueryParamTypes} from "src/logic/QueryParamTypes";
import {ReportsTable} from "src/logic/reportsTable/ReportsTable";
import styles from "src/logic/wayPage/WayPage.module.scss";

/**
 * Way page
 */
export const WayPage = () => {
  const {uuid} = useParams<QueryParamTypes["uuid"]>();

  return (
    <div className={styles.container}>
      <Title
        level={HeadingLevel.h2}
        text="Way page"
      />
      {uuid ?
        <Button
          value="Create new day report"
          onClick={() => DayReportDAL.createDayReport(uuid)}
        />
        :
        null
      }
      <ReportsTable />
    </div>
  );
};
