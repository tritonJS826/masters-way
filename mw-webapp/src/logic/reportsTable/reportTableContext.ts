import {createContext, useContext} from "react";
import {DayReport} from "src/model/businessModel/DayReport";

/**
 * Dfg
 */
const STUB_SET_DAY_REPORTS = () => undefined;
const STUB_DAY_REPORTS: DayReport[] = [];

export type DayReports = {

  /**
   * DayReports
   */
  dayReports: DayReport[];

  /**
   * Set day reports
   */
  setDayReports: (dayReports: DayReport[]) => void;
}

export const DayReportsContext: React.Context<DayReports> = createContext<DayReports>({
  dayReports: STUB_DAY_REPORTS,
  setDayReports: STUB_SET_DAY_REPORTS,
});

/**
 * Let use and change dayReports inside context.provider
 */
export const useDayReportsContext = () => useContext(DayReportsContext);