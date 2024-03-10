import { Client } from "pg";
import usersJSON from "../../backups/users.bkp.json" assert { type: "json" };
import {firebaseDateToPgDate} from "../utils.js";

// examples
const query = 'INSERT INTO users(name, email, description, created_at, image_url, is_mentor) VALUES ($1, $2, $3, $4, $5, $6)';

export const users = async (client: Client) => {
    usersJSON.forEach((user) => {

        const values = [user.name, user.email, user.description, firebaseDateToPgDate(user.createdAt), user.imageUrl, user.isMentor];
        client.query(query, values, (err: any, result: any) => {values
            if (err) {
              console.error('Error executing query', err);
            } else {
              console.log('Query result:', result.rows);
            }
          });
    });
};