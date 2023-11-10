import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {ColumnNameProps} from "src/logic/waysTable/renderCellValue/renderCellValue";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Update Way
 */
export const updateName = async (updatedText: string, uuid: string, columnName: keyof ColumnNameProps) => {
  const oldWay = await WayPreviewDAL.getWayPreview(uuid);

  const updatedWay: WayPreview = {
    ...oldWay,
    [`${columnName}`]: updatedText,
  };
  await WayPreviewDAL.updateWayPreview(updatedWay);
};