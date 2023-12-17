import {useEffect, useState} from "react";
import {Button} from "src/component/button/Button";
import {Modal} from "src/component/modal/Modal";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {columnHelper, waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Removes mentor from Way and returns new User Preview
 */
const removeMentorFromWay = async (userUuid: string, wayPreview: WayPreview) => {
  const userPreview = await UserPreviewDAL.getUserPreview(userUuid);
  const mentoringWays = userPreview.mentoringWays.filter((wayUuid) => wayUuid !== wayPreview.uuid);
  const newUserPreview = new UserPreview({...userPreview, mentoringWays});

  const mentors = wayPreview.mentors.filter((mentor) => mentor.uuid !== userUuid);
  const newWayPreview = new WayPreview({...wayPreview, mentors});

  await Promise.all([
    UserPreviewDAL.updateUserPreview(newUserPreview),
    WayPreviewDAL.updateWayPreview(newWayPreview),
  ]);

  return newUserPreview;
};

/**
 * Mentoring Ways table props
 */
interface MentoringWaysTableProps {

  /**
   * User uuid
   */
  uuid: string;

  /**
   * Function to change user preview
   */
  handleUserPreviewChange: (userPreview: UserPreview) => void;
}

/**
 * Render table of mentoring ways preview
 */
export const MentoringWaysTable = (props: MentoringWaysTableProps) => {
  const [mentoringWays, setMentoringWays] = useState<WayPreview[]>([]);
  const [isStopMentoringModalOpen, setIsStopMentoringModalOpen] = useState(false);

  /**
   * Load User mentoring ways
   */
  const loadMentoringWays = async () => {
    const data = await WayPreviewDAL.getUserWaysPreview(props.uuid, "Mentoring");
    setMentoringWays(data);
  };

  useEffect(() => {
    loadMentoringWays();
  }, [props.uuid]);

  /**
   * Handles confirm stop mentoring button
   */
  const stopMentoring = async (userUuid: string, wayPreview: WayPreview) => {
    const newUserPreview = await removeMentorFromWay(userUuid, wayPreview);

    const updatedMentoringWays = mentoringWays.filter((way) => way.uuid !== wayPreview.uuid);
    setMentoringWays(updatedMentoringWays);

    props.handleUserPreviewChange(newUserPreview);
  };

  const mentorshipActionsColumn = columnHelper.accessor("uuid", {
    header: "Mentorship Actions",

    /**
     * Cell with buttons for mentorship actions
     */
    cell: ({row}) => (
      <>
        <Modal
          content={
            <>
              <p>
                Are you sure you want to stop Mentoring this Way?
              </p>
              <Button
                value="Confirm"
                onClick={() => {
                  stopMentoring(props.uuid, row.original);
                  setIsStopMentoringModalOpen(false);
                }}
              />
              <Button
                value="Cancel"
                onClick={() =>
                  setIsStopMentoringModalOpen(false)
                }
              />
            </>
          }
          isOpen={isStopMentoringModalOpen}
          handleClose={() =>
            setIsStopMentoringModalOpen(false)
          }
        />
        <Button
          value="Stop Mentoring"
          onClick={() =>
            setIsStopMentoringModalOpen(true)
          }
        />
      </>
    ),
  });

  const mentoringWaysTableColumns = waysColumns.concat(mentorshipActionsColumn);

  return (
    <WaysTable
      data={mentoringWays}
      columns={mentoringWaysTableColumns}
    />
  );
};
