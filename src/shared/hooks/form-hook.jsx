// this will hold all useReducer logic so we wont be forced to import useReducer and useCallback in componenst.s

import { useReducer, useCallback } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE": {
      let formIsValid = true;
      for (const inputId in state.inputs) {
        // go through all the i/ps and check if all these i/ps are valid.
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid; // initial formIsValid is true, so if there's any atleast 1 false validity the overall form validity becomes false
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid; // for the non-updating i/p, check the stored validity of that i/p
        }
      }
      return {
        ...state, // copy existing state
        inputs: {
          ...state.inputs, // current i/p state
          [action.inputId]: {
            // new object ex,
            //[title]: {value: newValue, isValid: newIsValid}
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    }
    default:
      return state;
  }
};

export const useForm = (initialInput, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    // initial state that will be updated inside the formReducer() based on the diff actions we might recieve.
    inputs: initialInput, // nested object stores info about the validity of the individual i/ps
    isValid: initialFormValidity, // checks validity of the whole form
  });

  const inputHandler = useCallback((id, value, isValid) => {
    // used callback() because without it, when the component rerenders,
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []); // can add dispatch as a dependency but useReducer ensures that dispatch never changes

  return [formState, inputHandler];
};
