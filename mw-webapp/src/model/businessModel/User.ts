/**
 * User
 */
export class User {

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
   * Owner's ways
   * TODO: use Way[] instead of string[]
   */
  public ownWays: string[];

  /**
   * The favorite ways
   * TODO: use Way[] instead of string[]
   */
  public favoriteWays: string[];

  /**
   * Ways for mentoring
   * TODO: use Way[] instead of string[]
   */
  public mentoringWays: string[];

  constructor(userData: User) {
    this.uuid = userData.uuid;
    this.name = userData.name;
    this.email = userData.email;
    this.ownWays = userData.ownWays;
    this.favoriteWays = userData.ownWays;
    this.mentoringWays = userData.mentoringWays;
  }

}