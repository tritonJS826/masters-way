import {fileDTOToFile} from "src/dataAccessLogic/DTOToPreviewConverter/fileDTOToFile";
import {FileModel} from "src/model/businessModel/File";
import {FileService} from "src/service/FileService";

/**
 * Provides methods to interact with files in the message
 */
export class FileDAL {

  /**
   * Upload file
   */
  public static async uploadFile(fileBlob: Blob): Promise<FileModel> {
    const fileDTO = await FileService.uploadFile({file: fileBlob});
    const file = fileDTOToFile(fileDTO);

    return file;
  }

}
