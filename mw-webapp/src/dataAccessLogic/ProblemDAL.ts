import {Problem} from "src/model/businessModel/Problem";
import {ProblemService} from "src/service/ProblemService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Create Problem params
 */
interface CreateProblemParams {

  /**
   * Owner UUID
   */
  ownerUuid: string;

  /**
   * DayReport UUID
   */
  dayReportUuid: string;

  /**
   * Way's UUID
   */
  wayUuid: string;

  /**
   * Way's name
   */
  wayName: string;

}

/**
 * Update Problem params
 */
interface UpdateProblemParams {

  /**
   * Partial comment to update
   */
  problem: PartialWithUuid<Problem>;

  /**
   * Way's UUID
   */
  wayUuid: string;

  /**
   * Way's name
   */
  wayName: string;
}

/**
 * Provides methods to interact with the problems
 */
export class ProblemDAL {

  /**
   * Create problem
   */
  public static async createProblem(params: CreateProblemParams): Promise<Problem> {
    const problemDTO = await ProblemService.createProblem({
      request: {
        dayReportUuid: params.dayReportUuid,
        description: "",
        ownerUuid: params.ownerUuid,
        isDone: false,
      },
    });

    const problem = new Problem({
      ...problemDTO,
      createdAt: new Date(problemDTO.createdAt),
      updatedAt: new Date(problemDTO.updatedAt),
      wayName: params.wayName,
      wayUuid: params.wayUuid,
    });

    return problem;
  }

  /**
   * Update problem
   */
  public static async updateProblem(params: UpdateProblemParams): Promise<Problem> {
    const updatedProblemDTO = await ProblemService.updateProblem({
      problemId: params.problem.uuid,
      request: params.problem,
    });

    const updatedProblem = new Problem({
      ...updatedProblemDTO,
      createdAt: new Date(updatedProblemDTO.createdAt),
      updatedAt: new Date(updatedProblemDTO.updatedAt),
      wayName: params.wayName,
      wayUuid: params.wayUuid,
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
