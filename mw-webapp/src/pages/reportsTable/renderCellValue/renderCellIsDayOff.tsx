import {CellContext} from "@tanstack/react-table";
import {DayReport} from "src/model/businessModel/DayReport";

/**
 * Render cell IsDayOff
 */
export const renderCellIsDayOff = (cellValue: CellContext<DayReport, boolean>) => {
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