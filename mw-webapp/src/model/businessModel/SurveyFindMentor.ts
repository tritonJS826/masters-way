import {makeAutoObservable} from "mobx";

/**
 * Survey find a mentor model
 */
export class SurveyFindMentor {

  /**
   * Current level of knowledge
   */
  public currentExperience: string;

  /**
   * ???
   */
  public isHandled: boolean;

  /**
   * What is important in the mentor and education process
   */
  public mentorDescription: string;

  /**
   * What user want to learn
   */
  public skillsToLearn: string;

  /**
   * User's Email in the app
   */
  public userEmail: string;

  constructor(surveyData: SurveyFindMentor) {
    makeAutoObservable(this);
    this.currentExperience = surveyData.currentExperience;
    this.isHandled = surveyData.isHandled;
    this.mentorDescription = surveyData.mentorDescription;
    this.skillsToLearn = surveyData.skillsToLearn;
    this.userEmail = surveyData.userEmail;
  }

}
