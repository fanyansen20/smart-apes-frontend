import * as Yup from "yup";

export const subscribeFormSchema = Yup.object().shape({
  email: Yup.string().required("Please fill in your email!"),
  captcha: Yup.string().required("Please fill the captcha"),
});
