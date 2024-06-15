import {observer} from "mobx-react-lite";
import {Avatar} from "src/component/avatar/Avatar";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {Trash} from "src/component/trash/Trash";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {ProblemDAL} from "src/dataAccessLogic/ProblemDAL";
import {SafeMap} from "src/dataAccessLogic/SafeMap";
import {languageStore} from "src/globalStore/LanguageStore";
import {getListNumberByIndex} from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {SummarySection} from "src/logic/wayPage/reportsTable/reportsColumns/summarySection/SummarySection";
import {getFirstName} from "src/logic/waysTable/waysColumns";
import {DayReport} from "src/model/businessModel/DayReport";
import {User} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {UserPreviewShort} from "src/model/businessModelPreview/UserPreviewShort";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
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
   * Way's participants
   */
  wayParticipantsMap: SafeMap<string, UserPreviewShort>;

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
    const problem = await ProblemDAL.createProblem({
      dayReportUuid: props.dayReport.uuid,
      ownerUuid: userUuid,
      wayName: props.way.name,
      wayUuid: props.way.uuid,
    });
    props.dayReport.addProblem(problem);
  };

  /**
   * Delete Problem
   */
  const deleteProblem = async (problemUuid: string) => {
    props.dayReport.deleteProblem(problemUuid);
    await ProblemDAL.deleteProblem(problemUuid);
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
              <Avatar
                alt={props.wayParticipantsMap.getValue(problem.ownerUuid).name}
                src={props.wayParticipantsMap.getValue(problem.ownerUuid).imageUrl}
              />
              <div className={styles.ownerName}>
                <Link path={pages.user.getPath({uuid: problem.ownerUuid})}>
                  {getFirstName(props.wayParticipantsMap.getValue(problem.ownerUuid).name)}
                </Link>
              </div>
              {props.way.children.length !== 0 &&
              <Link
                path={pages.way.getPath({uuid: problem.wayUuid})}
                className={styles.linkToOwnerWay}
              >
                <Tooltip
                  position={PositionTooltip.BOTTOM_LEFT}
                  content={LanguageService.way.reportsTable.columnTooltip.visitWay[language]
                    .replace("$wayName", `"${problem.wayName}"`)}
                >
                  <Icon
                    size={IconSize.MEDIUM}
                    name="WayIcon"
                    className={styles.socialMediaIcon}
                  />
                </Tooltip>
              </Link>
              }
              {props.isEditable &&
                <Tooltip
                  position={PositionTooltip.RIGHT}
                  content={LanguageService.way.reportsTable.columnTooltip.problemCheckbox[language]}
                >
                  <Checkbox
                    isDefaultChecked={problem.isDone}
                    onChange={async () => {
                      const problemToUpdate = {
                        uuid: problem.uuid,
                        isDone: !problem.isDone,
                      };
                      problem.updateIsDone(!problem.isDone);
                      await ProblemDAL.updateProblem({
                        problem: problemToUpdate,
                        wayName: props.way.name,
                        wayUuid: props.way.uuid,
                      });
                    }}
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
              onChangeFinish={async (description) => {
                const problemToUpdate = {
                  uuid: problem.uuid,
                  description,
                };
                problem.updateDescription(description);
                await ProblemDAL.updateProblem({
                  problem: problemToUpdate,
                  wayName: props.way.name,
                  wayUuid: props.way.uuid,
                });
              }}
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
