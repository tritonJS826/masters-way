import { Timestamp } from "firebase/firestore";

export type UserDTOMigration = {
  uuid: string;
  name: string;
  email: string;
  ownWayUuids: string[];
  favoriteWayUuids: string[];
  mentoringWayUuids: string[];
  description: string;
  createdAt: Timestamp;
}

export type UserDTO = {
  uuid: string;
  name: string;
  email: string;
  ownWayUuids: string[];
  favoriteWayUuids: string[];
  mentoringWayUuids: string[];
  description: string;
}