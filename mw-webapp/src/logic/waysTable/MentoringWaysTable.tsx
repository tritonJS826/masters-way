import {useEffect, useState} from "react";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {columns} from "src/logic/waysTable/columns";
import {WaysTable} from "src/logic/waysTable/WaysTable";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Mentoring ways table props
 */
interface MentoringWaysTableProps {

  /**
   * User Uuid
   */
  uuid: string;
}

/**
 * Render table of mentoring ways preview
 */
export const MentoringWaysTable = (props: MentoringWaysTableProps) => {
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
      columns={columns}
    />
  );
};