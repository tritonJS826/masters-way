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

  /**
   * Project's participants
   */
  userIds: string[];

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

  /**
   * Project's participants
   */
  public userIds: string[];

  constructor(projectPreviewData: ProjectPreviewProps) {
    makeAutoObservable(this);
    this.uuid = projectPreviewData.uuid;
    this.name = projectPreviewData.name;
    this.userIds = projectPreviewData.userIds;
    this.isPrivate = projectPreviewData.isPrivate;
  }

}
