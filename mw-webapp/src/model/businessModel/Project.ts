import {makeAutoObservable} from "mobx";
import {UserNotSaturatedWay} from "src/model/businessModelPreview/UserNotSaturatedWay";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Project props
 */
interface ProjectProps {

  /**
   * Project's UUID
   */
  uuid: string;

  /**
   * Is project private
   * @default true
   */
  isPrivate: boolean;

  /**
   * Project's name
   */
  name: string;

  /**
   *
   * Owner's UUID
   */
  ownerId: string;

  /**
   *
   * Project's members
   */
  users: UserNotSaturatedWay[];

  /**
   *
   * Project's ways
   */
  ways: WayPreview[];
}

/**
 * Project model
 */
export class Project {

  /**
   * Project's UUID
   */
  public uuid: string;

  /**
   * Is project private
   * @default true
   */
  public isPrivate: boolean;

  /**
   * Project's name
   */
  public name: string;

  /**
   *
   * Owner's UUID
   */
  public ownerId: string;

  /**
   *
   * Project's members
   */
  public users: UserNotSaturatedWay[];

  /**
   *
   * Project's ways
   */
  public ways: WayPreview[];

  constructor(projectData: ProjectProps) {
    makeAutoObservable(this);
    this.uuid = projectData.uuid;
    this.name = projectData.name;
    this.ownerId = projectData.ownerId;
    this.users = projectData.users.map(user => new UserNotSaturatedWay(user));
    this.isPrivate = projectData.isPrivate;
    this.ways = projectData.ways.map(way => new WayPreview(way));
  }

  /**
   * Update project's name
   */
  public updateName(nameToUpdate: string): void {
    this.name = nameToUpdate;
  }

  /**
   * Update project's isPrivate
   */
  public updateIsPrivate(isPrivateToUpdate: boolean): void {
    this.isPrivate = isPrivateToUpdate;
  }

  /**
   * Add user to project
   */
  public addUserToProject(userForProject: UserNotSaturatedWay): void {
    this.users.push(userForProject);
  }

  /**
   * Delete user from project
   */
  public deleteUserFromMProject(userUuid: string): void {
    this.users = this.users.filter(user => user.uuid !== userUuid);
  }

  /**
   * Add way to project
   */
  public addWayToProject(wayForProject: WayPreview): void {
    this.ways.push(wayForProject);
  }

  /**
   * Delete way from project
   */
  public deleteWayFromMProject(wayUuid: string): void {
    this.ways = this.ways.filter(way => way.uuid !== wayUuid);
  }

}
