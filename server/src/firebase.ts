import * as firebase from 'firebase-admin';
import { Context } from './utils';

const app = firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: (process.env.FIREBASE_PRIVATE_KEY as any).replace(/\\n/g, '\n'),
  }),
});

//returns cookie token
const createUserSessionToken = async (args: { idToken: { toString: () => any } }, ctx: Context) => {
  // Get the ID token.
  const idToken = args.idToken.toString();

  // Only process if the user just signed in in the last 5 minutes.
  // To guard against ID token theft, reject and require re-authentication.
  const decodedIdToken = await app.auth().verifyIdToken(idToken);
  if (!(new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60)) throw new Error('Recent sign in required!');

  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.
  const token = await app
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .catch((error) => {
      console.log(error);
      throw new Error('User Session Token Creation Error');
    });
  if (token) return token;
  else throw new Error('User Session Token Creation Error');
};

//Returns decoded User Claims
const verifyUserSessionToken = async (token: string) => {
  //Verify session cookies tokens with firebase app.
  //This is a low overhead operation.
  const user = await app.auth().verifySessionCookie(token, true /** checkRevoked */);

  if (user.id) return user;
  else if (user.uid) {
    const { customClaims } = await getUserRecord(user.uid);
    return customClaims;
  } else throw new Error('User Session Token Verification Error');
};

const setUserClaims = (uid: string, data: object | null) => app.auth().setCustomUserClaims(uid, data);

const getUserRecord = (uid: string) => app.auth().getUser(uid);

const verifyIdToken = (idToken: string) => app.auth().verifyIdToken(idToken);

export { createUserSessionToken, verifyUserSessionToken, setUserClaims, getUserRecord, verifyIdToken };
