/* eslint-disable max-len */
import {ref, push, child, update} from "firebase/database";
import {db} from "src/firebase";
import styles from "src/component/button/Button.module.scss";

function writeNewPost() {

  // A post entry.
  const postData = {
    "id": "11",
    "date": "2023-05-12",
    "workDone": [
      {
        "id": "",
        "todoItem": "",
        "time": {
          "unit": "MINUTE",
          "amount": 20,
        },
      },
    ],
    "planForTomorrow": [
      {
        "id": "0",
        "todoItem": "Add possibility to add reports to firebase from browser",
        "time": {
          "unit": "MINUTE",
          "amount": 90,
        },
      },
    ],
    "currentProblems": [""],
    "studentComment": [""],
    "learnedForToday": [""],
    "mentorComment": [""],
    "isDayOff": false,
  };

  // Get a key for a new Post. Generate a random key
  const newPostKey = push(child(ref(db), "/")).key;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updates: { [key: string]: any } = {};
  updates["/" + newPostKey] = postData;

  return update(ref(db), updates);
}


export const Button = () => {
  return (
    <button className={styles.button}
      onClick={writeNewPost}
    >
      Create new report
    </button>
  );
};