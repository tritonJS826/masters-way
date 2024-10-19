import {useState} from "react";
import {dayReportsAccessIds} from "cypress/accessIds/dayReportsAccessIds";
import {observer} from "mobx-react-lite";
import {Avatar} from "src/component/avatar/Avatar";
import {Button, ButtonType} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {Modal} from "src/component/modal/Modal";
import {Separator} from "src/component/separator/Separator";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {Trash} from "src/component/trash/Trash";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {CommentDAL} from "src/dataAccessLogic/CommentDAL";
import {ProblemDAL} from "src/dataAccessLogic/ProblemDAL";
import {SafeMap} from "src/dataAccessLogic/SafeMap";
import {languageStore} from "src/globalStore/LanguageStore";
import {CommentIssueAiModal} from "src/logic/wayPage/reportsTable/commentIssueAiModal/CommentIssueAiModal";
import {AccessErrorStore} from "src/logic/wayPage/reportsTable/dayReportsTable/AccesErrorStore";
import {DecomposeIssueAiModal} from "src/logic/wayPage/reportsTable/decomposeIssueAiModal/DecomposeIssueAiModal";
import {EstimateIssueAiModal} from
  "src/logic/wayPage/reportsTable/estimateIssueAiModal/EstimateIssueAiModal";
import {getListNumberByIndex} from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {SummarySection} from "src/logic/wayPage/reportsTable/reportsColumns/summarySection/SummarySection";
import {getFirstName} from "src/logic/waysTable/waysColumns";
import {DayReport} from "src/model/businessModel/DayReport";
import {DayReportCompositionParticipant} from "src/model/businessModel/DayReportCompositionParticipants";
import {Plan} from "src/model/businessModel/Plan";
import {User, UserPlain} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
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
  wayParticipantsMap: SafeMap<string, UserPlain>;

}

/**
 * Cell with problems in reports table
 */
export const ReportsTableProblemsCell = observer((props: ReportsTableProblemsCellProps) => {
  const {language} = languageStore;

  const [accessErrorStore] = useState<AccessErrorStore>(new AccessErrorStore());

  if (accessErrorStore.dayReportParticipant) {
    return (
      <Modal
        isOpen={true}
        trigger={<></>}
        content={
          <>
            <p>
              {LanguageService.error.noAccessRight[language]}
            </p>
            <Link path={pages.way.getPath({uuid: accessErrorStore.dayReportParticipant?.wayId})}>
              {accessErrorStore.dayReportParticipant?.wayName}
            </Link>
          </>
        }
      />
    );
  }

  /**
   * Create Problem
   */
  const createProblem = async (compositionParticipant: DayReportCompositionParticipant, userUuid?: string) => {
    if (!userUuid) {
      throw new Error("User uuid is not exist");
    }
    try {
      const problem = await ProblemDAL.createProblem({
        dayReportUuid: compositionParticipant.dayReportId,
        ownerUuid: userUuid,
      });
      props.dayReport.addProblem(problem);
    } catch (error) {
      accessErrorStore.setAccessErrorStore(compositionParticipant);
    }
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
                  position={PositionTooltip.BOTTOM}
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
              {props.user && props.isEditable &&
                <>
                  <Modal
                    trigger={
                      <Tooltip
                        position={PositionTooltip.TOP}
                        content={LanguageService.way.reportsTable.decomposeIssueByAI[language]}
                      >
                        <Button
                          onClick={() => {}}
                          buttonType={ButtonType.ICON_BUTTON}
                          value="DE"
                          className={styles.aiButton}
                        />
                      </Tooltip>
                    }
                    content={
                      <DecomposeIssueAiModal
                        goalDescription={props.way.goalDescription}
                        issueDescription={problem.description}
                        dayReportUuid={problem.dayReportUuid}
                        ownerUuid={props.user.uuid}
                        addPlan={(plan: Plan) => props.dayReport.addPlan(plan)}
                      />
                    }
                  />
                  <Modal
                    trigger={
                      <Tooltip
                        position={PositionTooltip.TOP}
                        content={LanguageService.way.reportsTable.estimateIssueByAI[language]}
                      >
                        <Button
                          onClick={() => {}}
                          buttonType={ButtonType.ICON_BUTTON}
                          value="ES"
                          className={styles.aiButton}
                        />
                      </Tooltip>
                    }
                    content={
                      <EstimateIssueAiModal
                        goalDescription={props.way.goalDescription}
                        issueDescription={problem.description}
                      />
                    }
                  />
                  <Modal
                    trigger={
                      <Tooltip
                        position={PositionTooltip.TOP}
                        content={LanguageService.way.reportsTable.addRecommendationsByAI[language]}
                      >
                        <Button
                          onClick={() => {}}
                          buttonType={ButtonType.ICON_BUTTON}
                          value="RE"
                          className={styles.aiButton}
                        />
                      </Tooltip>
                    }
                    content={
                      <CommentIssueAiModal
                        goalDescription={props.way.goalDescription}
                        problemDescription={problem.description}
                        addComment={async (commentRaw: string) => {
                          if (props.user) {
                            const comment = await CommentDAL.createComment({
                              dayReportUuid: problem.dayReportUuid,
                              ownerUuid: props.user.uuid,
                              description: `***AI:*** ${commentRaw}`,
                            });
                            props.dayReport.addComment(comment);
                          }
                        }}
                      />
                    }
                  />
                </>
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
                      await ProblemDAL.updateProblem({problem: problemToUpdate});
                    }}
                    className={styles.checkbox}
                  />
                </Tooltip>
              }
              {problem.ownerUuid === props.user?.uuid ?
                <Trash
                  tooltipContent={LanguageService.way.reportsTable.columnTooltip.deleteProblem[language]}
                  tooltipPosition={PositionTooltip.BOTTOM}
                  okText={LanguageService.modals.confirmModal.deleteButton[language]}
                  cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
                  onOk={() => deleteProblem(problem.uuid)}
                  confirmContent={`${LanguageService.way.reportsTable.modalWindow.deleteProblemQuestion[language]}
                    "${problem.description}"?`}
                />
                : (
                  <div className={styles.trashReservation} />
                )
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
                await ProblemDAL.updateProblem({problem: problemToUpdate});
              }}
              isEditable={problem.ownerUuid === props.user?.uuid}
              placeholder={props.isEditable
                ? LanguageService.common.emptyMarkdownAction[language]
                : LanguageService.common.emptyMarkdown[language]
              }
              cy={
                {
                  textArea: dayReportsAccessIds.dayReportsContent.problems.problemDescriptionInput,
                  trigger: dayReportsAccessIds.dayReportsContent.problems.problemDescription,
                }
              }
            />
            <Separator />
          </li>
        ))}
      </ol>
      <SummarySection
        wayId={props.way.uuid}
        compositionParticipants={props.dayReport.compositionParticipants}
        isEditable={props.isEditable}
        tooltipContent={LanguageService.way.reportsTable.columnTooltip.addProblem[language]}
        tooltipPosition={PositionTooltip.RIGHT}
        onClick={(compositionParticipant: DayReportCompositionParticipant) =>
          createProblem(compositionParticipant, props.user?.uuid)}
      />
    </VerticalContainer>
  );
});
