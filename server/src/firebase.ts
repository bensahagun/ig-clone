import * as firebase from 'firebase-admin';

const app = firebase.initializeApp({
  credential: firebase.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: (process.env.FIREBASE_PRIVATE_KEY as any).replace(/\\n/g, '\n'),
  }),
});

const createUserSessionToken = async (idToken: string, ctx: any) => {
  const decodedIdToken = await app.auth().verifyIdToken(idToken);

  if (!(new Date().getTime() / 1000 - decodedIdToken.auth_time < 15 * 60)) throw new Error('Recent sign in required!');

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  const token = await app
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .catch((error: Error) => {
      throw new Error('User Session Token Creation Error:' + error.message);
    });
  if (token) return token;
  else throw new Error('User Session Token Creation Error');
};

const verifyUserSessionToken = async (token: string) => {
  try {
    const user = await app.auth().verifySessionCookie(token, true /** checkRevoked */);

    if (user.id) return user;
    throw new Error('User Session Token Verification Error');
  } catch (error) {
    console.log((error as any).message);
  }
};

const getUserRecord = (uid: string) => app.auth().getUser(uid);

const verifyIdToken = (idToken: string) => app.auth().verifyIdToken(idToken);

//TODO: refresh tokens

export { createUserSessionToken, verifyUserSessionToken, getUserRecord, verifyIdToken };
