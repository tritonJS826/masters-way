import {TrashIcon} from "@radix-ui/react-icons";
import {Link} from "src/component/link/Link";
import {HeadingLevel, Title} from "src/component/title/Title";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {Way} from "src/model/businessModel/Way";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import {v4 as uuidv4} from "uuid";
import styles from "src/logic/wayPage/WayPage.module.scss";

/**
 * Remove mentor from Way
 */
const removeMentorFromWay = (
  way: Way,
  setWay: (newWay: Way) => void,
  userPreview: UserPreview,
) => {
  const mentoringWays = userPreview.mentoringWays.filter((item) => item !== way.uuid);
  const newUserPreview = new UserPreview({...userPreview, mentoringWays});

  UserPreviewDAL.updateUserPreview(newUserPreview);

  const mentors = way.mentors.filter((item) => item !== userPreview);
  const newWay = new Way({...way, mentors});

  WayDAL.updateWay(newWay);

  setWay(newWay);
};

/**
 * Mentor Section Props
 */
interface MentorsSectionProps {

  /**
   * Way from which mentors should be displayed
   */
  way: Way;

  /**
   * Function to set updated Way
   */
  setWay: (newWay: Way) => void;

  /**
   * Is current user is owner of Way
   */
  isOwner: boolean;
}

/**
 * Section with all Way mentors
 */
export const MentorsSection = (props: MentorsSectionProps) => {
  return (
    <>
      <Title
        level={HeadingLevel.h3}
        text="Mentors of this way:"
      />
      {props.way.mentors.map((mentor) => (
        <div key={uuidv4().concat(mentor.uuid)}>
          <Link
            key={mentor.uuid}
            path={pages.user.getPath({uuid: mentor.uuid})}
            value={mentor.name}
          />
          {props.isOwner && (
            <TrashIcon
              className={styles.icon}

              onClick={() => {

                /**
                 * CallBack triggered on press ok
                 */
                const onOk = () => removeMentorFromWay(props.way, props.setWay, mentor);

                // TODO: use modal instead of confirm task #305
                const isConfirmed = confirm(`Are you sure you want remove "${mentor.name}" from mentors?`);
                isConfirmed && onOk();
              }}
            />
          )}
        </div>
      ))}
    </>
  );
};
