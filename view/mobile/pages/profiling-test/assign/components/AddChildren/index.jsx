import React, { Fragment, useEffect, useState } from "react";

// Next
import { useSession } from "next-auth/react";
import Image from "next/image";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getSchoolLevel } from "store/reducer/profilingTest/getSchoolLevel";

// icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReportProblemIcon from "@mui/icons-material/ReportProblemRounded";

// MUI
import { Button, Grid, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

// Hook Form
import { yupResolver } from "@hookform/resolvers/yup";
import useNotification from "@hooks/useNotification";
import { Controller, useForm } from "react-hook-form";

// Component
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import TextBox from "@components/shared/TextBox/TextBox";
import SelectSearch from "view/desktop/pages/profiling-test/components/SelectSearch";
import AssignButton from "../AssignButton";

// Utils | Helper
import handleRedirectParent from "@helper/handleRedirectParent";
import takeTestRedirect from "@helper/redirectUrl/takeTestRedirect";
import { genders } from "constant/children";
import { sub } from "date-fns";
import { createChildren } from "services/children/createChildren";
import childSchema from "utils/children/childSchema";

// Hooks
import useUploadImage from "@hooks/useUploadImage";

// Style
import classes from "./_AddChildren.module.scss";

// Assets
import BoyDefaultImg from "@public/assets/images/child-boy.png";
import GirlDefaultImg from "@public/assets/images/child-girl.png";
import noProfileImage from "@public/assets/images/no-profile-picture.png";

const AddChildren = () => {
  const { data } = useSession();
  const dispatch = useDispatch();
  const [_msg, sendNotification] = useNotification();

  // #region useState
  const [isSubmitting, setIsSubmitting] = useState(false);
  // #endregion

  // #region hooks
  const {
    profileImage,
    profileImagePreview,
    handleUploadImage,
    handleRemovePreview,
  } = useUploadImage();
  // #endregion

  // #region redux state
  const { dataSchoolLevel, status } = useSelector(
    (store) => store.getSchoolLevel
  );
  // #endregion

  // #region hooks
  const {
    watch,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",
    resolver: yupResolver(childSchema),
  });
  // #endregion

  // #region function
  const submitTakeTest = async (childData) => {
    setIsSubmitting(true);

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

    const successHandler = (response) => {
      handleRedirectParent({ notRedirect: true });

      takeTestRedirect(response?.pending_basic_profiling_test?.url);
    };

    await createChildren({ payload, errorHandler, successHandler });

    setIsSubmitting(false);
  };
  // #endregion

  // #region useEffect
  useEffect(() => {
    if (status === "idle") {
      dispatch(getSchoolLevel());
    }
  }, []);
  // #endregion

  return (
    <Fragment>
      <Grid container gap={2} flexDirection="column" mt={2}>
        <Grid container flexDirection="column" gap={1}>
          <Typography className={classes.title}>Add New Children</Typography>
          <Typography className={classes.subtitle}>
            Fill up the form below based on your children data
          </Typography>
        </Grid>

        <Grid className={classes.warningContainer}>
          <ReportProblemIcon sx={{ color: "#EA580C" }} />
          <Typography className={classes.warningText}>
            In order to take the free basic test, you need to create a new
            children profile at least 1.
          </Typography>
        </Grid>

        <Grid container>
          <Grid item xs={5} className={classes.noProfileImageContainer}>
            {profileImagePreview ? (
              <div className={classes.imagePreview}>
                <Image
                  src={profileImagePreview}
                  alt="avatar"
                  objectFit="contain"
                  layout="fill"
                />
              </div>
            ) : (
              <>
                <Image src={noProfileImage} alt="not profile image yet" />
                <Typography className={classes.noProfileImageText}>
                  No profile picture yet
                </Typography>
              </>
            )}
          </Grid>
          <Grid item xs={7} className={classes.profileButtonContainer}>
            {profileImagePreview ? (
              <Button
                fullWidth
                disableRipple
                className={classes.removeButton}
                onClick={handleRemovePreview}
              >
                <Typography className={classes.removeButtonText}>
                  Remove
                </Typography>
              </Button>
            ) : (
              <PrimaryButton fullWidth disableHover component="label">
                <Typography className={classes.uploadButtonText}>
                  Upload Profile Picture
                </Typography>
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleUploadImage}
                />
              </PrimaryButton>
            )}
            <Typography className={classes.maximumFileText}>
              File Maximum size is 10 MB. Only allowed file with extension .JPG
              , .JPEG and .PNG
            </Typography>
          </Grid>
        </Grid>

        <Grid container gap={2}>
          <Grid item xs={12}>
            <Typography className={classes.inputLabel}>Child Name*</Typography>
            <Controller
              name="name"
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  <TextBox
                    value={value}
                    onChange={onChange}
                    size="small"
                    placeholder="Input your child name"
                    errorText={errors?.name?.message}
                  />
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.inputLabel}>Child Level*</Typography>
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
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.inputLabel}>Gender*</Typography>
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
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.inputLabel}>Birth Date*</Typography>
            <Controller
              name="birthDate"
              control={control}
              render={({ field: { ref, value, onChange } }) => (
                <DatePicker
                  autoFocus
                  inputRef={ref}
                  inputFormat="dd/MM/yyyy"
                  maxDate={sub(new Date(), {
                    years: 2,
                  })}
                  value={value}
                  onChange={onChange}
                  readOnly={false}
                  renderInput={({ inputProps: { value }, ...params }) => (
                    <>
                      <TextBox
                        {...params}
                        placeholder="dd/mm/yyyy"
                        value={watch()?.["birthDate"] && value}
                        size="small"
                        error={Boolean(errors?.birthDate?.message)}
                        InputProps={{
                          endAdornment: <CalendarMonthIcon />,
                        }}
                      />
                    </>
                  )}
                />
              )}
            />
            <p className={classes.errorText}>{errors?.birthDate?.message}</p>
          </Grid>
        </Grid>
      </Grid>
      <AssignButton
        onClick={handleSubmit(submitTakeTest)}
        isSubmitting={isSubmitting}
      />
    </Fragment>
  );
};

export default AddChildren;
