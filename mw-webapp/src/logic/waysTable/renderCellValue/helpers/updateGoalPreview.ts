import {GoalPreviewDAL} from "src/dataAccessLogic/GoalPreviewDAL";
import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";

/**
 * Update JobDone
 */
export const updateGoalPreview = async (description: string, uuid: string) => {
  const oldGoal = await GoalPreviewDAL.getGoalPreview(uuid);
  const updatedGoal: GoalPreview = new GoalPreview({
    ...oldGoal,
    description,
  });
  await GoalPreviewDAL.updateGoalPreview(updatedGoal);
};