import {getCurrentProblem, updatesCurrentProblem} from "src/dataAccessLogic/getCurrentProblems";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";

/**
 * Update data in CurrentProblems collection
 * @param {string} text
 * @param {string} uuid
 */
export const updateCurrentProblem = async (text: string, uuid: string) => {
  const oldCurrentProblem = await getCurrentProblem(uuid);
  const updatedCurrentProblem: CurrentProblem = new CurrentProblem({
    ...oldCurrentProblem,
    description: text,
  });
  await updatesCurrentProblem(updatedCurrentProblem);
};