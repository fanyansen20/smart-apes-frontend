import React, { Fragment } from "react";

// Next
import Image from "next/image";

// Components
import ChildrenItem from "../ChildrenItem";

// MUI
import { Divider, Grid, Typography } from "@mui/material";

// Components
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import AssignButton from "../AssignButton";

// Helper
import takeTestRedirect from "@helper/redirectUrl/takeTestRedirect";

// Constant
import { maxChildren } from "constant/children";

// Style
import classes from "./_ChildrenList.module.scss";

// Assets
import AddUser from "@public/assets/icons/add-user.svg";

/**
 * @typedef {{
 * name: string;
 * provider_name: string;
 * url: string;
 * status: string;
 * }} PendingBasicData
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
 * pending_basic_profiling_test?: PendingBasicData;
 * profile_pic: string;
 * profile_pic_500: string;
 * school_education_category: string;
 * }} Children
 */

/**
 * @param {{
 * dataChildren: Children;
 * selectedChild: {id: string; pendingBasicData: PendingBasicData}
 * }} param0
 * @returns
 */

const ChildrenList = ({
  dataChildren,
  selectedChild,
  totalResult,
  onSelectChildren,
  addChildren,
}) => {
  return (
    <Fragment>
      <Grid>
        <Grid container flexDirection="column" gap={1} mt={1} mb={2}>
          <Typography
            className={classes.title}
          >{`Assign the Children (${totalResult}/${maxChildren})`}</Typography>
          <Typography className={classes.subtitle}>
            Please select one of your children
          </Typography>
        </Grid>
        <Grid container gap={2} mb={2}>
          {dataChildren?.map((data, index) => (
            <ChildrenItem
              key={index}
              data={data}
              isSelected={selectedChild?.id === data?.childId}
              onSelect={onSelectChildren}
            />
          ))}
        </Grid>

        {dataChildren.length < 5 && (
          <>
            <Grid mb={2}>
              <Divider>
                <Typography className={classes.dividerText}>Or</Typography>
              </Divider>
            </Grid>
            <Grid mb={2}>
              <SecondaryButton fullWidth disableHover onClick={addChildren}>
                <Grid className={classes.addUserIcon}>
                  <Image src={AddUser} alt="calendar" />
                </Grid>
                Add New Children
              </SecondaryButton>
            </Grid>
          </>
        )}
      </Grid>
      <AssignButton
        disabled={!selectedChild}
        onClick={() => takeTestRedirect(selectedChild?.pendingBasicData?.url)}
      />
    </Fragment>
  );
};

export default ChildrenList;
