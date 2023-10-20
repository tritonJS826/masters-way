/**
 * User preview model
 */
export class UserPreview {

  /**
   * User's UUID
   */
  public uuid: string;

  /**
   * User's name
   */
  public name: string;

  /**
   * User's e-mail
   */
  public email: string;

  /**
   * User's ways
   * TODO: need to change UserPreview model in task #52 (Create table with all users).
   * TODO: Now I changed it for easer render allWays table
   */
  public ownWays: string[];

  /**
   * The favorite ways @Way.uuid
   */
  public favoriteWays: string[];

  /**
   * Ways for mentoring @Way.uuid
   */
  public mentoringWays: string[];

  constructor(userData: UserPreview) {
    this.uuid = userData.uuid;
    this.name = userData.name;
    this.email = userData.email;
    this.ownWays = userData.ownWays;
    this.favoriteWays = userData.favoriteWays;
    this.mentoringWays = userData.mentoringWays;
  }

}