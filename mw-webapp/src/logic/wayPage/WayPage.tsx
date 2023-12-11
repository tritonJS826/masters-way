import {useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "src/component/button/Button";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {Link} from "src/component/link/Link";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {HeadingLevel, Title} from "src/component/title/Title";
import {GoalPreviewDAL} from "src/dataAccessLogic/GoalPreviewDAL";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {useGlobalContext} from "src/GlobalContext";
import {DayReportsTable} from "src/logic/wayPage/reportsTable/DayReportsTable";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";
import styles from "src/logic/wayPage/WayPage.module.scss";

/**
 * Change description of Way
 */
const updateGoalWay = (wayPreview: WayPreview, description: string) => {
  wayPreview.goal.description = description;
  GoalPreviewDAL.updateGoalPreview(wayPreview.goal);
};

/**
 * Add mentor to Way
 */
const addMentor = (
  wayPreview: WayPreview,
  setWay: React.Dispatch<React.SetStateAction<WayPreview | undefined>>,
  userPreview: UserPreview,
) => {
  userPreview.mentoringWays.push(userPreview.uuid);
  UserPreviewDAL.updateUserPreview(userPreview);

  const newWayPreview = {...wayPreview};

  newWayPreview.mentors.push(userPreview);
  WayPreviewDAL.updateWayPreview(newWayPreview);
  setWay(newWayPreview);
};

/**
 * Updates Way's mentor requests
 */
const updateMentorRequests = (
  wayPreview: WayPreview,
  setWay: React.Dispatch<React.SetStateAction<WayPreview | undefined>>,
  userPreview: UserPreview,
  action: "add" | "remove") => {
  const newWayPreview = {...wayPreview};

  if (action === "add") {
    newWayPreview.mentorRequests.push(userPreview);
  } else if (action === "remove") {
    newWayPreview.mentorRequests = newWayPreview.mentorRequests.filter((item) => item !== userPreview);
  }

  WayPreviewDAL.updateWayPreview(newWayPreview);
  setWay(newWayPreview);
};

/**
 * Change name of Way
 */
const changeWayName = (wayPreview: WayPreview, text: string) => {
  wayPreview.name = text;
  WayPreviewDAL.updateWayPreview(wayPreview);
};

/**
 * Render all Way's mentors
 */
const renderMentors = (wayPreview: WayPreview) => {
  return wayPreview.mentors.map((item) => (
    <Link
      key={item.uuid}
      value={item.name}
      path={pages.user.getPath({uuid: item.uuid})}
      className={styles.mentors}
    />
  ));
};

/**
 * Render Way's mentor requests
 */
const renderMentorRequests = (wayPreview: WayPreview, setWay: React.Dispatch<React.SetStateAction<WayPreview | undefined>>) => {
  return wayPreview.mentorRequests.map((userPreview) => (
    <div key={userPreview.uuid}>
      <Link
        value={userPreview.name}
        path={pages.user.getPath({uuid: userPreview.uuid})}
      />
      <Button
        value='Accept'
        onClick={() => {
          addMentor(wayPreview, setWay, userPreview);
        }}
      />
      <Button
        value='Decline'
        onClick={() => {
          updateMentorRequests(wayPreview, setWay, userPreview, "remove");
        }}
      />
    </div>
  ));
};

/**
 * PageProps
 */
interface WayPageProps {

  /**
   * Page's uuid
   */
  uuid: string;
}

/**
 * Way page
 */
export const WayPage = (props: WayPageProps) => {
  const navigate = useNavigate();
  const [way, setWay] = useState<WayPreview>();
  const {user} = useGlobalContext();

  const mentors = useMemo(() => {
    return way && way.mentors.length > 0 && renderMentors(way);
  }, [way]);

  const mentorRequests = useMemo(() => {
    return way && way.mentorRequests.length > 0 && renderMentorRequests(way, setWay);
  }, [way]);

  const isOwner = user?.uuid === way?.owner.uuid;
  const isMentor = user && !!way?.mentors.find((mentor) => mentor.uuid === user.uuid);

  const hasUserSentMentorRequest = user && !!way?.mentorRequests.find((request) => request.uuid === user.uuid);
  const eligibleToSendRequest = user && !isOwner && !isMentor && !hasUserSentMentorRequest;

  /**
   * Get Way
   */
  const loadWay = async () => {
    const data = await WayPreviewDAL.getWayPreview(props.uuid);
    // Navigate to PageError if transmitted way's uuid is not exist
    if (!data) {
      navigate(pages.page404.getPath({}));
    }
    setWay(data);
  };

  useEffect(() => {
    loadWay();
  }, []);

  return (
    <>
      {way &&
      <div className={styles.container}>
        <Title
          level={HeadingLevel.h2}
          text={`${way.name}`}
          onChangeFinish={(text) => changeWayName(way, text)}
          isEditable={isOwner}
        />
        <Title
          level={HeadingLevel.h3}
          text="Goal"
          onChangeFinish={(text) => changeWayName(way, text)}
        />
        <EditableTextarea
          text={way.goal.description}
          onChangeFinish={(description) => updateGoalWay(way, description)}
          rows={5}
          isEditable={isOwner}
        />
        <Title
          level={HeadingLevel.h3}
          text="Way owner:"
        />
        <Link
          value={way.owner.name}
          path={pages.user.getPath({uuid: way.owner.uuid})}
          className={styles.mentors}
        />
        {mentors && (
          <>
            <Title
              level={HeadingLevel.h3}
              text="Mentors of this way:"
            />
            {mentors}
          </>
        )}
        {isOwner && mentorRequests && (
          <>
            <Title
              level={HeadingLevel.h3}
              text="Requests to become mentor of this way:"
            />
            {mentorRequests}
          </>
        )
        }
        {eligibleToSendRequest && (
          <Button
            value="Apply as Mentor"
            onClick={() => {
              updateMentorRequests(way, setWay, user, "add");
            }}
          />
        )
        }
        <ScrollableBlock>
          <DayReportsTable way={way} />
        </ScrollableBlock>
      </div>
      }
    </>
  );
};
