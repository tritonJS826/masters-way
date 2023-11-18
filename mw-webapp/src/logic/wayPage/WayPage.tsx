import {HeadingLevel, Title} from "src/component/title/Title";
import {DayReportsTable} from "src/logic/reportsTable/DayReportsTable";
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
  return (
    <div className={styles.container}>
      <Title
        level={HeadingLevel.h2}
        text="Way page"
      />
      <DayReportsTable wayUuid={props.uuid} />
    </div>
  );
};
