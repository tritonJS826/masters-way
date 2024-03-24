import {Problem} from "src/model/businessModel/Problem";
import {ProblemService} from "src/service/ProblemService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Provides methods to interact with the problems
 */
export class ProblemDAL {

  /**
   * Create problem
   */
  public static async createProblem(ownerUuid: string, dayReportUuid: string): Promise<Problem> {
    const problem = await ProblemService.createProblem({
      request: {
        dayReportUuid,
        description: "",
        ownerUuid,
        isDone: false,
      },
    });

    return problem;
  }

  /**
   * Update problem
   */
  public static async updateProblem(problem: PartialWithUuid<Problem>): Promise<Problem> {
    const updatedJobDone = await ProblemService.updateProblem({
      problemId: problem.uuid,
      request: problem,
    });

    return updatedJobDone;
  }

  /**
   * Delete problem
   */
  public static async deleteProblem(problemId: string): Promise<void> {
    await ProblemService.deleteProblem({problemId});
  }

}
