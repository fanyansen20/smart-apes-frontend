import { useState } from "react";

import { EMAIL_FORMAT } from "constant/userForm";

import { isValidPhoneNumberType } from "helper/checkValue";

const useChangeFormValue = (formInputInitialState) => {
  const [formInput, setFormInput] = useState(formInputInitialState);

  const updateFormInput = (formInputKey, { value, isValid, errorMessage }) => {
    setFormInput((prev) => {
      return {
        ...prev,
        [formInputKey]: {
          value,
          isValid,
          errorMessage,
        },
      };
    });
  };

  const handlerChangeForm = ({ event, inputFormLabels }) => {
    const { name: eventTargetName, value: eventTargetValue } = event.target;

    if (!eventTargetName in formInputInitialState) {
      throw new Error();
    }

    const inputFormValidationSchema = {
      firstName: (input) => {
        if (!input) {
          return updateFormInput(eventTargetName, {
            errorMessage: `${inputFormLabels[eventTargetName]} cannot be empty`,
          });
        }

        return updateFormInput(eventTargetName, {
          value: eventTargetValue,
          errorMessage: "",
          isValid: true,
        });
      },
      lastName: (input) => {
        if (!input) {
          return updateFormInput(eventTargetName, {
            errorMessage: `${inputFormLabels[eventTargetName]} cannot be empty`,
          });
        }

        return updateFormInput(eventTargetName, {
          value: eventTargetValue,
          errorMessage: "",
          isValid: true,
        });
      },
      email: (input) => {
        const isValidEmail = input.match(EMAIL_FORMAT);

        if (!input) {
          return updateFormInput(eventTargetName, {
            errorMessage: `${inputFormLabels[eventTargetName]} cannot be empty`,
          });
        }

        if (!isValidEmail) {
          return updateFormInput(eventTargetName, {
            errorMessage: `${inputFormLabels[eventTargetName]} not valid`,
          });
        }

        return updateFormInput(eventTargetName, {
          value: eventTargetValue,
          errorMessage: "",
          isValid: true,
        });
      },
      phoneNumber: (input) => {
        if (!isValidPhoneNumberType(eventTargetValue)) {
          return updateFormInput(eventTargetName, {
            value: formInput["phoneNumber"].value,
            errorMessage: "",
            isValid: formInput["phoneNumber"].isValid,
          });
        }

        if (input.length >= 12) {
          return updateFormInput(eventTargetName, {
            value: formInput["phoneNumber"].value,
            errorMessage: "",
            isValid: formInput["phoneNumber"].isValid,
          });
        }

        return updateFormInput(eventTargetName, {
          value: eventTargetValue,
          errorMessage: "",
          isValid: true,
        });
      },
      message: (input) => {
        if (!input) {
          return updateFormInput(eventTargetName, {
            errorMessage: `${inputFormLabels[eventTargetName]} cannot be empty`,
          });
        }

        return updateFormInput(eventTargetName, {
          value: eventTargetValue,
          errorMessage: "",
          isValid: true,
        });
      },
    };

    if (inputFormValidationSchema[eventTargetName]) {
      inputFormValidationSchema[eventTargetName](eventTargetValue);
    } else {
      throw new Error(`${eventTargetName} validation schema not implemented`);
    }
  };

  return { formInput, handlerChangeForm, setFormInput };
};

export default useChangeFormValue;
