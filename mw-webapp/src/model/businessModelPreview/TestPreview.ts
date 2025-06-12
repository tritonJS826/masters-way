import {makeAutoObservable} from "mobx";

/**
 * TestPreview props
 */
interface TestPreviewProps {

  /**
   * Test's UUID
   */
  uuid: string;

  /**
   * Test's name
   */
  name: string;

  /**
   * Test's description
   */
  description: string;

  /**
   * Test's owner uuid
   */
  ownerUuid: string;

  /**
   * Last day when test was updated
   */
  updatedAt: Date;

  /**
   * Date when test was created
   */
  createdAt: Date;

}

/**
 * TestPreview model
 */
export class TestPreview {

  /**
   * Test's UUID
   */
  public uuid: string;

  /**
   * Test's name
   */
  public name: string;

  /**
   * Test's description
   */
  public description: string;

  /**
   * Test's owner uuid
   */
  public ownerUuid: string;

  /**
   * Last day when training was updated
   */
  public updatedAt: Date;

  /**
   * Date when training was created
   */
  public createdAt: Date;

  constructor(testPreviewData: TestPreviewProps) {
    makeAutoObservable(this);
    this.uuid = testPreviewData.uuid;
    this.name = testPreviewData.name;
    this.description = testPreviewData.description;
    this.ownerUuid = testPreviewData.ownerUuid;
    this.createdAt = testPreviewData.createdAt;
    this.updatedAt = testPreviewData.updatedAt;
  }

}
