import {makeAutoObservable} from "mobx";

/**
 * DayReportCompositionParticipant props
 */
interface DayReportCompositionParticipantProps {

  /**
   * DayReport's ID
   */
  dayReportId: string;

  /**
   * Way's ID
   */
  wayId: string;

  /**
   * Way's name
   */
  wayName: string;
}

/**
 * DayReportCompositionParticipant model
 */
export class DayReportCompositionParticipant {

  /**
   * DayReport's ID
   */
  public dayReportId: string;

  /**
   * Way's ID
   */
  public wayId: string;

  /**
   * Way's name
   */
  public wayName: string;

  constructor(compositionParticipantData: DayReportCompositionParticipantProps) {
    makeAutoObservable(this);
    this.dayReportId = compositionParticipantData.dayReportId;
    this.wayId = compositionParticipantData.wayId;
    this.wayName = compositionParticipantData.wayName;
  }

}

