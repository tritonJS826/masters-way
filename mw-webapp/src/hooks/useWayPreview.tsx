import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {pages} from "src/router/pages";

/**
 * Fetches WayPreview and returns state
 */
export function useWayPreview (uuid: string) {
  const [way, setWay] = useState<WayPreview | null>(null);
  const navigate = useNavigate();

  /**
   * Get WayPreview
   */
  const loadWay = async () => {
    const wayData = await WayPreviewDAL.getWayPreview(uuid);
    // Navigate to PageError if transmitted way's uuid is not exist
    if (!wayData) {
      navigate(pages.page404.getPath({}));
    }
    setWay(wayData);
  };

  useEffect(() => {
    loadWay();
  }, []);

  return {way, setWay};
}
