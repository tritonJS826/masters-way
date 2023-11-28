import {Way} from "src/model/businessModel/Way";

/**
 * User model
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
   * User's description
   */
  public description: string;

  /**
   * Owner's ways
   */
  public ownWays: Way[];

  /**
   * The favorite ways
   */
  public favoriteWays: Way[];

  /**
   * Ways for mentoring
   */
  public mentoringWays: Way[];

  constructor(userData: User) {
    this.uuid = userData.uuid;
    this.name = userData.name;
    this.email = userData.email;
    this.description = userData.description;
    this.ownWays = userData.ownWays.map((ownWayItem) =>
      new Way(ownWayItem));
    this.favoriteWays = userData.favoriteWays.map((favoriteWayItem) =>
      new Way(favoriteWayItem));
    this.mentoringWays = userData.mentoringWays.map((mentoringWayItem) =>
      new Way(mentoringWayItem));
  }

}