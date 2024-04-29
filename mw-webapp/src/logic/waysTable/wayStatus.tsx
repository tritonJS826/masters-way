import {LanguageService} from "src/service/LangauageService";
import {Language} from "src/utils/LanguageWorker";

/**
 * Available way statuses
 */
export const WayStatus = {
  completed: "completed",
  inProgress: "inProgress",
  abandoned: "abandoned",
} as const;

export type WayStatusType = typeof WayStatus[keyof typeof WayStatus];

/**
 * {@link WayStatusUI} parameters
 */
type WayStatusUIParams = {

  /**
   * Is way marked as completed
   */
  status: WayStatusType;

  /**
   * Language
   */
  language: Language;
}

/**
 * Way status
 */
interface WayStatus {

  /**
   * Is way marked as completed
   */
  status: string | null;

  /**
   * Last update of the way
   */
  lastUpdate: Date;

}

// 14 days
export const ABANDONED_AFTER_MS = 1209600000;

/**
 * Get way status
 */
export const getWayStatus = (params: WayStatus): WayStatusType => {
  if (params.status === "Completed") {
    return WayStatus.completed;
  } else {
    const currentDate = new Date();
    const isLastUpdateRecently = currentDate.getTime() - params.lastUpdate.getTime() < ABANDONED_AFTER_MS;

    return isLastUpdateRecently
      ? WayStatus.inProgress
      : WayStatus.abandoned;
  }
};

/**
 * Get formatted way status doe UI layer
 */
export const wayStatusConverter = (params: WayStatusUIParams): string => {
  return LanguageService.allWays.filterBlock.typeOptions[params.status][params.language];
};
