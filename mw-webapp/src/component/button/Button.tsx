/* eslint-disable max-len */
import {ref, update} from "firebase/database";
import {db} from "src/firebase";
import styles from "src/component/button/Button.module.scss";

// const handleClick = () => {
//   console.log(2);
// };

function writeNewPost() {

  // A post entry.
  const postData = {
    "id": "11",
    "date": "2023-05-08",
    "workDone": [
      {
        "id": "",
        "todoItem": "",
        "time": {
          "unit": "MINUTE",
          "amount": null,
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

  // const randomNumber = Math.floor(Math.random() * 100);

  // Get a key for a new Post.
  // const newPostKey = push(child(ref(db), "/")).key;
  // const newPostKey = 10;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates["/" + postData.id] = postData;

  return update(ref(db), updates);
}

export const Button = () => {
  return (
    <button className={styles.button}
      onClick={writeNewPost}
    >
      Click
    </button>
  );
};