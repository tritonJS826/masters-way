import {TrashIcon} from "@radix-ui/react-icons";
import {Confirm} from "src/component/confirm/Confirm";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {MentorUserWayDAL} from "src/dataAccessLogic/MentorUserWayDAL";
import {useGlobalContext} from "src/GlobalContext";
import {UserPlain} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LangauageService";
import {v4 as uuidv4} from "uuid";
import styles from "src/logic/wayPage/MentorsSection.module.scss";

/**
 * Remove mentor from Way
 */
const removeMentorFromWay = async (
  way: Way,
  setWay: (newWay: Way) => void,
  userPreview: UserPlain,
) => {
  way.mentors.delete(userPreview.uuid);
  const mentors = way.mentors;
  const formerMentors = way.formerMentors.set(userPreview.uuid, userPreview);

  const newWay = new Way({...way, mentors, formerMentors});

  setWay(newWay);
  await MentorUserWayDAL.deleteMentor(userPreview.uuid, way.uuid);
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
                  onOk={() => removeMentorFromWay(props.way, props.setWay, mentor)}
                  okText={LanguageService.way.peopleBlock.deleteButton[language]}
                  cancelText="Cancel"
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
