import React, { useContext } from 'react';
import { SignIn } from './components/SignIn';
import { AuthProvider } from './firebase/context';

function App() {
  return (
    <AuthProvider>
      <SignIn />
    </AuthProvider>
  );
}

export default App;
