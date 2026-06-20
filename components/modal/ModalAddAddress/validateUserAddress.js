// Helper
import { object, string } from "yup";

import { validateZipCode } from "services/validateService";

import { parsePhoneNumber } from "awesome-phonenumber";

export const userAddressSchema = object({
  addressLabel: string().required("Address Label cannot be empty").nullable(),
  recipientName: string().required("Recipient cannot be empty").nullable(),
  phoneNumber: string()
    .required("Recipient phone number cannot be empty")
    .test({
      name: "is-valid-phone-number",
      message: "Phone Number not valid",
      skipAbsent: true,
      test: (value) => {
        if (!parsePhoneNumber(`+65${value}`).valid) {
          return false;
        }
        return true;
      },
    }),
  fullAddress: string().required("Full address cannot be empty").nullable(),
  zipCode: string()
    .required("Postal Code cannot be empty")
    .test("is-valid-zip-code", "Zip code not valid", validateZipCode),
});
