import {CurrentProblemDAL} from "src/dataAccessLogic/CurrentProblemDAL";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";

/**
 * Update CurrentProblems
 */
export const updateCurrentProblem = async (text: string, uuid: string) => {
  const oldCurrentProblem = await CurrentProblemDAL.getCurrentProblem(uuid);
  const updatedCurrentProblem: CurrentProblem = new CurrentProblem({
    ...oldCurrentProblem,
    description: text,
  });
  await CurrentProblemDAL.updateCurrentProblem(updatedCurrentProblem);
};