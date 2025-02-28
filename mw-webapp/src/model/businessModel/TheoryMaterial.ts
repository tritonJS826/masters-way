import {makeAutoObservable} from "mobx";

/**
 * TheoryMaterial's props
 */
interface TheoryMaterialProps {

  /**
   * TheoryMaterial's UUID
   */
  uuid: string;

  /**
   * TheoryMaterial's name
   */
  name: string;

  /**
   * Date when TheoryMaterial was created
   */
  createdAt: Date;

  /**
   * Date when TheoryMaterial was updated
   */
  updatedAt: Date;

  /**
   * TheoryMaterial's topic's uuid
   */
  topicUuid: string;

  /**
   * TheoryMaterial's description
   */
  description: string;

  /**
   * TheoryMaterial's order
   */
  order: number;

}

/**
 * TheoryMaterial model
 */
export class TheoryMaterial {

  /**
   * TheoryMaterial's UUID
   */
  public uuid: string;

  /**
   * TheoryMaterial's name
   */
  public name: string;

  /**
   * Date when TheoryMaterial was created
   */
  public createdAt: Date;

  /**
   * Date when TheoryMaterial was updated
   */
  public updatedAt: Date;

  /**
   * TheoryMaterial's topic's uuid
   */
  public topicUuid: string;

  /**
   * TheoryMaterial's description
   */
  public description: string;

  /**
   * TheoryMaterial's order
   */
  public order: number;

  constructor(theoryMaterialData: TheoryMaterialProps) {
    makeAutoObservable(this);
    this.uuid = theoryMaterialData.uuid;
    this.name = theoryMaterialData.name;
    this.createdAt = theoryMaterialData.createdAt;
    this.updatedAt = theoryMaterialData.updatedAt;
    this.topicUuid = theoryMaterialData.topicUuid;
    this.description = theoryMaterialData.description;
    this.order = theoryMaterialData.order;
  }

  /**
   * Update theoryMaterial's name
   */
  public updateName(nameToUpdate: string): void {
    this.name = nameToUpdate;
  }

  /**
   * Update theoryMaterial's description
   */
  public updateDescription(descriptionToUpdate: string): void {
    this.description = descriptionToUpdate;
  }

}
