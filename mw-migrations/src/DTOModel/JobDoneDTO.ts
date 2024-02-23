export type JobTag = {
  uuid: string;
  name: string;
  description: string;
  color: string;
}

export type JobDoneDTOMigration = {
  uuid: string;
  description: string;
  time: number;
  tags: JobTag[];
}

export type JobTagDTOMigration = {
  uuid: string;
  name: string;
  description: string;
  color: string;
}

export type JobDoneDTO = {
  uuid: string;
  description: string;
  time: number;
  tags: string[];
}


