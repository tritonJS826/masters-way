import {SchemasRoomPreviewResponse} from "src/apiAutogenerated/chat";
import {ChatPreview} from "src/model/businessModelPreview/ChatPreview";

/**
 * Convert {@link chatPreviewDTO} to {@link ChatPreview}
 */
export const chatPreviewDTOToChatPreview = (chatPreviewDTO: SchemasRoomPreviewResponse): ChatPreview => {
  return new ChatPreview({
    ...chatPreviewDTO,
    name: chatPreviewDTO.name ?? "Chat has no name",
    src: null,
  });
};
