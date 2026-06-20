export const EMAIL_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const USER_FORM_FIELDS = {
  PASSWORD: "password",
};

export const PASSWORD_RULES = {
  MINIMUM_LENGTH: 8,
  MAXIMUM_LENGTH: 128,
  IS_CONTAIN_UPPERCASE: /^(?=.*[A-Z])/,
  IS_CONTAIN_LOWERCASE: /^(?=.*[a-z])/,
  IS_CONTAIN_NUMBER: /^(?=.*[0-9])/,
  IS_CONTAIN_SPECIAL: /[ !"#$%&'()*+,.:;<=>?@[^_`{|}~\-\/\\\[\]]/,
};

export const EMAIL_ERROR_MSG = {
  IS_EMPTY: "Please enter your email address",
  IS_INVALID: "Invalid email address",
  IS_NOT_FOUND: "Email not found",
  IS_EXIST: "Email already taken",
};

export const PASSWORD_ERROR_MSG = {
  IS_EMPTY: "Password is required",
  IS_LOWER_THAN_MIN: "Password must be at least 8 characters",
  IS_EXCEED_MAX: "Password must be at most 128 characters",
  SHOULD_HAS_NUMBER: "Password must contain at least one number",
  SHOULD_HAS_LOWERCASE: "Password must contain at least one lowercase letter",
  SHOULD_HAS_UPPERCASE: "Password must contain at least one uppercase letter",
  SHOULD_HAS_SPECIAL: "Password must contain at least one special character",
};

export const CONFIRM_PASSWORD_ERROR_MSG = {
  IS_EMPTY: "Confirm password is required",
  SHOULD_MATCH: "Passwords must match",
};
