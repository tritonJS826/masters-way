import {updateGoalPreview} from "src/logic/waysTable/renderCellValue/helpers/updateGoalPreview";
import {updateName} from "src/logic/waysTable/renderCellValue/helpers/updateName";
import {ColumnNameProps} from "src/logic/waysTable/renderCellValue/renderCellValue";
import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";

const updateCellsFunctions: Record<string, (text: string, uuid: string) => Promise<void>> = {updateGoalPreview};

/**
 * Update cells
 */
const updateCells = (nameOfFunction: string, text: string, uuid: string) => {
  if (!updateCellsFunctions[nameOfFunction]) {
    throw new Error("Function is not exist");
  }

  return updateCellsFunctions[nameOfFunction](text, uuid);
};

/**
 * Update cell value
 */
export const updateCell = (
  text: string,
  callback: (arg: boolean) => void,
  arrayItem?: GoalPreview,
  parentUuid?: string,
  columnName?: keyof ColumnNameProps,
) => {
  if (arrayItem) {
    updateCells(`update${arrayItem.constructor.name}`, text, arrayItem.uuid);
  } else if (parentUuid && columnName) {
    updateName(text, parentUuid, columnName);
  }
  callback(false);
};