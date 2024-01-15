# Instructions for working locally with firebase

## Creating your own firebase config

1. Create an account on firebase (https://firebase.google.com)
2. Go to console (https://console.firebase.google.com/u/0/)
3. Create a new project with name "masters-way-local"
4. You can opt out of Google Analytics collection
5. Get started by adding Firebase to your app: chose web
6. Copy block "firebase config" into .env file
7. In the left sidebar choose: Build => Firestore database => create database => chose appropriate location => Next
8. Choose Production mode or set up your custom mode
9. Configure authorization: Build => Authentication => Get started => Choose Google
10. Check if the application starts locally
11. If an error appears related to indexes in firebase, follow the link that you will find in the error description and add the necessary indexes

## Import registered users

1. Ask Ekaterina or Victor to send you a document with registered users
2. Open a terminal and install firebase-cli (https://firebase.google.com/docs/cli?hl=ru)
3. Login to firebase by command firebase login in the terminal
4. Use the command ```firebase projects:list``` to display all your projects in firebase
5. Go to Firebase console => Authentication and find Password hash parameters (in the menu at the top of the table with users)
6. Use the next command in the terminal to import registered users:
```firebase auth:import fileName.json --hash-algo=scrypt --rounds=8 --mem-cost=14 --hash-key=<Long string with hash key from Password hash parameters> --salt-separator=<Short string with hash key from Password hash parameters> --project <PROJECT_ID>```
