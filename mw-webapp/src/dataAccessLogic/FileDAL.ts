import {fileDTOToFile} from "src/dataAccessLogic/DTOToPreviewConverter/fileDTOToFile";
import {FileModel} from "src/model/businessModel/File";
import {FileService} from "src/service/FileService";

/**
 * Upload file props
 */
interface UploadFileProps {

  /**
   * Room's ID
   */
  roomId: string;

  /**
   * File
   */
  file: Blob;
}

/**
 * Provides methods to interact with files in the message
 */
export class FileDAL {

  /**
   * Upload file
   */
  public static async uploadFile(props: UploadFileProps): Promise<FileModel> {
    const fileDTO = await FileService.uploadFile({
      roomId: props.roomId,
      file: props.file,
    });
    const file = fileDTOToFile(fileDTO);

    return file;
  }

}
