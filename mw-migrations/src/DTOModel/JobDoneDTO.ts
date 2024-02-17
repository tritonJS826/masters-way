export type JobDoneDTOMigration = {
  uuid: string;
  description: string;
  time: number;
  tags: string[];
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


