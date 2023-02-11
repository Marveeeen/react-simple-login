import { useState } from "react";

import Home from "./components/Home";
import MainHeader from "./components/Header";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Home />}
      </main>
    </>
  );
}

export default App;
