import {UserProjectService} from "src/service/UserProjectService";

/**
 * Toggle user in project params
 */
interface ToggleUserInProjectParams {

  /**
   * User ID
   */
  userId: string;

  /**
   * Project ID
   */
  projectId: string;
}

/**
 * Provides methods to interact with the UserProject
 */
export class UserProjectDAL {

  /**
   * Add user to the project
   */
  public static async addUser(params: ToggleUserInProjectParams): Promise<void> {
    await UserProjectService.addUserProject({
      request: {
        userId: params.userId,
        projectId: params.projectId,
      },
    });
  }

  /**
   * Delete user from the project
   */
  public static async deleteUser(params: ToggleUserInProjectParams): Promise<void> {
    await UserProjectService.deleteUserProject({
      userId: params.userId,
      projectId: params.projectId,
    });
  }

}
