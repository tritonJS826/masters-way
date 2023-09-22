import {querySnapshot} from "src/converter/querySnapshot";
import {Way as WayDTO} from "src/model/firebaseCollection/Way";

export const querySnapshotToWayDTOConverter = (waysRaw: querySnapshot) => {
  const ways: WayDTO[] = waysRaw.docs.map((wayRaw) => ({
    uuid: wayRaw.data().uuid,
    ownerUuid: wayRaw.data().ownerUuid,
    monthReportUuids: wayRaw.data().monthReportUuids,
    dayReportUuids: wayRaw.data().dayReportUuids,
    goalUuid: wayRaw.data().goalUuid,
    currentMentors: wayRaw.data().currentMentors,
    isCompleted: wayRaw.data().isCompleted,
  }));
  return ways;
};
