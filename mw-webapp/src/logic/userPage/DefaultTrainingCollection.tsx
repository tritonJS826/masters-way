import {DefaultWayCollections, WayCollection} from "src/model/businessModel/User";

/**
 * Default trainings collections
 */
export enum DefaultTrainingCollection {
  OWN = "owner",
  MENTORING = "mentor",
  FAVORITE = "favorite",
  STUDENT = "student"
}

/**
 * Get all collections
 */
export const getAllCollections = (
  defaultWayCollections: DefaultWayCollections,
  customWayCollections: WayCollection[],
) => {
  const allWayCollections = [
    defaultWayCollections.own,
    defaultWayCollections.mentoring,
    defaultWayCollections.favorite,
    ...customWayCollections,
  ];

  return allWayCollections;
};
