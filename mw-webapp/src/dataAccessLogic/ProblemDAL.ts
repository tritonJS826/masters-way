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
    const problemDTO = await ProblemService.createProblem({
      request: {
        dayReportUuid,
        description: "",
        ownerUuid,
        isDone: false,
      },
    });

    const problem = new Problem({
      ...problemDTO,
      createdAt: new Date(problemDTO.createdAt),
      updatedAt: new Date(problemDTO.updatedAt),
    });

    return problem;
  }

  /**
   * Update problem
   */
  public static async updateProblem(problem: PartialWithUuid<Problem>): Promise<Problem> {
    const updatedProblemDTO = await ProblemService.updateProblem({
      problemId: problem.uuid,
      request: problem,
    });

    const updatedProblem = new Problem({
      ...updatedProblemDTO,
      createdAt: new Date(updatedProblemDTO.createdAt),
      updatedAt: new Date(updatedProblemDTO.updatedAt),
    });

    return updatedProblem;
  }

  /**
   * Delete problem
   */
  public static async deleteProblem(problemId: string): Promise<void> {
    await ProblemService.deleteProblem({problemId});
  }

}
