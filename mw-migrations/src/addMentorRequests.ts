import { WayService } from "./service/WayService.js";

const waysDTO = await WayService.getWaysDTO()

waysDTO.forEach((wayDTO) => {
  WayService.updateWayDTO({...wayDTO, mentorRequestsUuids: []}, wayDTO.uuid)
})