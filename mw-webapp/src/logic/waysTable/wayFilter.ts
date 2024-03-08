import {FILTER_STATUS_ALL_VALUE} from "src/logic/waysTable/BaseWaysTable";
import {WayStatus, WayStatusType} from "src/logic/waysTable/wayStatus";
import {GetWaysFilter} from "src/service/WayService";

/**
 * Get filter for ways
 */
export const getWaysFilter = (filterStatus: WayStatusType | typeof FILTER_STATUS_ALL_VALUE): GetWaysFilter | undefined =>
  filterStatus !== FILTER_STATUS_ALL_VALUE
    ? {
      isAbandoned: filterStatus === WayStatus.abandoned,
      isCompleted: filterStatus === WayStatus.completed,
      isInProgress: filterStatus === WayStatus.inProgress,
    }
    : undefined;
