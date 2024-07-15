import {Way} from "src/model/businessModel/Way";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Convert {@link way} to {@link WayPreview}
 */
export const wayToWayPreview = (way: Way): WayPreview => {
  const mentors = Array.from(way.mentors).map(([, value]) => value);

  const wayPreview = new WayPreview({
    ...way,
    dayReportsAmount: way.dayReports.length,
    favoriteForUsers: way.favoriteForUsersAmount,
    mentors,
    metricsDone: way.metrics.filter((metric) => metric.isDone).length,
    metricsTotal: way.metrics.length,
    childrenUuids: way.children.map((child) => child.uuid),
  });

  return wayPreview;
};
