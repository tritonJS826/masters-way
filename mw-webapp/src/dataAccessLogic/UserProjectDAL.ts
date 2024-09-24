import {UserProjectService} from "src/service/UserProjectService";

/**
 * Provides methods to interact with the UserProject
 */
export class UserProjectDAL {

  /**
   * Add user to the project
   */
  public static async addUser(userId: string, projectId: string): Promise<void> {
    await UserProjectService.addUserProject({
      request: {
        userId,
        projectId,
      },
    });
  }

  /**
   * Delete user from the project
   */
  public static async deleteUser(userId: string, projectId: string): Promise<void> {
    await UserProjectService.deleteUserProject({
      userId,
      projectId,
    });
  }

}
