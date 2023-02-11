import React, { useContext } from "react";

import Home from "./components/Home";
import MainHeader from "./components/Header";
import Login from "./components/Login";

import AuthContext from "./store/auth-context";

function App() {
  const { isLoggedIn } = useContext(AuthContext) 

  return (
    <>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Home />}
      </main>
    </>
  );
}

export default App;
