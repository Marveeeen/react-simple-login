import React, { useContext } from "react";

import AuthContext from "../../store/auth-context";

import Card from "../UI/Card";
import Button from "../UI/Button";

import classes from "./Home.module.css";

const Home = () => {
  const { onLogout } = useContext(AuthContext)

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
