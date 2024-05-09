import {TrashIcon} from "@radix-ui/react-icons";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {CommentDAL} from "src/dataAccessLogic/CommentDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {getListNumberByIndex} from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {getFirstName} from "src/logic/waysTable/waysColumns";
import {Comment} from "src/model/businessModel/Comment";
import {DayReport} from "src/model/businessModel/DayReport";
import {User} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
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
   * Callback for update dayReport
   */
  updateDayReport: (report: PartialWithUuid<DayReport>) => Promise<void>;

}

/**
 * Cell with comments in reports table
 */
export const ReportsTableCommentsCell = observer((props: ReportsTableCommentsCellProps) => {
  const {language} = languageStore;

  /**
   * Create Comment
   */
  const createComment = async (commentatorUuid?: string) => {
    if (!commentatorUuid) {
      throw new Error("User uuid is not exist");
    }

    const comment = await CommentDAL.createComment(commentatorUuid, props.dayReport.uuid);
    const comments = [...props.dayReport.comments, comment];
    props.updateDayReport({uuid: props.dayReport.uuid, comments});
  };

  /**
   * Delete Comment
   */
  const deleteComment = async (commentUuid: string) => {
    props.updateDayReport({
      uuid: props.dayReport.uuid,
      comments: props.dayReport.comments.filter((comment) => comment.uuid !== commentUuid),
    });
    await CommentDAL.deleteComment(commentUuid);
  };

  /**
   * Update Comment
   */
  const updateComment = async (comment: Comment, text: string) => {
    const updatedComments = props.dayReport.comments.map((item) => {
      const itemToReturn = item.uuid === comment.uuid
        ? new Comment({
          ...comment,
          description: text,
        })
        : item;

      return itemToReturn;
    });

    const commentToUpdate = {
      uuid: comment.uuid,
      description: text,
    };
    await CommentDAL.updateComment(commentToUpdate);

    props.updateDayReport({uuid: props.dayReport.uuid, comments: updatedComments});
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
              <HorizontalContainer className={styles.horizontalContainer}>
                <HorizontalContainer className={styles.listNumberAndName}>
                  {getListNumberByIndex(index)}
                  <Link path={pages.user.getPath({uuid: comment.ownerUuid})}>
                    {getFirstName(comment.ownerName)}
                  </Link>
                </HorizontalContainer>
                {comment.ownerUuid === props.user?.uuid &&
                <Tooltip
                  content={LanguageService.way.reportsTable.columnTooltip.deleteComment[language]}
                  position={PositionTooltip.LEFT}
                >
                  <Confirm
                    trigger={<TrashIcon className={styles.icon} />}
                    content={<p>
                      {`${LanguageService.way.reportsTable.modalWindow.deleteCommentQuestion[language]}
                      "${comment.description}"?`}
                    </p>}
                    onOk={() => deleteComment(comment.uuid)}
                    okText={LanguageService.modals.confirmModal.deleteButton[language]}
                    cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
                  />
                </Tooltip>
                }
              </HorizontalContainer>
              <HorizontalContainer>
                <EditableTextarea
                  text={comment.description}
                  onChangeFinish={(text) => updateComment(comment, text)}
                  isEditable={comment.ownerUuid === props.user?.uuid}
                  className={styles.editableTextarea}
                />
              </HorizontalContainer>
            </li>
          ),
          )}
      </ol>
      <div className={styles.summarySection}>
        {props.isEditable &&
        <Tooltip
          position={PositionTooltip.LEFT}
          content={LanguageService.way.reportsTable.columnTooltip.addComment[language]}
        >
          <Button
            value={
              <Icon
                size={IconSize.SMALL}
                name="PlusIcon"
              />
            }
            onClick={() => createComment(props.user?.uuid)}
            buttonType={ButtonType.ICON_BUTTON}
          />
        </Tooltip>
        }
      </div>
    </VerticalContainer>
  );
});
