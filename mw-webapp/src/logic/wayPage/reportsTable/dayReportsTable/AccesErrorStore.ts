import {makeAutoObservable} from "mobx";
import {DayReportCompositionParticipant} from "src/model/businessModel/DayReportCompositionParticipants";

/**
 * All accessError-related methods
 */
export class AccessErrorStore {

  /**
   * Way name
   */
  public dayReportParticipant: DayReportCompositionParticipant | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Set AccessErrorStore
   */
  public setAccessErrorStore = (dayReportParticipant: DayReportCompositionParticipant) => {
    this.dayReportParticipant = dayReportParticipant;
  };

  /**
   * Clear AccessErrorStore
   */
  public clearAccessErrorStore = () => {
    this.dayReportParticipant = null;
  };

}

