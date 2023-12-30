import logo from "src/assets/mastersWayLogo.svg";

type NotifyParams = {

  /**
   * Time to notify
   * @param time "hh:mm" format
   */
  time: string;

  /**
   * Notification title
   */
  title: string;

  /**
   * Notification body
   */
  body: string;

  /**
   * Notification image source
   */
  img: string;
}

/**
 * OS notifications
 */
export class OSNotification {

  /**
   * Time to notify
   * @param time "hh:mm" format
   */
  public static notify(notifyParams: NotifyParams) {
    const options = {
      body: notifyParams.body,
      icon: notifyParams.img,
    };
    new Notification(notifyParams.title, options);
  }

  /**
   * @param notificationTime format: "hh:mm"
   */
  public static addDeferredNotification = async (notificationTime: string) => {
    const result = await Notification.requestPermission();
    if (result === "granted") {
      const DEFFER_TIME = 1_000;
      setTimeout(() => OSNotification.notify({
        time: notificationTime,
        title: "test title",
        body: "test body",
        img: logo,
      }), DEFFER_TIME);
    }
  };

}
