import {makeAutoObservable} from "mobx";

/**
 * Enabled notification model
 */
export class EnabledNotification {

  /**
   * Enabled notification uuid
   */
  public uuid: string;

  /**
   * Notification channel (like mail, in-app, telegram bot etc.)
   */
  public channel: string;

  /**
   * Nature of the notification (like jobDone created, mentor request applied etc.)
   */
  public nature: string;

  /**
   * If true - use will receive such notifications
   */
  public isEnabled: boolean;

  constructor(params: EnabledNotification) {
    makeAutoObservable(this);
    this.channel = params.channel;
    this.isEnabled = params.isEnabled;
    this.nature = params.nature;
    this.uuid = params.uuid;
  }

}
