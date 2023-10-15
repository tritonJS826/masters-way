import {CellContext} from "@tanstack/react-table";
import {DayReport} from "src/model/businessModel/DayReport";
import {DateUtils} from "src/utils/DateUtils";

/**
 * Render cell's date
 */
export const renderCellDate = (cellValue: CellContext<DayReport, Date>) => {
  return (
    DateUtils.getShortISODateValue(cellValue.getValue())
  );
};