import {useEffect, useState} from "react";
import {Button} from "src/component/button/Button";
import {Modal} from "src/component/modal/Modal";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {PropsWithUuid} from "src/logic/waysTable/OwnWaysTable";
import {columnHelper, waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Removes Way from User Mentoring Ways and User from Way's mentors
 */
async function removeMentorFromWay (userUuid: string, wayPreview: WayPreview) {
  const userPreview = await UserPreviewDAL.getUserPreview(userUuid);
  const mentoringWays = userPreview.mentoringWays.filter((wayUuid) => wayUuid !== wayPreview.uuid);
  const newUserPreview = new UserPreview({...userPreview, mentoringWays});

  await UserPreviewDAL.updateUserPreview(newUserPreview);

  const mentors = wayPreview.mentors.filter((mentor) => mentor.uuid !== userUuid);
  const newWayPreview = new WayPreview({...wayPreview, mentors});

  await WayPreviewDAL.updateWayPreview(newWayPreview);
}

/**
 * Updates Way Preview inside Mentoring Ways and sets it to the state
 */
function updateMentoringWays (mentoringWays: WayPreview[], newWayPreview: WayPreview) {
  const updatedMentoringWays = mentoringWays.map(way => {
    if (way.uuid === newWayPreview.uuid) {
      return newWayPreview;
    }

    return way;
  });

  return updatedMentoringWays;
}

/**
 * Render table of mentoring ways preview
 */
export const MentoringWaysTable = (props: PropsWithUuid) => {
  const [mentoringWays, setMentoringWays] = useState<WayPreview[]>([]);
  const [isStopMentoringModalOpen, setIsStopMentoringModalOpen] = useState(false);

  /**
   * Handles confirm stop mentoring button click
   */
  async function handleStopMentoring(userUuid: string, wayPreview: WayPreview) {
    await removeMentorFromWay(userUuid, wayPreview);
    const newWayPreview = await WayPreviewDAL.getWayPreview(wayPreview.uuid);
    const updatedMentoringWays = updateMentoringWays(mentoringWays, newWayPreview);
    setMentoringWays(updatedMentoringWays);
  }

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
                  handleStopMentoring(props.uuid, row.original);
                  setIsStopMentoringModalOpen(false);
                }}
              />
              <Button
                value="Cancel"
                onClick={() => {
                  setIsStopMentoringModalOpen(false);
                }}
              />
            </>
          }
          open={isStopMentoringModalOpen}
          setOpen={setIsStopMentoringModalOpen}
        />
        <Button
          value="Stop Mentoring"
          onClick={() => {
            setIsStopMentoringModalOpen(true);
          }}
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
