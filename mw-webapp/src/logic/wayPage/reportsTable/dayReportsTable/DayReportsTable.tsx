import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {Columns} from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {ReportsTable} from "src/logic/wayPage/reportsTable/ReportsTable";
import {DayReport} from "src/model/businessModel/DayReport";
import {Way} from "src/model/businessModel/Way";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/wayPage/reportsTable/dayReportsTable/DayReportsTable.module.scss";

/**
 * DayReportsTable props
 */
interface DayReportsTableProps {

  /**
   * Way of DayReports
   */
  way: Way;

  /**
   * Set day reports
   */
  setDayReports: (dayReports: DayReport[] | ((prevDayReports: DayReport[]) => DayReport[])) => void;

  /**
   * Create new day report
   */
  createDayReport: (wayUuid: string, dayReportUuids: DayReport[]) => Promise<DayReport>;
}

/**
 * Render table with dayReports of specific way
 *
 * TODO:  get rid statistics in this component,
 * move load logic to the parent component and share data with other components
 */
export const DayReportsTable = observer((props: DayReportsTableProps) => {
  const {language} = languageStore;
  const VISIBLE_REPORTS_CHUNK = 7;
  const [visibleReports, setVisibleReports] = useState(props.way.dayReports.slice(0, VISIBLE_REPORTS_CHUNK));
  useEffect(() => {
    const updatedVisibleReports = props.way.dayReports.length <= VISIBLE_REPORTS_CHUNK
      ? props.way.dayReports.length
      : visibleReports.length;
    setVisibleReports(props.way.dayReports.slice(0, updatedVisibleReports));
  }, [props.way.dayReports]);

  /**
   * Show more reports for user
   */
  const showMoreReports = () => {
    setVisibleReports(props.way.dayReports.slice(0, visibleReports.length + VISIBLE_REPORTS_CHUNK));
  };

  const isShowMoreReportsButtonVisible = visibleReports.length < props.way.dayReports.length;

  return (
    <>
      <HorizontalContainer className={styles.titleContainer}>
        <Title
          level={HeadingLevel.h2}
          text={`${LanguageService.way.reportsTable.title[language]} 
          (${Math.min(props.way.dayReports.length, visibleReports.length)})`}
        />
        <Title
          level={HeadingLevel.h2}
          text={`${LanguageService.way.reportsTable.total[language]} ${props.way.dayReports.length}`}
        />
      </HorizontalContainer>
      <VerticalContainer className={styles.dayReportsContent}>
        <ScrollableBlock>
          <ReportsTable
            data={visibleReports}
            columns={Columns({
              setDayReports: props.setDayReports,
              way: props.way,
              createDayReport: props.createDayReport,
            })}
          />
        </ScrollableBlock>
        {isShowMoreReportsButtonVisible &&
        <Button
          onClick={showMoreReports}
          value={LanguageService.way.reportsTable.loadMoreButton[language]}
          buttonType={ButtonType.PRIMARY}
          className={styles.loadMoreButton}
        />
        }
      </VerticalContainer>
    </>
  );
});
