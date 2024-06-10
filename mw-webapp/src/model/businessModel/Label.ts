import {makeAutoObservable} from "mobx";

/**
 * Label's props
 */
interface LabelProps {

  /**
   * Label's uuid
   */
uuid: string;

  /**
   * Label's name
   */
name: string;

  /**
   * Label's description
   */
description: string;

  /**
   * Label's color
   */
color: string;
}

/**
 * Job tag data
 */
export class Label {

  /**
   * Way tag uuid
   */
  public uuid: string;

  /**
   * Way tag name
   */
  public name: string;

  /**
   * Way tag description
   */
  public description: string;

  /**
   * Way tag color
   */
  public color: string;

  constructor(label: LabelProps) {
    makeAutoObservable(this);
    this.name = label.name;
    this.uuid = label.uuid;
    this.description = label.description;
    this.color = label.color;
  }

  /**
   * Update way's label name
   */
  public updateName(nameToUpdate: string): void {
    this.name = nameToUpdate;
  }

  /**
   * Update way's label description
   */
  public updateDescription(descriptionToUpdate: string): void {
    this.description = descriptionToUpdate;
  }

  /**
   * Update way's label color
   */
  public updateColor(colorToUpdate: string): void {
    this.color = colorToUpdate;
  }

}
