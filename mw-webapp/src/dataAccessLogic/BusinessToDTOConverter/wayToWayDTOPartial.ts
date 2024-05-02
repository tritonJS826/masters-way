import {SchemasUpdateWayPayload} from "src/apiAutogenerated";
import {deleteUndefinedFields} from "src/dataAccessLogic/BusinessToDTOConverter/deleteUndefinedFields";
import {Way} from "src/model/businessModel/Way";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Convert {@link way} to {@link SchemasUpdateWayPayload}
 */
export const wayToWayDTOPartial = (way: PartialWithUuid<Way>): SchemasUpdateWayPayload => {
  const wayPartialDTO: SchemasUpdateWayPayload = {
    name: way.name,
    goalDescription: way.goalDescription,
    estimationTime: way.estimationTime,
    isPrivate: way.isPrivate,
  };

  const preparedWayPartialDTO = deleteUndefinedFields(wayPartialDTO);

  return preparedWayPartialDTO;
};