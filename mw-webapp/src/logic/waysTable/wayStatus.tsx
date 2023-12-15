/**
 * Available way statuses
 */
enum WayStatus {
  Completed = "Completed",
  InProgress = "In progress",
  Abandoned = "Abandoned"
}

/**
 * {@link getWayStatus} parameters
 */
type getWayStatusParams = {

  /**
   * Is way marked as completed
   */
  isCompleted: boolean;

  /**
   * Last update of the way
   */
  lastUpdate: Date;
}

/**
 * Get way status
 */
export const getWayStatus = (params: getWayStatusParams): WayStatus => {
  if (params.isCompleted) {
    return WayStatus.Completed;
  } else {
    const currentDate = new Date();
    // 14 days
    const ABANDONED_AFTER_MS = 1209600000;
    const isLastUpdateRecently = currentDate.getTime() - params.lastUpdate.getTime() < ABANDONED_AFTER_MS;

    return isLastUpdateRecently
      ? WayStatus.InProgress
      : WayStatus.Abandoned;
  }
};
