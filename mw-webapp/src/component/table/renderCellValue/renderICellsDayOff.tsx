import {CellContext} from "@tanstack/react-table";
import {DayReport} from "src/model/businessModel/DayReport";

/**
 * Render cell IsDayOff
 * @param {CellContext<DayReport, boolean>} cellValue
 * @returns {JSX.Element} JSX.Element
 */
export const renderCellIsDayOff = (cellValue: CellContext<DayReport, boolean>): JSX.Element => {
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