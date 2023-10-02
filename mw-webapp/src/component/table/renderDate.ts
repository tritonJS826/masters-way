import {CellContext} from "@tanstack/react-table";
import {DayReport} from "src/model/businessModel/DayReport";
import {DateUtils} from "src/utils/DateUtils";

export const renderDate = (cellValue: CellContext<DayReport, Date>) => {
  return (
    DateUtils.getShortISODateValue(cellValue.getValue())
  );
};