import React from "react";
import Card from "../UI/Card";
import Button from "../UI/Button/Button";

import classes from "./Login.module.css";

const Login = ({ onLogin }) => {
  const submitHandler = (e) => {
    e.preventDefault();
    onLogin("sample", "sample");
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control}`}>
          <label htmlFor="email">E-Mail</label>
          <input type="email" />
        </div>
        <div className={`${classes.control}`}>
          <label htmlFor="password">Password</label>
          <input type="password" />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
