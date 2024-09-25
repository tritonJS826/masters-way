import {makeAutoObservable} from "mobx";

/**
 * ProjectPreview props
 */
interface ProjectPreviewProps {

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

}

/**
 * ProjectPreview model
 */
export class ProjectPreview {

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

  // /**
  //  *
  //  * Owner's UUID
  //  */
  // public ownerId: string;

  // /**
  //  *
  //  * Project's members
  //  */
  // public users: UserNotSaturatedWay[];

  // /**
  //  *
  //  * Project's ways
  //  */
  // public ways: WayPreview[];

  constructor(projectPreviewData: ProjectPreviewProps) {
    makeAutoObservable(this);
    this.uuid = projectPreviewData.uuid;
    this.name = projectPreviewData.name;
    // This.ownerId = projectPreviewData.ownerId;
    // this.users = projectPreviewData.users.map(user => new UserNotSaturatedWay(user));
    this.isPrivate = projectPreviewData.isPrivate;
    // This.ways = projectPreviewData.ways.map(way => new WayPreview(way));
  }

}
