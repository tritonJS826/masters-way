import {LanguageService} from "src/service/LangauageService";
import {Language} from "src/utils/LanguageWorker";
import {Symbols} from "src/utils/Symbols";

/**
 * Available way statuses
 */
export const WayStatus = {
  completed: "Completed",
  inProgress: `In${Symbols.NO_BREAK_SPACE}progress`,
  abandoned: "Abandoned",
} as const;

export type WayStatusType = typeof WayStatus[keyof typeof WayStatus];

/**
 * {@link getWayStatus} parameters
 */
type getWayStatusParams = {

  /**
   * Is way marked as completed
   */
  status: string | null;

  /**
   * Last update of the way
   */
  lastUpdate: Date;

  /**
   * Language
   */
  language: Language;
}

// 14 days
export const ABANDONED_AFTER_MS = 1209600000;

/**
 * Get way status
 */
export const getWayStatus = (params: getWayStatusParams): string => {
  if (params.status === "Completed") {
    return LanguageService.allWays.filterBlock.typeOptions.completed[params.language];
  } else {
    const currentDate = new Date();
    const isLastUpdateRecently = currentDate.getTime() - params.lastUpdate.getTime() < ABANDONED_AFTER_MS;

    return isLastUpdateRecently
      ? LanguageService.allWays.filterBlock.typeOptions.inProgress[params.language]
      : LanguageService.allWays.filterBlock.typeOptions.abandoned[params.language];
  }
};
