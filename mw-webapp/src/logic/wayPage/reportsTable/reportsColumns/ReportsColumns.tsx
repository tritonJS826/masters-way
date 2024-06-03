import {createColumnHelper} from "@tanstack/react-table";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
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
import {Way} from "src/model/businessModel/Way";
import {LanguageService} from "src/service/LanguageService";
import {Symbols} from "src/utils/Symbols";
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

  const columns = [
    columnHelper.accessor("createdAt", {

      /**
       * Header
       */
      header: () => (
        <Tooltip
          position={PositionTooltip.TOP}
          content={LanguageService.way.reportsTable.columnTooltip.date[language]}
        >
          {LanguageService.way.reportsTable.column.date[language]}
        </Tooltip>
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
        <Tooltip
          position={PositionTooltip.TOP}
          content={LanguageService.way.reportsTable.columnTooltip.jobsDone[language]}
        >
          {LanguageService.way.reportsTable.column.jobsDone[language]}
        </Tooltip>
      ),

      /**
       * Cell with JobsDone items
       */
      cell: ({row}) => (
        <ReportsTableJobsDoneCell
          user={user}
          dayReport={row.original}
          isEditable={isUserOwnerOrMentor}
          jobTags={props.way.jobTags}
        />
      ),
    }),
    columnHelper.accessor("plans", {

      /**
       * Header
       */
      header: () => (
        <Tooltip
          position={PositionTooltip.TOP}
          content={LanguageService.way.reportsTable.columnTooltip.plans[language]}
        >
          {LanguageService.way.reportsTable.column.plans[language]}
        </Tooltip>
      ),

      /**
       * Cell with Plan items
       */
      cell: ({row}) => (
        <ReportsTablePlansCell
          dayReport={row.original}
          isEditable={isUserOwnerOrMentor}
          jobTags={props.way.jobTags}
          way={props.way}
          createDayReport={props.createDayReport}
          user={user}
        />
      ),
    }),
    columnHelper.accessor("problems", {

      /**
       * Header
       */
      header: () => (
        <Tooltip
          position={PositionTooltip.TOP}
          content={LanguageService.way.reportsTable.columnTooltip.problems[language]}
        >
          {LanguageService.way.reportsTable.column.problems[language]}
        </Tooltip>
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
        />
      ),
    }),
    columnHelper.accessor("comments", {

      /**
       * Header
       */
      header: () => (
        <Tooltip
          position={PositionTooltip.TOP_LEFT}
          content={LanguageService.way.reportsTable.columnTooltip.comments[language]}
        >
          {LanguageService.way.reportsTable.column.comments[language]}
        </Tooltip>
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
        />
      ),
    }),
  ];

  return columns;
};
