import {TrashIcon} from "@radix-ui/react-icons";
import {Confirm} from "src/component/confirm/Confirm";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
// Import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
// Import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {useGlobalContext} from "src/GlobalContext";
import {Way} from "src/model/businessModel/Way";
// Import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LangauageService";
import {v4 as uuidv4} from "uuid";
import styles from "src/logic/wayPage/MentorsSection.module.scss";

/**
 * Remove mentor from Way
 */
// const removeMentorFromWay = (
//   way: Way,
//   setWay: (newWay: Way) => void,
//   userPreview: UserPreview,
// ) => {
//   const mentoringWays = userPreview.mentoringWays.filter((item) => item !== way.uuid);
//   const newUserPreview = new UserPreview({...userPreview, mentoringWays});

//   UserPreviewDAL.updateUserPreview(newUserPreview);

//   way.mentors.delete(userPreview.uuid);
// Const mentors = way.mentors;
// const formerMentors = way.formerMentors.set(userPreview.uuid, userPreview);

// const newWay = new Way({...way, mentors, formerMentors});

// WayDAL.updateWay(newWay);

// setWay(newWay);
// };

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
  const mentors = Array.from(props.way.mentors.values());
  const {user, language} = useGlobalContext();

  return (
    <div>
      <Title
        level={HeadingLevel.h3}
        text={LanguageService.way.peopleBlock.mentors[language]}
      />
      {mentors.map((mentor) => (
        <HorizontalContainer
          className={styles.alignTrashIcon}
          key={uuidv4().concat(mentor.uuid)}
        >
          {(props.isOwner || user?.uuid === mentor.uuid)
            ? (
              <Tooltip
                content={LanguageService.way.peopleBlock.deleteFromMentors[language]}
                position={PositionTooltip.RIGHT}
              >
                <Confirm
                  trigger={
                    <TrashIcon className={styles.icon} />}
                  content={<p>
                    {LanguageService.way.peopleBlock.deleteMentorModalContent[language].replace("$mentor", `"${mentor.name}"`)}
                  </p>}
                  onOk={() => {
                    // RemoveMentorFromWay(props.way, props.setWay, mentor)
                  }
                  }
                  okText={LanguageService.way.peopleBlock.deleteButton[language]}
                />
              </Tooltip>
            )
            : (
              <div className={styles.icon} />
            )}
          <Link
            key={mentor.uuid}
            path={pages.user.getPath({uuid: mentor.uuid})}
          >
            {mentor.name}
          </Link>
        </HorizontalContainer>
      ))}
    </div>
  );
};
