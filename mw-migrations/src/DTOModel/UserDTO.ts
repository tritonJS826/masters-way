import { Timestamp } from "firebase/firestore";

export type UserDTONew = {
  uuid: string;
  name: string;
  email: string;
  ownWayUuids: string[];
  favoriteWayUuids: string[];
  mentoringWayUuids: string[];
  description: string;
  createdAt: Timestamp;
}

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

export type UserDTOBackup = {
  uuid: string;
  name: string;
  email: string;
  ownWayUuids: string[];
  favoriteWayUuids: string[];
  mentoringWayUuids: string[];
  description: string;
  createdAt: {
    seconds: number,
    nanoseconds: number,
  };
}