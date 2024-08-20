import {createColumnHelper} from "@tanstack/react-table";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Infotip} from "src/component/infotip/Infotip";
import {SafeMap} from "src/dataAccessLogic/SafeMap";
import {languageStore} from "src/globalStore/LanguageStore";
import {userStore} from "src/globalStore/UserStore";
import {ReportsTableCommentsCell}
  from "src/logic/wayPage/reportsTable/reportsColumns/reportsTableCommentsCell/ReportsTableCommentsCell";
import {ReportsTableDateCell} from "src/logic/wayPage/reportsTable/reportsColumns/reportsTableDateCell/ReportsTableDateCell";
import {ReportsTableJobsDoneCell}
  from "src/logic/wayPage/reportsTable/reportsColumns/reportsTableJobsDoneCell/ReportsTableJobsDoneCell";
import {ReportsTablePlansCell} from "src/logic/wayPage/reportsTable/reportsColumns/reportsTablePlansCell/ReportsTablePlansCell";
import {ReportsTableProblemsCell}
  from "src/logic/wayPage/reportsTable/reportsColumns/reportsTableProblemsCell/ReportsTableProblemsCell";
import {DayReport} from "src/model/businessModel/DayReport";
import {UserPlain} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {WayStatisticsTriple} from "src/model/businessModel/WayStatistics";
import {LanguageService} from "src/service/LanguageService";
import {arrayToHashMap} from "src/utils/arrayToHashMap";
import {Symbols} from "src/utils/Symbols";
import styles from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns.module.scss";

export const DEFAULT_SUMMARY_TIME = 0;
export const MAX_TIME = 9999;
export const MIN_TIME = 0;
const columnHelper = createColumnHelper<DayReport>();
const DIFFERENCE_INDEX_LIST_NUMBER = 1;

/**
 * Get time in minutes till {@link MAX_TIME}
 */
export const getValidatedTime = (time: number) => {
  return time <= MAX_TIME
    ? time
    : MAX_TIME;
};

/**
 * Convert index of element to list number
 */
export const getListNumberByIndex = (index: number) => {
  const listNumber = `${index + DIFFERENCE_INDEX_LIST_NUMBER}.${Symbols.NO_BREAK_SPACE}`;

  return listNumber;
};

/**
 * Columns props
 */
interface ColumnsProps {

  /**
   * Way
   */
  way: Way;

  /**
   * Callback triggered to update way statistics triple
   */
  setWayStatisticsTriple: (wayStatisticsTriple: WayStatisticsTriple) => void;

  /**
   * Way's participants
   */
  wayParticipantsMap: Map<string, UserPlain>;

  /**
   * Create new day report
   */
  createDayReport: (wayUuid: string, dayReportUuids: DayReport[]) => Promise<DayReport>;
}

/**
 * Table columns
 * Don't get rid of any https://github.com/TanStack/table/issues/4382
 */
export const Columns = (props: ColumnsProps) => {
  const {user} = userStore;
  const {language} = languageStore;
  const ownerUuid = props.way.owner.uuid;
  const isOwner = user?.uuid === ownerUuid;
  const isMentor = !!user && !!user.uuid && props.way.mentors.has(user.uuid);
  const isUserOwnerOrMentor = isOwner || isMentor;
  const isWayComposite = props.way.children.length !== 0;

  const participantsSafeMap = new SafeMap(props.wayParticipantsMap);

  const participantWaysLabelsMap =
    arrayToHashMap({keyField: "uuid", list: props.way.children.concat(props.way)});

  // Props.way.children.flatMap((item) => item.jobTags).concat(props.way.jobTags)

  const participantWaysLabelsSafeMap = new SafeMap(participantWaysLabelsMap);

  const columns = [
    columnHelper.accessor("createdAt", {

      /**
       * Header
       */
      header: () => (
        <HorizontalContainer className={styles.columnTitle}>
          <Infotip content={LanguageService.way.infotip.createdDate[language]} />
          {LanguageService.way.reportsTable.column.date[language]}
        </HorizontalContainer>
      ),

      /**
       * Cell  with date value
       */
      cell: ({row}) => <ReportsTableDateCell date={row.original.createdAt} />,
    }),
    columnHelper.accessor("jobsDone", {

      /**
       * Header
       */
      header: () => (
        <HorizontalContainer className={styles.columnTitle}>
          <Infotip content={LanguageService.way.infotip.jobs[language]} />
          {LanguageService.way.reportsTable.column.jobsDone[language]}
        </HorizontalContainer>
      ),

      /**
       * Cell with JobsDone items
       */
      cell: ({row}) => (
        <ReportsTableJobsDoneCell
          user={user}
          dayReport={row.original}
          isEditable={isUserOwnerOrMentor}
          jobTags={props.way.children.flatMap((item) => item.jobTags).concat(props.way.jobTags)}
          labelsMap={participantWaysLabelsSafeMap}
          labels={props.way.children.flatMap((item) => item.jobTags).concat(props.way.jobTags)}
          wayUuid={props.way.uuid}
          wayName={props.way.name}
          setWayStatisticsTriple={props.setWayStatisticsTriple}
          isWayComposite={isWayComposite}
          wayParticipantsMap={participantsSafeMap}
        />
      ),
    }),
    columnHelper.accessor("plans", {

      /**
       * Header
       */
      header: () => (
        <HorizontalContainer className={styles.columnTitle}>
          <Infotip content={LanguageService.way.infotip.plans[language]} />
          {LanguageService.way.reportsTable.column.plans[language]}
        </HorizontalContainer>
      ),

      /**
       * Cell with Plan items
       */
      cell: ({row}) => (
        <ReportsTablePlansCell
          dayReport={row.original}
          isEditable={isUserOwnerOrMentor}
          jobTags={props.way.children.flatMap((item) => item.jobTags).concat(props.way.jobTags)}
          labelsMap={participantWaysLabelsSafeMap}
          way={props.way}
          createDayReport={props.createDayReport}
          user={user}
          wayParticipantsMap={participantsSafeMap}
        />
      ),
    }),
    columnHelper.accessor("problems", {

      /**
       * Header
       */
      header: () => (
        <HorizontalContainer className={styles.columnTitle}>
          <Infotip content={LanguageService.way.infotip.problems[language]} />
          {LanguageService.way.reportsTable.column.problems[language]}
        </HorizontalContainer>
      ),

      /**
       * Cell with Problems items
       */
      cell: ({row}) => (
        <ReportsTableProblemsCell
          dayReport={row.original}
          isEditable={isUserOwnerOrMentor}
          way={props.way}
          user={user}
          wayParticipantsMap={participantsSafeMap}
        />
      ),
    }),
    columnHelper.accessor("comments", {

      /**
       * Header
       */
      header: () => (
        <HorizontalContainer className={styles.columnTitle}>
          <Infotip content={LanguageService.way.infotip.comments[language]} />
          {LanguageService.way.reportsTable.column.comments[language]}
        </HorizontalContainer>
      ),

      /**
       * Cell with Comments items
       */
      cell: ({row}) => (
        <ReportsTableCommentsCell
          dayReport={row.original}
          isEditable={isUserOwnerOrMentor}
          way={props.way}
          user={user}
          wayParticipantsMap={participantsSafeMap}
        />
      ),
    }),
  ];

  return columns;
};
