import {makeAutoObservable} from "mobx";

export type CompanionCharacter =
  | "army_sergeant"
  | "creative_artist"
  | "warm_sister"
  | "wise_mentor"
  | "cheerful_friend";

/**
 * Companion feedback props
 */
export interface CompanionFeedbackProps {

  /**
   * Feedback status (0-100)
   */
  status: number;

  /**
   * Feedback comment text
   */
  comment: string;

  /**
   * Companion character type
   */
  character: CompanionCharacter;

  /**
   * Last update timestamp
   */
  lastUpdatedAt: string;
}

/**
 * Companion feedback model
 */
export class CompanionFeedback {

  /**
   * Feedback status (0-100)
   */
  public status: number;

  /**
   * Feedback comment text
   */
  public comment: string;

  /**
   * Companion character type
   */
  public character: CompanionCharacter;

  /**
   * Last update timestamp
   */
  public lastUpdatedAt: string;

  /**
   * Constructor
   * @param companionFeedback - Feedback data
   */
  constructor(companionFeedback: CompanionFeedbackProps) {
    makeAutoObservable(this);
    this.status = companionFeedback.status;
    this.comment = companionFeedback.comment;
    this.character = companionFeedback.character;
    this.lastUpdatedAt = companionFeedback.lastUpdatedAt;
  }

}
