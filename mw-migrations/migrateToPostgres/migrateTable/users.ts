import { Client } from "pg";
import usersJSON from "../../backups/users.bkp.json" assert { type: "json" };
import {convertFirebaseUuidToPgUuid, firebaseDateToPgDate} from "../utils.js";

const query = 'INSERT INTO users(uuid, name, email, description, created_at, image_url, is_mentor, firebase_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';

export const users = (client: Client) => {
    usersJSON.forEach((user) => {
        const values = [
          convertFirebaseUuidToPgUuid(user.uuid),
          user.name,
          user.email,
          user.description,
          firebaseDateToPgDate(user.createdAt),
          user.imageUrl,
          user.isMentor,
          user.uuid
        ];

        client.query(query, values, (err: any, result: any) => {
          // values
            if (err) {
              console.error('Error executing query', err);
            } else {
              console.log('Query result users:', result.rows);
            }
          });
    });
};