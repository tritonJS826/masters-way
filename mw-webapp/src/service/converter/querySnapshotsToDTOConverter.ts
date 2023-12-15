import {DocumentData, QuerySnapshot} from "firebase/firestore";

/**
 * Convert array of queries data from firestore to DTO models
 * @returns DTO
 */
export const querySnapshotsToDTOConverter = <T>(snaps: QuerySnapshot<DocumentData, DocumentData>[]): T[] => {
  const chunkDataDTO = snaps.map((snap) => {
    return snap.docs.map((doc) => ({...doc.data()} as T));
  });

  const dataDTO = chunkDataDTO.flat();

  return dataDTO;
};
