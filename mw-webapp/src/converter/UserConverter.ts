import {User} from "src/model/businessModel/User";
// import {Way} from "src/model/businessModel/Way";
import {User as UserDTO} from "src/model/firebaseCollection/User";
// import {WayService} from "src/service/WayService";

// const WaysRaw = await WayService.onValueFromRealTimeDb();

export const UserDTOToUserConverter = (userRaw: UserDTO) => {
  // const ownWays = userRaw.ownWays?.map((item) => {
  //   const ownWay: Way = WaysRaw
  //     .find((elem) => elem.uuid === item) || WaysRaw[0];
  //   return ownWay;
  // });

  // const favoriteWays = userRaw.favoriteWays?.map((item) => {
  //   const favoriteWay: Way = WaysRaw
  //     .find((elem) => elem.uuid === item) || WaysRaw[0];
  //   return favoriteWay;
  // });

  // const mentoringWays = userRaw.mentoringWays?.map((item) => {
  //   const mentoringWay: Way = WaysRaw
  //     .find((elem) => elem.uuid === item) || WaysRaw[0];
  //   return mentoringWay;
  // });

  return new User({
    ...userRaw,
    // ownWays: ownWays,
    // favoriteWays: favoriteWays,
    // mentoringWays: mentoringWays,
  });
};

