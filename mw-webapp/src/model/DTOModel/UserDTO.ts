/**
 * User DTO model
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
   * @Way.uuids
   */
  public ownWayUuids: string[];

  /**
   * @Way.uuids
   */
  public favoriteWayUuids: string[];

  /**
   * @Way.uuids
   */
  public mentoringWayUuids: string[];

  constructor(userData: UserDTO) {
    this.uuid = userData.uuid;
    this.name = userData.name;
    this.email = userData.email;
    this.ownWayUuids = userData.ownWayUuids;
    this.favoriteWayUuids = userData.favoriteWayUuids;
    this.mentoringWayUuids = userData.mentoringWayUuids;
  }

}
