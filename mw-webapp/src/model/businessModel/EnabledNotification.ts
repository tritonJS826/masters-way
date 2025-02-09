import {makeAutoObservable} from "mobx";
import {NotificationNature} from "src/component/notificationBlock/notificationItem/NotificationItem";

/**
 * Notification setting model
 */
export class NotificationSetting {

  /**
   * Enabled notification uuid
   */
  public uuid: string;

  /**
   * Notification channel (mail or webapp)
   */
  public channel: string;

  /**
   * Nature of the notification
   */
  public nature: NotificationNature;

  /**
   * If true - use will receive such notifications
   */
  public isEnabled: boolean;

  constructor(params: NotificationSetting) {
    makeAutoObservable(this);
    this.channel = params.channel;
    this.isEnabled = params.isEnabled;
    this.nature = params.nature;
    this.uuid = params.uuid;
  }

}
