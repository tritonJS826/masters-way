import {makeAutoObservable} from "mobx";

/**
 * SurveyUserIntro model
 */
export class SurveyUserIntro {

  /**
   * Device id
   */
  public deviceId: string;

  /**
   * Preferred interface language
   */
  public preferredInterfaceLanguage: string;

  /**
   * User's role
   */
  public role: string;

  /**
   * User's source
   */
  public source: string;

  /**
   * User's experience
   */
  public studentExperience: string;

  /**
   * User's goals
   */
  public studentGoals: string;

  /**
   * User's reason why registered
   */
  public whyRegistered: string;

  constructor(surveyData: SurveyUserIntro) {
    makeAutoObservable(this);
    this.deviceId = surveyData.deviceId;
    this.preferredInterfaceLanguage = surveyData.preferredInterfaceLanguage;
    this.role = surveyData.role;
    this.source = surveyData.source;
    this.studentExperience = surveyData.studentExperience;
    this.studentGoals = surveyData.studentGoals;
    this.whyRegistered = surveyData.whyRegistered;
  }

}
