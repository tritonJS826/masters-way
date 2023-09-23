/**
 * User
 */
export class UserDTO {

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
   * Array of @Way.uuid
   */
  public ownWays: string[];

  /**
   * Array of @Way.uuid
   */
  public favoriteWays: string[];

  /**
   * Array of @Way.uuid
   */
  public mentoringWays: string[];

  constructor(userData: UserDTO) {
    this.uuid = userData.uuid;
    this.name = userData.name;
    this.email = userData.email;
    this.ownWays = userData.ownWays;
    this.favoriteWays = userData.favoriteWays;
    this.mentoringWays = userData.mentoringWays;
  }

}
