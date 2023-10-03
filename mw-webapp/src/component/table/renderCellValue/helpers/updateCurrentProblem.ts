import {CurrentProblemDAL} from "src/dataAccessLogic/CurrentProblemDAL";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";

/**
 * Update data in CurrentProblems collection
 * @param {string} text
 * @param {string} uuid
 */
export const updateCurrentProblem = async (text: string, uuid: string) => {
  const oldCurrentProblem = await CurrentProblemDAL.getCurrentProblem(uuid);
  const updatedCurrentProblem: CurrentProblem = new CurrentProblem({
    ...oldCurrentProblem,
    description: text,
  });
  await CurrentProblemDAL.updateCurrentProblem(updatedCurrentProblem);
};