import React from "react";

// Next
import Image from "next/image";

// MUI
import { Grid, Typography } from "@mui/material";

// Style
import classes from "./_ChildrenItem.module.scss";

/**
 * @typedef {{
 * name : string
 * provider_name : string
 * url : string
 * status : string
 * }} PendingBasicDataType
 *
 * @typedef {{
 * childId: string;
 * childrenName: string;
 * educationType: string;
 * profileImage: string;
 * age: number;
 * dob: string;
 * full_name: string;
 * gender: string;
 * id: string;
 * parent_id: string;
 * pending_basic_profiling_test?: PendingBasicDataType;
 * profile_pic: string;
 * profile_pic_500: string;
 * school_education_category: string;
 * }} Children
 */

/**
 * @param {{
 * data: Children;
 * isSelected: boolean;
 * onSelect: ({id: string; pendingBasicData: PendingBasicDataType}) => void
 * }} param0
 */

const ChildrenItem = ({ data, isSelected, onSelect }) => {
  const hasBasicTest = data?.pending_basic_profiling_test;

  return (
    <Grid
      container
      gap={1}
      p={1}
      className={`
        ${classes.container}
        ${isSelected && classes.selected}
        ${!hasBasicTest && classes.disabled}
      `}
      onClick={() =>
        hasBasicTest &&
        onSelect({
          id: data?.childId,
          pendingBasicData: data?.pending_basic_profiling_test,
        })
      }
    >
      <Grid className={classes.imageContainer}>
        <Image
          src={data?.profileImage}
          layout="fill"
          alt="image"
          objectFit="cover"
          className={classes.img}
        />
      </Grid>
      <Grid className={classes.textContainer}>
        <Typography className={classes.title}>{data?.childrenName}</Typography>
        <Typography className={classes.subtitle}>
          {data?.educationType}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ChildrenItem;
