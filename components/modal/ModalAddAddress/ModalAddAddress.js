// React
import { useState } from "react";
import { useForm } from "react-hook-form";

// Next
import Image from "next/image";

// MUI
import {
  Box,
  Fade,
  Grid,
  InputAdornment,
  Modal,
  Typography,
} from "@mui/material";

// schema user address
import { userAddressSchema } from "./validateUserAddress";

// API
import createNewAddress from "pages/api/clientSide/address/createNewAddress";

// Image
import IllustrationAddNewAddress from "@public/assets/images/illustration-add-new-address.png";

// redux
import { useDispatch } from "react-redux";
import { getDataAddressUser } from "store/reducer/userAddress/getUseAddressSlice";

// Components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import TextButton from "@components/shared/Button/TextButton/TextButton";
import TextBox from "@components/shared/TextBox/TextBox";

// hooks
import { yupResolver } from "@hookform/resolvers/yup";

const ModalAddAddress = ({
  accessToken,
  isOpen,
  closeModal,
  userId,
  handlerCheckout,
}) => {
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    mode: "all",
    defaultValues: {
      addressLabel: "",
      countryCodeNumber: "+65",
      recipientName: "",
      phoneNumber: "",
      fullAddress: "",
      zipCode: "",
    },
    resolver: yupResolver(userAddressSchema),
  });

  const {
    addressLabel,
    countryCodeNumber,
    fullAddress,
    recipientName,
    phoneNumber,
    zipCode,
  } = watch();

  const dispatch = useDispatch();

  const [isLoad, setIsLoad] = useState(false);

  const changeValueAddress = (e) => {
    const { name, value } = e.target;

    setValue(name, value, { shouldValidate: value.length <= 1 });
  };

  const changeValueNumberAddress = (e) => {
    const { name, value } = e.target;

    const isNumber = Number(value) || !value;
    const maxPhoneNumber = name === "phoneNumber" && value.length <= 13;
    const maxZipCode = name === "zipCode" && value.length <= 6;

    if (isNumber && (maxZipCode || maxPhoneNumber)) {
      setValue(name, value, { shouldValidate: true });
    }
  };

  const payload = {
    name: addressLabel,
    country_id: "SG",
    country_name: "Singapore",
    address_detail: fullAddress,
    is_default: true,
    receiver_name: recipientName,
    receiver_phone: `${countryCodeNumber}${phoneNumber}`,
    postal_code: zipCode,
  };

  const closeModalAddAddress = () => {
    reset();
    closeModal();
  };

  const submitAddress = async () => {
    setIsLoad(true);
    try {
      const res = await createNewAddress(accessToken, userId, payload);
      dispatch(getDataAddressUser());

      if (!res.code) {
        return handlerCheckout();
      }

      closeModalAddAddress();
      setIsLoad(false);
    } catch (error) {
      closeModalAddAddress();
      setIsLoad(false);
      return error.message;
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        reset();
        closeModalAddAddress();
      }}
    >
      <Fade in={isOpen}>
        <Grid className="containerModalAddAddress">
          <Grid className="illustrationModalAddress">
            <Image
              src={IllustrationAddNewAddress}
              alt="illustration add new address"
              layout="responsive"
            />
          </Grid>

          <Grid
            container
            spacing={1}
            className="containerFormControlModalAddAddress"
          >
            <Grid item md={12}>
              <Typography variant="h6">Add New Address</Typography>
            </Grid>

            <Grid item md={12} className="formControl">
              <TextBox
                labelText="*Address Label"
                {...register("addressLabel")}
                onChange={changeValueAddress}
                value={addressLabel}
                placeholder="Insert your Address Label"
                size="small"
                errorText={errors?.addressLabel?.message}
              />
            </Grid>

            <Grid item md={12} className="formControl">
              <TextBox
                labelText="*Recipient"
                {...register("recipientName")}
                onChange={changeValueAddress}
                value={recipientName}
                errorText={errors?.recipientName?.message}
                placeholder="Insert the recipient name here"
                size="small"
              />
            </Grid>

            <Grid item md={12} className="formControl">
              <TextBox
                labelText="*Country"
                value="Singapore"
                disabled
                size="small"
              />
            </Grid>

            <Grid item md={7} className="formControl">
              <TextBox
                labelText="*Phone Number"
                {...register("phoneNumber")}
                onChange={changeValueNumberAddress}
                value={phoneNumber}
                errorText={errors?.phoneNumber?.message}
                placeholder="Insert your phone number here"
                size="small"
                sx={{ overflow: "hidden" }}
                InputProps={{
                  maxLength: 12,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        sx={{
                          color: "#626262",
                          background: "#F5F5F5",
                          padding: "8px 6px",
                          marginLeft: -1.6,
                        }}
                      >
                        +65
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item md={5} className="formControl">
              <TextBox
                labelText="*ZIP Code"
                {...register("zipCode")}
                onChange={changeValueNumberAddress}
                value={zipCode}
                errorText={errors?.zipCode?.message}
                placeholder="Insert the ZIP Code"
                size="small"
              />
            </Grid>

            <Grid item md={12} className="formControl">
              <TextBox
                labelText="*Full Address"
                {...register("fullAddress")}
                onChange={changeValueAddress}
                value={fullAddress}
                errorText={errors?.fullAddress?.message}
                placeholder="Insert your full address here"
                size="small"
                multiline
                rows={3}
              />
            </Grid>

            <Grid item container md={12} gap="10px">
              <PrimaryButton
                text="Confirm"
                onClick={handleSubmit(submitAddress)}
                fullWidth
                isLoading={isLoad}
              />

              {!isLoad && (
                <TextButton
                  onClick={() => {
                    closeModalAddAddress();
                  }}
                  fullWidth
                  text="Cancel"
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  );
};

export default ModalAddAddress;
