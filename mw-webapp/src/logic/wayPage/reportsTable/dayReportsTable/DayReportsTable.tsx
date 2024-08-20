import {useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {Columns} from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {ReportsTable} from "src/logic/wayPage/reportsTable/ReportsTable";
import {DayReport} from "src/model/businessModel/DayReport";
import {UserPlain} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {WayStatisticsTriple} from "src/model/businessModel/WayStatistics";
import {LanguageService} from "src/service/LanguageService";
import {arrayToHashMap} from "src/utils/arrayToHashMap";
import styles from "src/logic/wayPage/reportsTable/dayReportsTable/DayReportsTable.module.scss";

const DEFAULT_DAY_REPORTS_PAGINATION_VALUE = 1;

/**
 * DayReportsTable props
 */
interface DayReportsTableProps {

  /**
   * Way of DayReports
   */
  way: Way;

  /**
   * Callback triggered to update way statistics triple
   */
  setWayStatisticsTriple: (wayStatisticsTriple: WayStatisticsTriple) => void;

  /**
   * Composite way participants
   */
  compositeWayParticipant: UserPlain[];

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
  const [dayReportsPagination, setDayReportsPagination] = useState<number>(DEFAULT_DAY_REPORTS_PAGINATION_VALUE);

  const wayParticipantsMap = arrayToHashMap({keyField: "uuid", list: props.compositeWayParticipant});

  const isMoreDayReportsExist = props.way.dayReports.length < props.way.dayReportsAmount;

  /**
   * Load more dayReports
   */
  const loadMoreDayReports = async () => {
    const nextPage = dayReportsPagination + DEFAULT_DAY_REPORTS_PAGINATION_VALUE;

    const dayReports = await DayReportDAL.getDayReports({page: nextPage, wayId: props.way.uuid, wayName: "Coming soon"});
    props.way.updateDayReports(dayReports.dayReports);
    setDayReportsPagination(nextPage);
  };

  return (
    <>
      <HorizontalContainer className={styles.titleContainer}>
        <Title
          level={HeadingLevel.h2}
          text={`${LanguageService.way.reportsTable.title[language]} (${props.way.dayReports.length})`}
          placeholder=""
        />
        <Title
          level={HeadingLevel.h2}
          text={`${LanguageService.way.reportsTable.total[language]} ${props.way.dayReportsAmount}`}
          placeholder=""
        />
      </HorizontalContainer>
      <VerticalContainer className={styles.dayReportsContent}>
        <ScrollableBlock>
          <ReportsTable
            data={props.way.dayReports}
            columns={Columns({
              way: props.way,
              setWayStatisticsTriple: props.setWayStatisticsTriple,
              createDayReport: props.createDayReport,
              wayParticipantsMap,
            })}
          />
        </ScrollableBlock>
        {isMoreDayReportsExist &&
        <Button
          onClick={loadMoreDayReports}
          value={LanguageService.way.reportsTable.loadMoreButton[language]}
          buttonType={ButtonType.PRIMARY}
          className={styles.loadMoreButton}
        />
        }
      </VerticalContainer>
    </>
  );
});
