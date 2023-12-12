import {useEffect, useState} from "react";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Fetches WayPreview, returns Way or error if way doesn't exist
 */
export function useWayPreview (uuid: string) {
  const [way, setWay] = useState<WayPreview | null>(null);
  const [error, setError] = useState(false);

  /**
   * Get WayPreview
   */
  const loadWay = async () => {
    const wayData = await WayPreviewDAL.getWayPreview(uuid);
    if (!wayData) {
      setError(true);
    } else {
      setWay(wayData);
    }

  };

  useEffect(() => {
    loadWay();
  }, []);

  return {way, setWay, error};
}
