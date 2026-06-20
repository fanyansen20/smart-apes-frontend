import { differenceInYears } from "date-fns";
import { date, object, string } from "yup";

const childSchema = object({
  name: string().min(2).required("Name cannot be empty"),
  level: object().required("Please select child level"),
  gender: object().required("Please select child gender"),
  birthDate: date()
    .required("Please insert child's date of birth")
    .test(
      "min-age",
      "Your child must be at least 2 years old",
      function (value) {
        const age = differenceInYears(new Date(), value);
        return age >= 2;
      }
    ),
});

export default childSchema;
