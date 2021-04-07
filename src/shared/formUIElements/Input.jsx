import React, { useReducer, useEffect } from "react";
import "./Input.css";

import { validate } from "../util/validators";
import Button from "./Button";
// there are third parties like  "formic" which you can use in React to get form functionality for free.

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state, // copies the old object
        value: action.val, //value of the i/p
        isValid: validate(action.val, action.validators), //whether input is valid or not.
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }

    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    // intial state
    value: props.initialValue || "",
    isValid: props.initialValid || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      val: e.target.value, //input value got from onChange f().
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value} // bind the value prop to inputState.value so we have 2-way binding again.
        // onInvalid={invalidHandler}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value} // bind the value prop to inputState.value so we have 2-way binding again.
      />
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}>
      <div className='row'>
        <label htmlFor={props.id}>{props.label}</label>
        <Button val={props.retrieve} />
      </div>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
