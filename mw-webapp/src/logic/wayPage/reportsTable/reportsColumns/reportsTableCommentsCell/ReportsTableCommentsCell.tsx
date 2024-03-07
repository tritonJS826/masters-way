import {TrashIcon} from "@radix-ui/react-icons";
import {Button} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {getListNumberByIndex, getName} from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {Comment} from "src/model/businessModel/Comment";
import {DayReport} from "src/model/businessModel/DayReport";
import {Way} from "src/model/businessModel/Way";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {v4 as uuidv4} from "uuid";
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
  user: UserPreview | null;

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
export const ReportsTableCommentsCell = (props: ReportsTableCommentsCellProps) => {

  /**
   * Create Comment
   */
  const createComment = (commentatorUuid?: string) => {
    if (!commentatorUuid) {
      throw new Error("User uuid is not exist");
    }

    const comment: Comment = new Comment({
      description: "",
      ownerUuid: commentatorUuid,
      isDone: false,
      uuid: uuidv4(),
    });
    const comments = [...props.dayReport.comments, comment];

    props.updateDayReport({uuid: props.dayReport.uuid, comments});
  };

  /**
   * Delete Comment
   */
  const deleteComment = (commentUuid: string) => {
    props.updateDayReport({
      uuid: props.dayReport.uuid,
      comments: props.dayReport.comments.filter((comment) => comment.uuid !== commentUuid),
    });
  };

  /**
   * Update Comment
   */
  const updateComment = (comment: Comment, text: string) => {
    const updatedComments = props.dayReport.comments.map((item) => {
      const itemToReturn = item.uuid === comment.uuid
        ? new Comment({
          ...comment,
          description: text,
        })
        : item;

      return itemToReturn;
    });

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
                    {getName(props.way, comment.ownerUuid)}
                  </Link>
                </HorizontalContainer>
                {comment.ownerUuid === props.user?.uuid &&
                <Tooltip
                  content="Delete comment"
                  position={PositionTooltip.LEFT}
                >
                  <Confirm
                    trigger={<TrashIcon className={styles.icon} />}
                    content={<p>
                      {`Are you sure you want to delete the comment "${comment.description}"?`}
                    </p>}
                    onOk={() => deleteComment(comment.uuid)}
                    okText="Delete"
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
          content="Add comment"
        >
          <Button
            value={
              <Icon
                size={IconSize.SMALL}
                name="PlusIcon"
              />
            }
            onClick={() => createComment(props.user?.uuid)}
            className={styles.flatButton}
          />
        </Tooltip>
        }
      </div>
    </VerticalContainer>
  );
};
