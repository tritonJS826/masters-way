import {observer} from "mobx-react-lite";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {Trash} from "src/component/trash/Trash";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {ProblemDAL} from "src/dataAccessLogic/ProblemDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {getListNumberByIndex} from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {SummarySection} from "src/logic/wayPage/reportsTable/reportsColumns/summarySection/SummarySection";
import {getFirstName} from "src/logic/waysTable/waysColumns";
import {DayReport} from "src/model/businessModel/DayReport";
import {Problem} from "src/model/businessModel/Problem";
import {User} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
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
  updateDayReport: (report: PartialWithUuid<DayReport>) => void;

}

/**
 * Cell with problems in reports table
 */
export const ReportsTableProblemsCell = observer((props: ReportsTableProblemsCellProps) => {
  const {language} = languageStore;

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
  const updateProblem = async (problemToUpdate: PartialWithUuid<Problem>) => {
    const updatedProblem = await ProblemDAL.updateProblem(problemToUpdate);
    const problems = [
      ...props.dayReport.problems.map((problem) => {
        return problem.uuid === problemToUpdate.uuid
          ? updatedProblem
          : problem;
      }),
    ];

    await props.updateDayReport({uuid: props.dayReport.uuid, problems});
  };

  return (
    <VerticalContainer className={styles.list}>
      <ol className={styles.numberedList}>
        {props.dayReport.problems.map((problem, index) => (
          <li
            key={problem.uuid}
            className={styles.numberedListItem}
          >
            <HorizontalContainer className={styles.recordInfo}>
              {getListNumberByIndex(index)}
              <Link
                path={pages.user.getPath({uuid: problem.ownerUuid})}
                className={styles.ownerName}
              >
                {getFirstName(problem.ownerName)}
              </Link>
              {props.isEditable &&
                <Tooltip
                  position={PositionTooltip.RIGHT}
                  content={LanguageService.way.reportsTable.columnTooltip.problemCheckbox[language]}
                >
                  <Checkbox
                    isDefaultChecked={problem.isDone}
                    onChange={() => updateProblem({
                      uuid: problem.uuid,
                      isDone: !problem.isDone,
                    })}
                    className={styles.checkbox}
                  />
                </Tooltip>
              }
              {problem.ownerUuid === props.user?.uuid &&
                <Trash
                  tooltipContent={LanguageService.way.reportsTable.columnTooltip.deleteProblem[language]}
                  tooltipPosition={PositionTooltip.BOTTOM}
                  okText={LanguageService.modals.confirmModal.deleteButton[language]}
                  cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
                  onOk={() => deleteProblem(problem.uuid)}
                  confirmContent={`${LanguageService.way.reportsTable.modalWindow.deleteProblemQuestion[language]}
                    "${problem.description}"?`}
                />
              }
            </HorizontalContainer>
            <EditableTextarea
              text={problem.description}
              onChangeFinish={(description) => updateProblem({
                uuid: problem.uuid,
                description,
              })}
              isEditable={problem.ownerUuid === props.user?.uuid}
              placeholder={props.isEditable
                ? LanguageService.common.emptyMarkdownAction[language]
                : LanguageService.common.emptyMarkdown[language]
              }
            />
          </li>
        ))}
      </ol>
      <SummarySection
        isEditable={props.isEditable}
        tooltipContent={LanguageService.way.reportsTable.columnTooltip.addProblem[language]}
        tooltipPosition={PositionTooltip.RIGHT}
        onClick={() => createProblem(props.user?.uuid)}
      />
    </VerticalContainer>
  );
});
