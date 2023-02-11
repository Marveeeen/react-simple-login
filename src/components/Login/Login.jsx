import React, { useState, useEffect, useReducer, useContext } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button/Button";

import classes from "./Login.module.css";
import AuthContext from "../../store/auth-context";

const initialState = () => {
  return {
    value: "",
    isValid: null,
  };
};

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  const { onLogin } = useContext(AuthContext);

  const [emailState, dispatchEmail] = useReducer(emailReducer, initialState());
  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    initialState()
  );

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const indetifier = setTimeout(() => {
      setIsFormValid(emailState.isValid && passwordState.isValid);
    }, 500);

    const cleanUp = () => {
      clearTimeout(indetifier);
    };

    return cleanUp;
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangeHandler = (e) => {
    dispatchEmail({ type: "USER_INPUT", value: e.target.value });
  };

  const passwordChangeHandler = (e) => {
    dispatchPassword({ type: "USER_INPUT", value: e.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!isFormValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
