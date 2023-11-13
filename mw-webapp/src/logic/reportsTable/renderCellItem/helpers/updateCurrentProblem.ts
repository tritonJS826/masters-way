import {CurrentProblemDAL} from "src/dataAccessLogic/CurrentProblemDAL";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";

/**
 * CurrentProblem props
 */
interface CurrentProblemProps {

  /**
   * Description of CurrentProblem
   */
  description: string;

  /**
   * CurrentProblem UUID
   */
  currentProblemUuid: string;
}

/**
 * Update CurrentProblems
 */
export const updateCurrentProblem = async (props: CurrentProblemProps) => {
  const oldCurrentProblem = await CurrentProblemDAL.getCurrentProblem(props.currentProblemUuid);
  const updatedCurrentProblem: CurrentProblem = new CurrentProblem({
    ...oldCurrentProblem,
    description: props.description,
  });
  await CurrentProblemDAL.updateCurrentProblem(updatedCurrentProblem);
};