import {DocumentData, DocumentSnapshot} from "firebase/firestore";

/**
 * Convert document data from firestore to DTO models
 */
export const documentSnapshotToDTOConverter = <T>(snap: DocumentSnapshot<DocumentData, DocumentData>): T => {
  return {...snap.data()} as T;
};
