import {useEffect, useState} from "react";
import {WayDALPreview} from "src/dataAccessLogic/WayDALPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

/**
 * Load day reports of specific Way if wayUuid is provided, otherwise load all day reports
 */
export const getWaysPreview = () => {
  const [waysPreview, setWaysPreview] = useState<WayPreview[]>([]);

  /**
   * Receives and transfer data of reports
   */
  const loadWaysPreview = async () => {
    const data = await WayDALPreview.getWaysPreview();

    setWaysPreview(data);
  };

  useEffect(() => {
    loadWaysPreview();
  }, []);

  return waysPreview;
};