import * as functions from "firebase-functions";
import {getDatabase, ref, set} from "firebase/database";
import * as firebaseAdmin from "firebase-admin";

firebaseAdmin.initializeApp();
firebaseAdmin.firestore();


export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});


export const writeUserData = functions.https.onRequest((req, res)=> {
  const db = getDatabase();
  const body = req.body;

  set(ref(db, "users/" + body.userId), {
    username: body.name,
    email: body.email,

  });
  res.send(200);
});
