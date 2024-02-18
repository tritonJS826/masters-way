import {Symbols} from "src/utils/Symbols";

/**
 * Available way statuses
 */
export const WayStatus = {
  Completed: "Completed",
  InProgress: `In${Symbols.NO_BREAK_SPACE}progress`,
  Abandoned: "Abandoned",
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
}

// 14 days
export const ABANDONED_AFTER_MS = 1209600000;

/**
 * Get way status
 */
export const getWayStatus = (params: getWayStatusParams): WayStatusType => {
  if (params.status === "completed") {
    return WayStatus.Completed;
  } else {
    const currentDate = new Date();
    const isLastUpdateRecently = currentDate.getTime() - params.lastUpdate.getTime() < ABANDONED_AFTER_MS;

    return isLastUpdateRecently
      ? WayStatus.InProgress
      : WayStatus.Abandoned;
  }
};
