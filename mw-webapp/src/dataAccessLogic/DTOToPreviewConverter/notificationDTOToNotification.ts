import {Notification} from "src/model/businessModel/Notification";

/**
 * Convert {@link notificationDTO} to {@link Notification}
 */
export const notificationDTOToNotification = (notificationDTO: Notification): Notification => {
  return new Notification({...notificationDTO});
};
