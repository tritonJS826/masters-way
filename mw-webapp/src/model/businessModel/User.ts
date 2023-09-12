// import {Way} from "src/model/businessModel/Way";

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
   */
  public ownWays: string[];

  /**
   * The favorite ways
   */
  public favoriteWays: string[];

  /**
   * Ways for mentoring
   */
  public mentoringWays: string[];

  constructor(userData: User) {
    this.uuid = userData.uuid;
    this.name = userData.name;
    this.email = userData.email;
    this.ownWays = userData.ownWays;
    this.favoriteWays = userData.ownWays;
    this.mentoringWays = userData.mentoringWays;
    // this.ownWays = userData.ownWays?.map((ownWayItem) =>
    //   new Way(ownWayItem));
    // this.favoriteWays = userData.favoriteWays?.map((favoriteWayItem) =>
    //   new Way(favoriteWayItem));
    // this.mentoringWays = userData.mentoringWays?.map((mentoringWayItem) =>
    //   new Way(mentoringWayItem));
  }

}