# Instructions for working locally with firebase

## Creating your own firebase config

1. Create an account on firebase (https://firebase.google.com)
2. Go to console (https://console.firebase.google.com/u/0/)
3. Create a new project with name "masters-way-local"
4. You can opt out of Google Analytics collection
5. Get started by adding Firebase to your app: chose web
6. Create .env file according to .env.example inside mw-webapp
7. Get variable's values from the firebase config to the mw-webapp/.env and to the mw-migrations/.env
8. On the Firebase page in the left sidebar choose: Build => Firestore database => create database => chose location => Next
9. Choose Production mode
10. Configure authorization: Build => Authentication => Get started => Choose Google
11. Ask Ekaterina to send you a backup file (20240114.bkp.zip)
12. Unzip archive
13. Place backup files into mw-migrations/backups/
14. Go to mw-migrations directory and run the script ```import-backup```
15. Check if the application starts locally (run script pnpm run start in mw-webapp)
16. If an error appears related to indexes in firebase, follow the link that you will find in the error description and add the necessary indexes

## Import registered users

1. Open a terminal and install firebase-cli (https://firebase.google.com/docs/cli)
2. Login to firebase by command ```firebase login``` in the terminal
4. In Browser go to Firebase console => Build => Authentication and find Password hash parameters (in the menu at the top of the table with users). You will need to use ```base64_signer_key``` and ```base64_salt_separator``` on the next step
3. Use the command ```firebase projects:list``` to display all your projects in firebase. You will need ```PROJECT_ID``` on the next step
6. Run the next command in the root of the project to import registered users:
```firebase auth:import mw-migrations/backups/authUsers.json --hash-algo=scrypt --rounds=8 --mem-cost=14 --hash-key=<base64_signer_key> --salt-separator=<base64_salt_separator> --project <PROJECT_ID>```
