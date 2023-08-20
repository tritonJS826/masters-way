import {createContext} from "react";
import firebase from "firebase/compat/app";
import {Firestore} from "firebase/firestore";

interface AppContext {
  firebase: typeof firebase,
  firestore: Firestore,
}

export const AppContext = createContext<AppContext>({} as AppContext);