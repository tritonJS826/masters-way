import { doc, writeBatch } from "firebase/firestore";
import { CommentDTOMigration } from "../DTOModel/CommentDTO.js";
import { db } from "../firebase.js";
import { CommentService } from "../service/CommentService.js";
import { logToFile } from "../utils/logToFile.js";

const FILE_TO_LOG = "commentsMigration_add_ownerUuid_and_tags_delete_commentatorUuid"
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, FILE_TO_LOG);

/*
 * Add ownerUuid and tags propertied and deleted commentatorUuid property to all comments
 */
const migrateComments = async () => {
  const commentsMigrationStartTime = new Date();
  log(`Migration started`);

  log(`Getting all comments`)
  const allComments = await CommentService.getCommentsDTO();
  log(`Got ${allComments.length} comments`)

  log(`Getting all comments to migrate`);
  const commentsToMigrate: CommentDTOMigration[] = allComments.filter(comment =>
    !Array.isArray(comment.ownerUuid)
    || Array.isArray(comment.commentatorUuid))
  log(`Got ${commentsToMigrate.length} comments to migrate`);

  log(`start migrate comments one by one`)

  const batch = writeBatch(db);
  for (const comment of commentsToMigrate) {
    const commentMigrationStartTime = new Date();
    const {commentatorUuid, ...commentWithoutCommentatorUuid} = comment;
    try {
      log(`started ${comment.uuid} migration`);
      
      const commentRef = doc(db, "comments", comment.uuid);
      batch.set(commentRef, {
        ...commentWithoutCommentatorUuid,
        ownerUuid: comment.commentatorUuid,
      });

      const commentMigrationEndTime = new Date();
      const commentMigrationTime = commentMigrationEndTime.getTime() - commentMigrationStartTime.getTime();
      log(`finished ${comment.uuid} migration successfully in ${commentMigrationTime} ms`);
    } catch (e) {
      const commentMigrationEndTime = new Date();
      const commentMigrationTime = commentMigrationEndTime.getTime() - commentMigrationStartTime.getTime();
      log(`Error when migrating ${comment.uuid} with error: ${(e as Error)?.message} (in ${commentMigrationTime} ms)`)
    }
  }

  await batch.commit();

  const commentsMigrationEndTime = new Date();
  const commentsMigrationTime = commentsMigrationEndTime.getTime() - commentsMigrationStartTime.getTime();

  log(`
    Migrations report:

    Migration goal:
    Change commentatorUuid to ownerUuid and add tags to Comment collection
    
    Start time: ${commentsMigrationStartTime}
    End time: ${commentsMigrationEndTime}
    Total time: ${commentsMigrationTime} ms

    Total Models to changed: ${commentsToMigrate.length}
  `)
}

migrateComments();
