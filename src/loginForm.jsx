import React from "react";
import "./loginForm.css";
import Input from "./shared/formUIElements/Input";
import Button from "./shared/formUIElements/Button";
import { useForm } from "./shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_PASSWORD,
} from "./shared/util/validators";

const LoginForm = () => {
  const [formState, inputHandler] = useForm({
    email: {
      value: "",
      isValid: false,
    },
    password: {
      value: "",
      isValid: false,
    },
  });

  // const submitHandler = (event) => {
  //   event.preventDefault();
  //   console.log(formState.inputs);
  // };

  return (
    <form action='#' >
      <div className='form'>
        <Input
          element='input'
          id='email'
          type='email'
          label='Username'
          validators={[VALIDATOR_EMAIL()]}
          errorText='Please enter a valid email address. '
          onInput={inputHandler}
          retrieve='Retrieve'
        />
        <Input
          element='input'
          id='password'
          type='password'
          label='Password  '
          validators={[VALIDATOR_PASSWORD()]}
          errorText='must contain: 1uppercase, 1lowercase letter, 1number, 1special character. length: (8,32) '
          onInput={inputHandler}
          retrieve='Reset'
        />
      </div>
      <Button type='submit' disabled={!formState.isValid}>
        Login
      </Button>
      <div className='new-user'>
        <p>New User?</p>
        <Button val='Sign-up' />
      </div>
    </form>
  );
};

export default LoginForm;
