import {DocumentData, QuerySnapshot} from "firebase/firestore";

/**
 * Convert data from firestore to DTO models
 * @param snap
 * @returns DTO
 */
export const querySnapshotToDTOConverter = <T>(snap: QuerySnapshot<DocumentData, DocumentData>): T[] => {
  return snap.docs.map((doc) => ({...doc.data()} as T));
};

