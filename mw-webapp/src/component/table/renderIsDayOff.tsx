import {CellContext} from "@tanstack/react-table";
import {DayReport} from "src/model/businessModel/DayReport";

export const renderIsDayOff = (cellValue: CellContext<DayReport, boolean>) => {
  return (
    cellValue.getValue() === true ?
      <div>
        Yes
      </div>
      :
      <div>
        No
      </div>
  );
};