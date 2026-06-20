// react || next
import { useSession } from "next-auth/react";
import Image from "next/image";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getSchoolLevel } from "store/reducer/profilingTest/getSchoolLevel";

// mui material
import { Box, Button, Modal, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

// icons
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

// images
import BoyDefaultImg from "@public/assets/images/child-boy.png";
import GirlDefaultImg from "@public/assets/images/child-girl.png";
import noProfileImage from "@public/assets/images/no-profile-picture.png";

// components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import TextButton from "@components/shared/Button/TextButton/TextButton";
import TextBox from "@components/shared/TextBox/TextBox";
import SelectSearch from "../../SelectSearch";

// hooks
import useNotification from "@hooks/useNotification";
import useUploadImage from "@hooks/useUploadImage";

// style
import { yupResolver } from "@hookform/resolvers/yup";

// utils || helper
import handleRedirectParent from "@helper/handleRedirectParent";
import takeTestRedirect from "@helper/redirectUrl/takeTestRedirect";
import { sub } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { createChildren } from "services/children/createChildren";
import childSchema from "utils/children/childSchema";
import classes from "./_ModalAddChild.module.scss";

// constant
import { genders } from "constant/children";
import { memo, useEffect } from "react";

/**
 *
 * @param {{
 * isOpen : boolean
 * closeModal : () => ()
 * }} param0
 * @returns
 */

const ModalAddChild = ({ closeModal, isOpen = false } = {}) => {
  const dispatch = useDispatch();
  const { data } = useSession();
  const { status: statusSchoolLevel, dataSchoolLevel } = useSelector(
    (store) => store.getSchoolLevel
  );

  const [_, sendNotification] = useNotification();

  useEffect(() => {
    if (statusSchoolLevel === "idle" && isOpen) {
      dispatch(getSchoolLevel());
    }
  }, [isOpen]);

  const {
    profileImage,
    profileImagePreview,
    handleUploadImage,
    handleRemovePreview,
  } = useUploadImage();

  const {
    reset,
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    mode: "all",
    resolver: yupResolver(childSchema),
  });

  const submitTakeTest = async (childData) => {
    let file;
    if (!profileImage) {
      const response = await fetch(
        childData?.gender.code === "male"
          ? BoyDefaultImg.src
          : GirlDefaultImg.src
      );

      const blob = await response.blob();
      file = new File([blob], "image.jpg", { type: blob.type });
    }

    const payload = new FormData();

    payload.set("full_name", childData?.name);
    payload.set("gender", childData?.gender?.code);
    payload.set("school_education_category", childData?.level?.name);
    payload.set("parent_id", data.user.id);
    payload.set(
      "dob",
      childData?.birthDate ? new Date(childData.birthDate).toISOString() : null
    );

    if (profileImage) {
      payload.set("profile_pic", profileImage, profileImage.name);
    } else {
      payload.set("profile_pic", file, file.name);
    }

    const errorHandler = (error) => {
      sendNotification({
        msg: [error?.response?.data?.message ?? "Something wrong in our side"],
        variant: "error",
      });
    };

    const successHandler = async (response) => {
      handleRedirectParent({ notRedirect: true });

      await takeTestRedirect(response?.pending_basic_profiling_test?.url);
    };

    createChildren({ payload, errorHandler, successHandler });
  };

  const handleCloseModal = () => {
    handleRemovePreview();
    reset();
    closeModal();
  };

  return (
    <Modal open={isOpen} onClose={handleCloseModal}>
      <Box className={classes.containerModalAddChild}>
        <Stack gap={2} direction="column">
          <>
            <h2>Add New Children</h2>
            <p>Fill up the form below based on your children data</p>
          </>

          <div className={classes.infoForCreateChild}>
            <ReportProblemIcon sx={{ color: "#EA580C" }} />
            <p>
              In order to take the free basic test, you need to create a new
              children profile at least 1.
            </p>
          </div>

          <div className={classes.uploadImageSection}>
            <div className={classes.imageProfileSection}>
              {profileImagePreview ? (
                <div className={classes.imagePreview}>
                  <Image
                    src={profileImagePreview}
                    layout="fill"
                    objectFit="contain"
                    alt="not profile image yet"
                  />
                </div>
              ) : (
                <>
                  <Image
                    src={noProfileImage}
                    width="65px"
                    height="65px"
                    alt="not profile image yet"
                  />
                  <p>No profile picture yet.</p>
                </>
              )}
            </div>

            <div className={classes.CTSDescriptionSection}>
              {profileImagePreview ? (
                <Button
                  className={classes.CTXDeleteButton}
                  fullWidth
                  sx={{ color: "red" }}
                  onClick={handleRemovePreview}
                >
                  Remove
                </Button>
              ) : (
                <PrimaryButton fullWidth component="label">
                  Upload Profile Picture
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleUploadImage}
                  />
                </PrimaryButton>
              )}
              <p>
                File Maximum size is 10 MB. Only allowed file with extension
                .JPG , .JPEG and .PNG
              </p>
            </div>
          </div>

          <div className={classes.formControl}>
            <h5>Child Name*</h5>
            <Controller
              name="name"
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  <TextBox
                    value={value}
                    onChange={onChange}
                    size="small"
                    placeholder="Insert your Child Name"
                    errorText={errors?.name?.message}
                  />
                </>
              )}
            />
          </div>

          <div className={classes.formControl}>
            <h5>Child Level*</h5>
            <Controller
              name="level"
              control={control}
              render={({ field: { value, onChange } }) => (
                <SelectSearch
                  value={value}
                  setValue={onChange}
                  options={dataSchoolLevel}
                  helperText={errors?.level?.message}
                  placeholder="Select your Child Level"
                />
              )}
            />
          </div>

          <div className={classes.formControl}>
            <h5>Gender*</h5>
            <Controller
              name="gender"
              control={control}
              render={({ field: { value, onChange } }) => (
                <SelectSearch
                  value={value}
                  setValue={onChange}
                  options={genders}
                  helperText={errors?.gender?.message}
                  placeholder="Select your Child Gender"
                />
              )}
            />
          </div>

          <div className={classes.formControl}>
            <h5>Birth Date*</h5>
            <Controller
              name="birthDate"
              control={control}
              render={({ field: { ref, value, onChange } }) => (
                <>
                  <DatePicker
                    inputRef={ref}
                    inputFormat="dd/MM/yyyy"
                    maxDate={sub(new Date(), {
                      years: 2,
                    })}
                    value={value}
                    onChange={onChange}
                    renderInput={({
                      inputProps: { value, placeholder },
                      ...params
                    }) => (
                      <>
                        <TextBox
                          {...params}
                          placeholder={placeholder}
                          value={watch()?.["birthDate"] && value}
                          size="small"
                          error={Boolean(errors?.birthDate?.message)}
                        />
                      </>
                    )}
                  />
                </>
              )}
            />
            <p className={classes.errorText}>{errors?.birthDate?.message}</p>
          </div>

          <Stack
            direction="row"
            justifyContent="flex-end"
            gap={1}
            sx={{ width: "100%" }}
          >
            <TextButton onClick={handleCloseModal}>Cancel</TextButton>
            <PrimaryButton onClick={handleSubmit(submitTakeTest)}>
              Take Test
            </PrimaryButton>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default memo(ModalAddChild);
