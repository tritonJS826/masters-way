import {DocumentData, QuerySnapshot} from "firebase/firestore";

export const querySnapshotToDTOConverter = <T>(snap: QuerySnapshot<DocumentData, DocumentData>): T[] => {
  return snap.docs.map((doc) => ({...doc.data()} as T));
};

