import {SchemasUserPlainResponse} from "src/apiAutogenerated";
import {Button} from "src/component/button/Button";
import {Link} from "src/component/link/Link";
import {HeadingLevel, Title} from "src/component/title/Title";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
// Import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
// import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {Way} from "src/model/businessModel/Way";
// Import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import styles from "src/logic/wayPage/MentorRequestsSection.module.scss";

/**
 * Add mentor to Way
 */
const addMentorToWay = async (
  way: Way,
  setWay: (newWay: Way) => void,
  userPreview: SchemasUserPlainResponse,
) => {
  // Const mentoringWays = userPreview.mentoringWays.concat(way.uuid);
  // const newUserPreview: SchemasUserPlainResponse = {...userPreview};

  const mentors = way.mentors.set(userPreview.uuid, userPreview);
  const mentorRequests = way.mentorRequests.filter((item) => item !== userPreview);
  const formerMentors = new Map(Array.from(way.formerMentors)
    .filter(([formerMentorUuid]) => formerMentorUuid !== userPreview.uuid));

  const newWay = new Way({...way, mentors, mentorRequests, formerMentors});

  setWay(newWay);
  await WayDAL.updateWay(newWay);
};

/**
 * Remove user from Way's mentor requests
 */
const removeUserFromMentorRequests = async (
  way: Way,
  setWay: (newWay: Way) => void,
  userPreview: SchemasUserPlainResponse,
) => {

  const mentorRequests = way.mentorRequests.filter((item) => item !== userPreview);

  const newWay = new Way({...way, mentorRequests});

  setWay(newWay);
  await WayDAL.updateWay(newWay);
};

/**
 * Mentor Requests Section Props
 */
interface MentorRequestsSectionProps {

  /**
   * Way from which mentors should be displayed
   */
  way: Way;

  /**
   * Function to set updated Way
   */
  setWay: (newWay: Way) => void;
}

/**
 * Section with requests to become Way mentor
 */
export const MentorRequestsSection = (props: MentorRequestsSectionProps) => {
  return (
    <>
      <Title
        level={HeadingLevel.h3}
        text="Mentors of this way:"
      />
      <div className={styles.mentorRequestsSection}>
        {props.way.mentorRequests.map((userPreview) => (
          <div
            key={userPreview.uuid}
            className={styles.mentorRequestsItem}
          >
            <Link path={pages.user.getPath({uuid: userPreview.uuid})}>
              {userPreview.name}
            </Link>
            <Button
              value='Accept'
              onClick={() => {
                addMentorToWay(props.way, props.setWay, userPreview);
              }
              }
            />
            <Button
              value='Decline'
              onClick={() => {
                removeUserFromMentorRequests(props.way, props.setWay, userPreview);
              }
              }
            />
          </div>
        ))}
      </div>
    </>
  );
};
