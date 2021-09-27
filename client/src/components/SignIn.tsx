import React, { useContext } from 'react';
import { AuthContext } from '../firebase/context';
import firebase from 'firebase/app';

export const SignIn: React.FC = () => {
  const { user } = useContext(AuthContext);
  const provider = new firebase.auth.GoogleAuthProvider();

  const popupSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.credential, result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const signOut = () => {
    firebase.auth().signOut();
  };

  return user ? (
    <div>
      {user.displayName} <button onClick={signOut}>Go Sign Out</button>
    </div>
  ) : (
    <div>
      not signed in<button onClick={popupSignIn}>Go Sign in</button>
    </div>
  );
};
