import {MINUTES_IN_HOUR} from "src/utils/DateUtils";

const MINUTES_THRESHOLD = 600;
const DECIMAL_PLACES = 1;

/**
 * Converted minutes to hours
 */
export const convertMinutesToHours = (minutes: number): string => {
  const hours = minutes / MINUTES_IN_HOUR;

  return minutes >= MINUTES_THRESHOLD
    ? Math.round(hours).toString()
    : hours.toFixed(DECIMAL_PLACES);
};
