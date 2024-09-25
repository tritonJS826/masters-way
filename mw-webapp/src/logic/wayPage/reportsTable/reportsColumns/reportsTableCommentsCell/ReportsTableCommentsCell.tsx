import {useState} from "react";
import {dayReportsAccessIds} from "cypress/accessIds/dayReportsAccessIds";
import {observer} from "mobx-react-lite";
import {Avatar} from "src/component/avatar/Avatar";
import {Button, ButtonType} from "src/component/button/Button";
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
import {SafeMap} from "src/dataAccessLogic/SafeMap";
import {languageStore} from "src/globalStore/LanguageStore";
import {ChatAiModal} from "src/logic/wayPage/reportsTable/chatAiModal/ChatAiModal";
import {AccessErrorStore} from "src/logic/wayPage/reportsTable/dayReportsTable/AccesErrorStore";
import {getListNumberByIndex} from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {SummarySection} from "src/logic/wayPage/reportsTable/reportsColumns/summarySection/SummarySection";
import {getFirstName} from "src/logic/waysTable/waysColumns";
import {Comment} from "src/model/businessModel/Comment";
import {DayReport} from "src/model/businessModel/DayReport";
import {DayReportCompositionParticipant} from "src/model/businessModel/DayReportCompositionParticipants";
import {User, UserPlain} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/wayPage/reportsTable/reportsColumns/reportsTableCommentsCell/ReportsTableCommentsCell.module.scss";

/**
 * Reports table comments cell props
 */
interface ReportsTableCommentsCellProps {

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
 * Cell with comments in reports table
 */
export const ReportsTableCommentsCell = observer((props: ReportsTableCommentsCellProps) => {
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
   * Create Comment
   */
  const createComment = async (dayReportParticipant: DayReportCompositionParticipant, commentatorUuid?: string) => {
    if (!commentatorUuid) {
      throw new Error("User uuid is not exist");
    }
    try {
      const comment = await CommentDAL.createComment({
        dayReportUuid: dayReportParticipant.dayReportId,
        ownerUuid: commentatorUuid,
      });
      props.dayReport.addComment(comment);
    } catch (error) {
      accessErrorStore.setAccessErrorStore(dayReportParticipant);
    }
  };

  /**
   * Delete Comment
   */
  const deleteComment = async (commentUuid: string) => {
    props.dayReport.deleteComment(commentUuid);
    await CommentDAL.deleteComment(commentUuid);
  };

  return (
    <VerticalContainer className={styles.list}>
      <ol className={styles.numberedList}>
        {props.dayReport.comments
          .map((comment, index) => (
            <li
              key={comment.uuid}
              className={styles.numberedListItem}
            >
              <HorizontalContainer className={styles.recordInfo}>
                {getListNumberByIndex(index)}
                <Avatar
                  alt={props.wayParticipantsMap.getValue(comment.ownerUuid).name}
                  src={props.wayParticipantsMap.getValue(comment.ownerUuid).imageUrl}
                />
                <div className={styles.ownerName}>
                  <Link path={pages.user.getPath({uuid: comment.ownerUuid})}>
                    {getFirstName(props.wayParticipantsMap.getValue(comment.ownerUuid).name)}
                  </Link>
                </div>
                {props.way.children.length !== 0 &&
                <Link
                  path={pages.way.getPath({uuid: comment.wayUuid})}
                  className={styles.linkToOwnerWay}
                >
                  <Tooltip
                    position={PositionTooltip.BOTTOM}
                    content={LanguageService.way.reportsTable.columnTooltip.visitWay[language]
                      .replace("$wayName", `"${comment.wayName}"`)}
                  >
                    <Icon
                      size={IconSize.MEDIUM}
                      name="WayIcon"
                      className={styles.socialMediaIcon}
                    />
                  </Tooltip>
                </Link>
                }
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
                    <ChatAiModal
                      message={comment.description}
                      addComment={async (commentRaw: string) => {
                        if (props.user) {
                          const generatedComment = await CommentDAL.createComment({
                            dayReportUuid: comment.dayReportUuid,
                            ownerUuid: props.user.uuid,
                            description: `AI: ${commentRaw}`,
                          });
                          props.dayReport.addComment(generatedComment);
                        }
                      }}
                    />
                  }
                />
                {comment.ownerUuid === props.user?.uuid ?
                  <Trash
                    tooltipContent={LanguageService.way.reportsTable.columnTooltip.deleteComment[language]}
                    tooltipPosition={PositionTooltip.LEFT}
                    okText={LanguageService.modals.confirmModal.deleteButton[language]}
                    cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
                    onOk={() => deleteComment(comment.uuid)}
                    confirmContent={`${LanguageService.way.reportsTable.modalWindow.deleteCommentQuestion[language]}
                    "${comment.description}"?`}
                  />
                  : (
                    <div className={styles.trashReservation} />
                  )
                }
              </HorizontalContainer>
              <EditableTextarea
                text={comment.description}
                onChangeFinish={async (description) => {
                  const commentToUpdate = new Comment({
                    ...comment,
                    description,
                  });
                  comment.updateDescription(description);
                  await CommentDAL.updateComment({comment: commentToUpdate});
                }}
                isEditable={comment.ownerUuid === props.user?.uuid}
                placeholder={props.isEditable
                  ? LanguageService.common.emptyMarkdownAction[language]
                  : LanguageService.common.emptyMarkdown[language]}
                cy={
                  {
                    textArea: dayReportsAccessIds.dayReportsContent.comments.commentDescriptionInput,
                    trigger: dayReportsAccessIds.dayReportsContent.comments.commentDescription,
                  }
                }
              />
              <Separator />
            </li>
          ),
          )}
      </ol>
      <SummarySection
        wayId={props.way.uuid}
        compositionParticipants={props.dayReport.compositionParticipants}
        isEditable={props.isEditable}
        tooltipContent={LanguageService.way.reportsTable.columnTooltip.addComment[language]}
        tooltipPosition={PositionTooltip.LEFT}
        onClick={(compositionParticipant: DayReportCompositionParticipant) =>
          createComment(compositionParticipant, props.user?.uuid)}
      />
    </VerticalContainer>
  );
});
