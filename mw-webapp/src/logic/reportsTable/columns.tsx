import {createColumnHelper} from "@tanstack/react-table";
import {Button} from "src/component/button/Button";
import {addCellItem} from "src/logic/reportsTable/renderCellValue/helpers/addCellItem";
import {renderCellDate} from "src/logic/reportsTable/renderCellValue/renderCellDate";
import {renderCellIsDayOff} from "src/logic/reportsTable/renderCellValue/renderCellIsDayOff";
import {renderCellItem} from "src/logic/reportsTable/renderCellValue/renderCellItem";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {DOT} from "src/utils/unicodeSymbols";
import styles from "src/logic/reportsTable/columns.module.scss";

const DEFAULT_SUMMARY_TIME = 0;

const columnHelper = createColumnHelper<DayReport>();

/**
 * Determines which columns will be in the table, the values in the cells and what types of data can be rendered in cells
 * The tanstack table has a bug about typing columns:
 * https://github.com/TanStack/table/issues/4382
 * According to creators should only be using the column helper and not pre-typing columns
 * We can add type as:
 * ColumnDef<DayReport, Date & JobDone[] & PlanForNextPeriod[] & CurrentProblem[] & MentorComment[] & string[] & boolean>
 * but it's not recommend by creators
 */
export const columns = [
  columnHelper.accessor<"date", Date>("date", {
    header: "Date",

    /**
     * Cell with date value
     */
    cell: (dateValue) => renderCellDate(dateValue),
  }),
  columnHelper.accessor<"jobsDone", JobDone[]>("jobsDone", {
    header: "Sum time",

    /**
     * Cell with summary of work time
     */
    cell: (({row}) => {
      return (
        row.original.jobsDone
          .reduce((summaryTime, jobDone) => jobDone.time + summaryTime, DEFAULT_SUMMARY_TIME)
      );
    }),
  }),
  columnHelper.accessor<"jobsDone", JobDone[]>("jobsDone", {
    header: "Jobs done (minutes)",

    /**
     * Cell with JobsDone items
     */
    cell: ({row}) => {
      return (
        <div className={styles.cell}>
          {row.original.jobsDone
            .map((jobDoneItem) => (
              <li
                className={styles.cellItem}
                key={jobDoneItem.uuid}
              >
                {renderCellItem({content: jobDoneItem.description, arrayItem: jobDoneItem})}
                {DOT}
                {renderCellItem({content: `${jobDoneItem.time}`, arrayItem: jobDoneItem, time: true})}
              </li>
            ),
            )
          }
          <Button
            value="add job"
            onClick={() => addCellItem({rowUuid: row.original.uuid, dataType: "JobDone"})}
          />
        </div>
      );
    },
  }),
  columnHelper.accessor<"plansForNextPeriod", PlanForNextPeriod[]>("plansForNextPeriod", {
    header: "Plans for tomorrow (minutes)",

    /**
     * Cell with PlanForNextPeriod items
     */
    cell: ({row}) => {
      return (
        <div className={styles.cell}>
          {row.original.plansForNextPeriod
            .map((planForNextPeriod) => (
              <div
                className={styles.cellItem}
                key={planForNextPeriod.uuid}
              >
                {renderCellItem({content: planForNextPeriod.job, arrayItem: planForNextPeriod})}
                {DOT}
                {renderCellItem({content: `${planForNextPeriod.estimationTime}`, arrayItem: planForNextPeriod, time: true})}
              </div>
            ),
            )
          }
          <Button
            value="Add plan"
            onClick={() => addCellItem({rowUuid: row.original.uuid, dataType: "PlanForNextPeriod"})}
          />
        </div>
      );
    },
  }),
  columnHelper.accessor<"problemsForCurrentPeriod", CurrentProblem[]>("problemsForCurrentPeriod", {
    header: "Current problems",

    /**
     * Cell with ProblemsForCurrentPeriod items
     */
    cell: ({row}) => {
      return (
        <div>
          {row.original.problemsForCurrentPeriod
            .map((currentProblem) =>
              (renderCellItem({
                content: currentProblem.description,
                arrayItem: currentProblem,
                isListItemDone: currentProblem.isDone,
              })))
          }
          <Button
            value="Add problem"
            onClick={() => addCellItem({rowUuid: row.original.uuid, dataType: "CurrentProblem"})}
          />
        </div>
      );
    },
  }),
  columnHelper.accessor<"studentComments", string[]>("studentComments", {
    header: "Student comments",

    /**
     * Cell with StudentComments items
     */
    cell: ({row}) => {
      const parentUuid = row.original.uuid;

      return (
        <div>
          {
            row.original.studentComments
              .map((studentComment, index) =>
                renderCellItem({content: studentComment, parentUuid, columnName: "studentComments", index}))
          }
          <Button
            value="Add comment"
            onClick={() => addCellItem({rowUuid: row.original.uuid, dataType: "studentComments"})}
          />
        </div>
      );
    },
  }),
  columnHelper.accessor<"learnedForToday", string[]>("learnedForToday", {
    header: "Learned for today",

    /**
     * Cell with LearnForToday items
     */
    cell: ({row}) => {
      const parentUuid = row.original.uuid;

      return (
        <div>
          {
            row.original.learnedForToday
              .map((learnedForToday, index) =>
                renderCellItem({content: learnedForToday, parentUuid, columnName: "learnedForToday", index}))
          }
          <Button
            value="Add learned for today"
            onClick={() => addCellItem({rowUuid: row.original.uuid, dataType: "learnedForToday"})}
          />
        </div>
      );
    },
  }),
  columnHelper.accessor<"mentorComments", MentorComment[]>("mentorComments", {
    header: "Mentor comments",

    /**
     * Cell with MentorComments items
     */
    cell: ({row}) => {

      return (
        <div>
          {
            row.original.mentorComments
              .map((mentorComment) =>
                renderCellItem({
                  content: mentorComment.description,
                  arrayItem: mentorComment,
                  isListItemDone: mentorComment.isDone,
                }))
          }
          <Button
            value="Add comment"
            onClick={() => addCellItem({rowUuid: row.original.uuid, dataType: "MentorComment"})}
          />
        </div>
      );
    },
  }),
  columnHelper.accessor<"isDayOff", boolean>("isDayOff", {
    header: "Is day off",

    /**
     * Cell with IsDayOff value
     */
    cell: (isDAyOffValue) => renderCellIsDayOff(isDAyOffValue),
  }),
];
