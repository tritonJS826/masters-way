import {useEffect, useState} from "react";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {PropsWithUuid} from "src/logic/waysTable/OwnWaysTable";
import {waysColumns} from "src/logic/waysTable/waysColumns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Render table of mentoring ways preview
 */
export const MentoringWaysTable = (props: PropsWithUuid) => {
  const [mentoringWays, setMentoringWays] = useState<WayPreview[]>([]);

  /**
   * Load User mentoring ways
   */
  const loadMentoringWays = async () => {
    const data = await WayPreviewDAL.getUserWaysPreview(props.uuid, "Mentoring");
    setMentoringWays(data);
  };

  useEffect(() => {
    loadMentoringWays();
  }, []);

  return (
    <WaysTable
      data={mentoringWays}
      columns={waysColumns}
    />
  );
};
