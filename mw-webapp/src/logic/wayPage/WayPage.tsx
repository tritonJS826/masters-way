import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {User} from "firebase/auth";
import {Button} from "src/component/button/Button";
import {HeadingLevel, Title} from "src/component/title/Title";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {QueryParamTypes} from "src/logic/QueryParamTypes";
import {ReportsTable} from "src/logic/reportsTable/ReportsTable";
import {handleUserAuthState} from "src/service/auth/handleUserAuthState";
import styles from "src/logic/wayPage/WayPage.module.scss";

/**
 * Way page
 */
export const WayPage = () => {
  const {uuid} = useParams<QueryParamTypes["uuid"]>();
  const [user, setUser] = useState<User | null>(null);
  const [titleStyles, setTitleStyles] = useState(styles.titlePage);
  // eslint-disable-next-line no-console
  console.log(useParams(), "yuse");

  useEffect(() => {
    handleUserAuthState(setUser);
  }, []);

  useEffect(() => {
    if (user) {
      setTitleStyles(styles.titleWhenLoggedIn);
    }

  }, [user]);

  return (
    <div className={styles.container}>
      <Title
        level={HeadingLevel.h2}
        text="Way page"
        className={titleStyles}
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
