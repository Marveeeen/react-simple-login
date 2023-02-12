import React, { useState, useEffect, useReducer, useContext } from "react";

import AuthContext from "../../store/auth-context";

import Card from "../UI/Card";
import Button from "../UI/Button/Button";
import Input from "../UI/Input";

import classes from "./Login.module.css";

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
        <Input
          id="email"
          type="email"
          label="E-mail"
          isValid={emailState.isValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          id="password"
          type="password"
          label="Passowrd"
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
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
