import {
  CONFIRM_PASSWORD_ERROR_MSG,
  EMAIL_ERROR_MSG,
  EMAIL_FORMAT,
  PASSWORD_ERROR_MSG,
  PASSWORD_RULES,
  USER_FORM_FIELDS,
} from "constant/userForm";
import * as Yup from "yup";

export const userFormSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name cannot be empty"),
  lastName: Yup.string().required("Last Name cannot be empty"),
  email: Yup.string()
    .required(EMAIL_ERROR_MSG.IS_EMPTY)
    .matches(EMAIL_FORMAT, EMAIL_ERROR_MSG.IS_INVALID),
  phoneNumber: Yup.string().required("Phone Number cannot be empty"),
  password: Yup.string()
    .required(PASSWORD_ERROR_MSG.IS_EMPTY)
    .min(PASSWORD_RULES.MINIMUM_LENGTH, PASSWORD_ERROR_MSG.IS_LOWER_THAN_MIN)
    .max(PASSWORD_RULES.MAXIMUM_LENGTH, PASSWORD_ERROR_MSG.IS_EXCEED_MAX)
    .matches(
      PASSWORD_RULES.IS_CONTAIN_LOWERCASE,
      PASSWORD_ERROR_MSG.SHOULD_HAS_LOWERCASE
    )
    .matches(
      PASSWORD_RULES.IS_CONTAIN_UPPERCASE,
      PASSWORD_ERROR_MSG.SHOULD_HAS_UPPERCASE
    )
    .matches(
      PASSWORD_RULES.IS_CONTAIN_NUMBER,
      PASSWORD_ERROR_MSG.SHOULD_HAS_NUMBER
    )
    .matches(
      PASSWORD_RULES.IS_CONTAIN_SPECIAL,
      PASSWORD_ERROR_MSG.SHOULD_HAS_SPECIAL
    ),
  confirmPassword: Yup.string()
    .required(CONFIRM_PASSWORD_ERROR_MSG.IS_EMPTY)
    .oneOf(
      [Yup.ref(USER_FORM_FIELDS.PASSWORD)],
      CONFIRM_PASSWORD_ERROR_MSG.SHOULD_MATCH
    ),
});
