import {NotificationNature} from "src/component/notificationBlock/notificationItem/NotificationItem";

/**
 * Convert nature string to enum
 */
export const convertNatureStringToEnum = (nature: string): NotificationNature => {
  switch (nature) {
    case NotificationNature.favorite_way:
      return NotificationNature.favorite_way;
      break;
    case NotificationNature.group_chat:
      return NotificationNature.group_chat;
      break;
    case NotificationNature.mentoring_request:
      return NotificationNature.mentoring_request;
      break;
    case NotificationNature.mentoring_way:
      return NotificationNature.mentoring_way;
      break;
    case NotificationNature.own_way:
      return NotificationNature.own_way;
      break;
    case NotificationNature.private_chat:
      return NotificationNature.private_chat;
      break;
    default:
      return NotificationNature.own_way;
  }
};
