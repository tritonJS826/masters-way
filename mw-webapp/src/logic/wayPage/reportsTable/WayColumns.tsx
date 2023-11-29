import {createColumnHelper} from "@tanstack/react-table";
import {Button} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Сheckbox";
import {EditableText} from "src/component/editableText/EditableText";
import {useUserContext} from "src/component/header/UserContext";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {CommentDAL} from "src/dataAccessLogic/CommentDAL";
import {CurrentProblemDAL} from "src/dataAccessLogic/CurrentProblemDAL";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {PlanForNextPeriodDAL} from "src/dataAccessLogic/PlanForNextPeriodDAL";
import {Comment} from "src/model/businessModel/Comment";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import {DateUtils} from "src/utils/DateUtils";
import {UnicodeSymbols} from "src/utils/UnicodeSymbols";
import styles from "src/logic/wayPage/reportsTable/WayColumns.module.scss";

const DEFAULT_SUMMARY_TIME = 0;
const columnHelper = createColumnHelper<DayReport>();

/**
 * Columns props
 */
interface ColumnsProps {

  /**
   * DayReports
   */
  dayReports: DayReport[];

  /**
   * Callback that change dayReports
   */
  setDayReports: (dayReports: DayReport[]) => void;

  /**
   * Way's mentors
   * @key @User.uuid
   * @value @UserPreview
   */
  mentors: Map<string, UserPreview>;

  /**
   * Way
   */
  way: WayPreview;
}

/**
 * Update DayReport state
 */
const updateDayReportState = (
  dayReports: DayReport[],
  setReports: (dayReports: DayReport[]) => void,
  updatedDayReport: DayReport) => {
  const updatedDayReports = dayReports.map((item) => {
    if (item.uuid === updatedDayReport.uuid) {
      return updatedDayReport;
    }

    return item;
  });

  setReports(updatedDayReports);
};

/**
 * Table columns
 * Don't get rid of any https://github.com/TanStack/table/issues/4382
 */
export const Columns = (props: ColumnsProps) => {
  const {user} = useUserContext();
  const ownerUuid = props.way.owner.uuid;
  const ownerName = props.way.owner.name;
  const isOwner = user?.uid === ownerUuid;
  const isMentor = user ? !!props.mentors.get(user.uid) : false;
  const isUserCanEditComments = (isOwner || isMentor) && user;

  const columns = [
    columnHelper.accessor("date", {
      header: "Date",

      /**
       * Cell with date value
       */
      cell: ({row}) => {

        /**
         * Update isDayOff
         */
        const udateIsDayOff = async (value: boolean) => {
          await DayReportDAL.updateIsDayOff(row.original, value);
          const updatedDayReport = {...row.original, isDayOff: value};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        return (
          <VerticalContainer>
            {DateUtils.getShortISODateValue(row.original.date)}
            <Tooltip
              content="is day off ?"
              position={PositionTooltip.TOP}
            >
              <Checkbox
                isDefaultChecked={row.original.isDayOff}
                onChange={udateIsDayOff}
              />
            </Tooltip>
          </VerticalContainer>
        );
      },
    }),
    columnHelper.accessor("jobsDone", {
      header: "Jobs done (minutes)",

      /**
       * Cell with JobsDone items
       */
      cell: ({row}) => {

        /**
         * Create jobDone
         */
        const createJobDone = async () => {
          const jobDone = await JobDoneDAL.createJobDone(row.original);
          const jobsDone = [...row.original.jobsDone, jobDone];
          const updatedDayReport = {...row.original, jobsDone};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update jobDone
         */
        const updateJobDone = async (jobDone: JobDone, text: string) => {
          await JobDoneDAL.updateJobDone(jobDone, text);
          const updatedJobsDone = row.original.jobsDone.map((item) => {
            if (item.uuid === jobDone.uuid) {
              return new JobDone({
                ...jobDone,
                description: text,
              });
            }

            return item;
          });

          const updatedDayReport = {...row.original, jobsDone: updatedJobsDone};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update jobDoneTime
         */
        const updateJobDoneTime = async (jobDone: JobDone, text: number) => {
          await JobDoneDAL.updateJobDoneTime(jobDone, text);
          const updatedJobsDone = row.original.jobsDone.map((item) => {
            if (item.uuid === jobDone.uuid) {
              return new JobDone({
                ...jobDone,
                time: text,
              });
            }

            return item;
          });

          const updatedDayReport = {...row.original, jobsDone: updatedJobsDone};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        return (
          <VerticalContainer className={styles.cell}>
            {row.original.jobsDone
              .map((jobDone) => (
                <HorizontalContainer
                  key={jobDone.uuid}
                  className={styles.numeric}
                >
                  <EditableText
                    text={jobDone.description}
                    onChangeFinish={(text) => updateJobDone(jobDone, text)}
                  />
                  {UnicodeSymbols.DIVIDING_POINT}
                  <EditableText
                    text={jobDone.time}
                    onChangeFinish={(text) => updateJobDoneTime(jobDone, text)}
                    className={styles.editableTime}
                  />
                </HorizontalContainer>
              ),
              )
            }
            <div className={styles.summaryTimeWrapper}>
              {"Summary time: "}
              {row.original.jobsDone
                .reduce((summaryTime, jobDone) => jobDone.time + summaryTime, DEFAULT_SUMMARY_TIME)
              }
            </div>
            {isOwner &&
              <Button
                value="add job"
                onClick={createJobDone}
              />
            }
          </VerticalContainer>
        );
      },
    }),
    columnHelper.accessor("plansForNextPeriod", {
      header: "Plans for tomorrow (minutes)",

      /**
       * Cell with PlanForNextPeriod items
       */
      cell: ({row}) => {

        /**
         * Create PlanForNextPeriod
         */
        const createPlanForNextPeriod = async () => {
          const planForNextPeriod = await PlanForNextPeriodDAL.createPlanForNextPeriod(row.original);
          const plansForNextPeriod = [...row.original.plansForNextPeriod, planForNextPeriod];
          const updatedDayReport = {...row.original, plansForNextPeriod};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update PlanForNextPeriod
         */
        const updatePlanForNextPeriod = async (planForNextPeriod: PlanForNextPeriod, text: string) => {
          await PlanForNextPeriodDAL.updatePlanForNextPeriod(planForNextPeriod, text);
          const updatedPlansForNextPeriod = row.original.plansForNextPeriod.map((item) => {
            if (item.uuid === planForNextPeriod.uuid) {
              return new PlanForNextPeriod({
                ...planForNextPeriod,
                job: text,
              });
            }

            return item;
          });

          const updatedDayReport = {...row.original, plansForNextPeriod: updatedPlansForNextPeriod};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update PlanForNextPeriodTime
         */
        const updatePlanForNextPeriodTime = async (planForNextPeriod: PlanForNextPeriod, text: number) => {
          await PlanForNextPeriodDAL.updatePlanForNextPeriodTime(planForNextPeriod, text);
          const updatedPlansForNextPeriod = row.original.plansForNextPeriod.map((item) => {
            if (item.uuid === planForNextPeriod.uuid) {
              return new PlanForNextPeriod({
                ...planForNextPeriod,
                estimationTime: text,
              });
            }

            return item;
          });

          const updatedDayReport = {...row.original, plansForNextPeriod: updatedPlansForNextPeriod};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        return (
          <VerticalContainer className={styles.cell}>
            {row.original.plansForNextPeriod
              .map((planForNextPeriod) => (
                <HorizontalContainer
                  key={planForNextPeriod.uuid}
                  className={styles.numeric}
                >
                  <EditableText
                    text={planForNextPeriod.job}
                    onChangeFinish={(text) => updatePlanForNextPeriod(planForNextPeriod, text)}
                  />
                  {UnicodeSymbols.DIVIDING_POINT}
                  <EditableText
                    text={planForNextPeriod.estimationTime}
                    onChangeFinish={(value) => updatePlanForNextPeriodTime(planForNextPeriod, value)}
                    className={styles.editableTime}
                  />
                </HorizontalContainer>
              ),
              )
            }
            {isOwner &&
              <Button
                value="add plan"
                onClick={createPlanForNextPeriod}
              />
            }
          </VerticalContainer>
        );
      },
    }),
    columnHelper.accessor("problemsForCurrentPeriod", {
      header: "Current problems",

      /**
       * Cell with ProblemsForCurrentPeriod items
       */
      cell: ({row}) => {

        /**
         * Create CurrentProblem
         */
        const createCurrentProblem = async () => {
          const currentProblem = await CurrentProblemDAL.createCurrentProblem(row.original);
          const currentProblems = [...row.original.problemsForCurrentPeriod, currentProblem];
          const updatedDayReport = {...row.original, problemsForCurrentPeriod: currentProblems};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update CurrentProblem
         */
        const updateCurrentProblem = async (currentProblem: CurrentProblem, text: string) => {
          await CurrentProblemDAL.updateCurrentProblem(currentProblem, text);
          const updatedCurrentProblems = row.original.problemsForCurrentPeriod.map((item) => {
            if (item.uuid === currentProblem.uuid) {
              return new CurrentProblem({
                ...currentProblem,
                description: text,
              });
            }

            return item;
          });

          const updatedDayReport = {...row.original, problemsForCurrentPeriod: updatedCurrentProblems};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        return (
          <VerticalContainer className={styles.cell}>
            {row.original.problemsForCurrentPeriod
              .map((currentProblem) => (
                <HorizontalContainer
                  key={currentProblem.uuid}
                  className={styles.numeric}
                >
                  <EditableText
                    text={currentProblem.description}
                    onChangeFinish={(text) => updateCurrentProblem(currentProblem, text)}
                  />
                </HorizontalContainer>
              ))
            }
            {isOwner &&
              <Button
                value="add problem"
                onClick={createCurrentProblem}
              />
            }
          </VerticalContainer>
        );
      },
    }),
    columnHelper.accessor("comments", {
      header: "Comments",

      /**
       * Cell with Comments items
       */
      cell: ({row}) => {

        /**
         * Create Comment
         */
        const createComment = async (commentatorUuid: string) => {
          const comment = await CommentDAL.createComment(row.original, commentatorUuid);
          const comments = [...row.original.comments, comment];
          const updatedDayReport = {...row.original, comments};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Update Comment
         */
        const updateComment = async (comment: Comment, text: string) => {
          await CommentDAL.updateComment(comment, text);
          const updatedComments = row.original.comments.map((item) => {
            const itemToReturn = item.uuid === comment.uuid
              ? new Comment({
                ...comment,
                description: text,
              })
              : item;

            return itemToReturn;
          });

          const updatedDayReport = {...row.original, comments: updatedComments};
          updateDayReportState(props.dayReports, props.setDayReports, updatedDayReport);
        };

        /**
         * Get user name
         */
        const getCommentatorName = (users: Map<string, UserPreview>, uuid: string) => {
          const mentor = users.get(uuid);
          const userName = mentor ? mentor.name : ownerName;

          return userName;
        };

        return (
          <VerticalContainer className={styles.cell}>
            {row.original.comments
              .map((comment) => (
                <>
                  <Link
                    value={getCommentatorName(props.mentors, comment.commentatorUuid)}
                    path={pages.user.getPath({uuid: comment.commentatorUuid})}
                  />
                  <EditableText
                    text={comment.description}
                    onChangeFinish={(text) => updateComment(comment, text)}
                  />
                </>
              ),
              )}
            {isUserCanEditComments &&
            <Button
              value="add comment"
              onClick={() => createComment(user.uid)}
            />
            }
          </VerticalContainer>
        );
      },
    }),
  ];

  return columns;
};