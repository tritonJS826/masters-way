import {Button} from "src/component/button/Button";
import {HeadingLevel, Title} from "src/component/title/Title";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {ReportsTable} from "src/logic/reportsTable/ReportsTable";
import styles from "src/logic/wayPage/WayPage.module.scss";

/**
 * Way page includes {@link ReportsTable}
 */
export const WayPage = () => {
  return (
    <div className={styles.container}>
      <Title
        level={HeadingLevel.h2}
        text="Way page"
      />
      <Button
        value="Create new day report"
        onClick={DayReportDAL.createNewDayReport}
      />
      <ReportsTable />
    </div>
  );
};
