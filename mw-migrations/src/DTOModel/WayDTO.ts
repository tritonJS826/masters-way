export type JobTag = {
  uuid: string;
  name: string;
  description: string;
  color: string;
}

export type WayDTOMigration = {
  uuid: string;
  name: string;
  dayReportUuids: string[];
  ownerUuid: string;
  goalUuid: string;
  mentorRequestUuids: string[];
  isCompleted: boolean;
  lastUpdate: number;
  favoriteForUserUuids: string[];
  mentorUuids: string[];
  createdAt: number;
  currentMentorUuids: string[];
  wayTags: string[];
  jobTags: string[];
  // jobTagsStringified: JobTag[];
  jobTagsStringified: string[];
  monthReportUuids: string[];
  metricsStringified: string[];
}

export type WayDTO = {
  uuid: string;
  ownerUuid: string;
  name: string;
  monthReportUuids: string[];
  mentorRequestUuids: string[];
  isCompleted: boolean;
  goalUuid: string;
  dayReportUuids: string[];
  currentMentorUuids: string[];
}

export type WayBackup = {
  uuid: string;
  name: string;
  dayReportUuids: string[];
  ownerUuid: string;
  goalUuid: string;
  mentorRequestUuids: string[];
  isCompleted: boolean;
  lastUpdate: {
    seconds: number,
    nanoseconds: number,
  };
  favoriteForUserUuids: string[];
  mentorUuids: string[];
  createdAt: {
    seconds: number,
    nanoseconds: number,
  };
  currentMentorUuids: string[];
  wayTags: string[];
  jobTags: string[];
  monthReportUuids: string[];
}