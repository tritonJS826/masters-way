import {querySnapshotToDTOConverter} from "src/convertDTOToBusiness/querySnapshotToDTOConverter";
import {WayDTO} from "src/model/firebaseCollection/WayDTO";
import {querySnapshot} from "src/model/querySnapshot";

export const WayDTOToWayPreviewConverter = (waysRaw: querySnapshot) => {
  const waysDTO: WayDTO[] = querySnapshotToDTOConverter<WayDTO>(waysRaw);
  return waysDTO;
};
