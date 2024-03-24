import {TrashIcon} from "@radix-ui/react-icons";
import {Button} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Сheckbox";
import {Confirm} from "src/component/confirm/Confirm";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {ProblemDAL} from "src/dataAccessLogic/ProblemDAL";
import {getListNumberByIndex, getName} from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {DayReport} from "src/model/businessModel/DayReport";
import {Problem} from "src/model/businessModel/Problem";
import {User} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {pages} from "src/router/pages";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {Symbols} from "src/utils/Symbols";
import styles from "src/logic/wayPage/reportsTable/reportsColumns/reportsTableProblemsCell/ReportsTableProblemsCell.module.scss";

/**
 * Reports table problems cell props
 */
interface ReportsTableProblemsCellProps {

  /**
   * Way
   */
  way: Way;

  /**
   * Day report's uuid for update
   */
  dayReport: DayReport;

  /**
   * Logged in user
   */
  user: User | null;

  /**
   * If true user can edit job done, if false - not
   */
  isEditable: boolean;

  /**
   * Callback for update dayReport
   */
  updateDayReport: (report: PartialWithUuid<DayReport>) => Promise<void>;

}

/**
 * Cell with problems in reports table
 */
export const ReportsTableProblemsCell = (props: ReportsTableProblemsCellProps) => {

  /**
   * Create Problem
   */
  const createProblem = async (userUuid?: string) => {
    if (!userUuid) {
      throw new Error("User uuid is not exist");
    }

    const problem = await ProblemDAL.createProblem(userUuid, props.dayReport.uuid);

    const problems = [...props.dayReport.problems, problem];

    props.updateDayReport({uuid: props.dayReport.uuid, problems});
  };

  /**
   * Delete Problem
   */
  const deleteProblem = async (problemUuid: string) => {
    props.updateDayReport({
      uuid: props.dayReport.uuid,
      problems: props.dayReport.problems.filter((problem) => problem.uuid !== problemUuid),
    });

    await ProblemDAL.deleteProblem(problemUuid);
  };

  /**
   * Update Problem
   */
  const updateProblem = async (problem: Problem, text: string) => {
    const updatedProblems = props.dayReport.problems.map((item) => {
      const itemToReturn = item.uuid === problem.uuid
        ? new Problem({
          ...problem,
          description: text,
        })
        : item;

      return itemToReturn;
    });

    const problemToUpdate = {
      uuid: problem.uuid,
      description: text,
    };

    props.updateDayReport({uuid: props.dayReport.uuid, problems: updatedProblems});
    await ProblemDAL.updateProblem(problemToUpdate);
  };

  return (
    <VerticalContainer className={styles.list}>
      <ol className={styles.numberedList}>
        {props.dayReport.problems.map((problem, index) => (
          <li
            key={problem.uuid}
            className={styles.numberedListItem}
          >
            <HorizontalContainer className={styles.horizontalContainer}>
              <HorizontalContainer className={styles.listNumberAndName}>
                {getListNumberByIndex(index)}
                <Link path={pages.user.getPath({uuid: problem.ownerUuid})}>
                  {getName(props.way, problem.ownerUuid)}
                </Link>
              </HorizontalContainer>
              <HorizontalContainer className={styles.icons}>
                {props.isEditable &&
                <Tooltip
                  position={PositionTooltip.RIGHT}
                  content={`Click${Symbols.NO_BREAK_SPACE}to${Symbols.NO_BREAK_SPACE}mark
                              the problem as completed. Coming soon`}
                >
                  <Checkbox
                    onChange={() => {}}
                    className={styles.checkbox}
                  />
                </Tooltip>
                }
                {problem.ownerUuid === props.user?.uuid &&
                <Tooltip
                  content="Delete problem"
                  position={PositionTooltip.BOTTOM}
                >
                  <Confirm
                    trigger={<TrashIcon className={styles.icon} />}
                    content={<p>
                      {`Are you sure you want to delete the problem "${problem.description}"?`}
                    </p>}
                    onOk={() => deleteProblem(problem.uuid)}
                    okText="Delete"
                  />
                </Tooltip>
                }
              </HorizontalContainer>
            </HorizontalContainer>
            <EditableTextarea
              text={problem.description}
              onChangeFinish={(text) => updateProblem(problem, text)}
              isEditable={problem.ownerUuid === props.user?.uuid}
              className={styles.editableTextarea}
            />
          </li>
        ))}
      </ol>
      <div className={styles.summarySection}>
        {props.isEditable &&
        <Tooltip
          content="Add problem"
          position={PositionTooltip.RIGHT}
        >
          <Button
            value={
              <Icon
                size={IconSize.SMALL}
                name="PlusIcon"
              />
            }
            onClick={() => createProblem(props.user?.uuid)}
            className={styles.flatButton}
          />
        </Tooltip>
        }
      </div>
    </VerticalContainer>
  );
};
