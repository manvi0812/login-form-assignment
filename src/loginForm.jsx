import React from "react";
import "./loginForm.css";
import Input from "./shared/formUIElements/Input";
import Button from "./shared/formUIElements/Button";
import { useForm } from "./shared/hooks/form-hook";
import { VALIDATOR_EMAIL, VALIDATOR_PASSWORD } from "./shared/util/validators";

const apiEndPoint = "https://minimumque.herokuapp.com/login";
const LoginForm = () => {
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (event) => {
    event.preventDefault();
    const obj = {
      pwd: formState.inputs.password.value,
      unme: formState.inputs.username.value,
    };
    // const post = await axios.post(apiEndPoint, obj);
    // const pos = post.data;
    // console.log(pos);
    // console.log(formState.inputs.password.value);
    fetch(apiEndPoint, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((error) => console.log("Error:", error))
      .then((response) => console.log(obj, response));
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='form'>
        <Input
          element='input'
          id='username'
          type='username'
          label='Username'
          validators={[VALIDATOR_EMAIL()]}
          errorText='Please enter a valid username. '
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
