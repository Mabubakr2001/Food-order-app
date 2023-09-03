import * as React from "react";

const { useState } = React;

export default function useInput(checkValidity) {
  const [value, setValue] = useState("");
  const [wasTouched, setWasTouched] = useState(false);

  const inputIsValid = checkValidity(value);
  const hasError = !inputIsValid && wasTouched;

  function inputChangeHandler(event) {
    setValue(event.target.value);
  }

  function inputBlurHandler(event) {
    setWasTouched(true);
  }

  function resetInput() {
    setValue("");
    setWasTouched(false);
  }

  return {
    value,
    isValid: inputIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    resetInput,
  };
}
