import { UserService } from "../../service/UserService.js";

export const exportUsers = async (params: {log: (textToLog: string) => void, backupToFile: (data:string) => void}) => {
  params.log(`Starting export Users collection`)
  const allUsers = await UserService.getUsersDTO();
  params.log(`Got ${allUsers.length} users`)

  params.backupToFile(JSON.stringify(allUsers));
  params.log(`Export Users finished`);

  return allUsers.length;
};
