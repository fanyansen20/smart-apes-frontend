// React
import React, { useEffect, useState } from "react";

// Next
import { useSession } from "next-auth/react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getMembershipActivities } from "store/reducer/getMembershipActivities/getMembershipActivitiesSlice";

// MUI Components
import {
  Avatar,
  Chip,
  Divider,
  Pagination,
  Paper,
  Stack,
  Typography,
  paginationItemClasses,
} from "@mui/material";

// Styles
import classes from "./MemberDetails.module.scss";

// Constants
import { memberTiers } from "view/desktop/pages/membership/memberConstant";

// Helper
import { formatDate } from "@helper/formatDate";

const MEMBERSHIP_ACTIVITY_LIMIT = 5;

/**
 * @import { MembershipInitialState } from "type/membership";
 */

/**
 *
 * @param {{
 *  gap: number
 *  primaryTitle: ?string
 *  secondaryTitle: ?string
 *  children: ?React.ReactNode
 * }}
 *
 * @returns {JSX.Element}
 */

const MemberCard = ({ primaryTitle, secondaryTitle, gap = 1, children }) => (
  <Paper
    variant="outlined"
    component={Stack}
    gap={2}
    direction="column"
    className={classes.memberDetailsCard}
  >
    {/* Header Section */}
    <Stack direction="column" spacing={1}>
      <Typography className={classes.cardPrimaryTitle}>
        {primaryTitle}
      </Typography>
      <Typography className={classes.cardSecondaryTitle}>
        {secondaryTitle}
      </Typography>
    </Stack>

    <Divider />

    {/* Content Section */}
    <Stack direction="column" gap={gap}>
      {children}
    </Stack>
  </Paper>
);

/**
 *
 * @param {{
 *  membershipData: MembershipInitialState
 * }} props
 * @returns
 */

function MemberDetails({ membershipData }) {
  const [recentActivityPage, setRecentActivityPage] = useState(1);
  const { data: session } = useSession();
  const membershipTier = memberTiers.find(
    (tier) => tier.title === membershipData?.memberType
  );

  const memberTypeClassName = {
    Basic: classes.basicMemberText,
    Premium: classes.premiumMemberText,
    Elite: classes.eliteMemberText,
  };

  const dispatch = useDispatch();
  const {
    data: membershipActivitiesData,
    totalPages: membershipActivitiesTotalPages,
  } = useSelector((state) => state.getMembershipActivities);

  /**
   * @param {*} _
   * @param {number} value
   */
  const handleMemberActivitiesPagination = (_, value) => {
    setRecentActivityPage(value);
  };

  useEffect(() => {
    dispatch(
      getMembershipActivities({
        params: {
          userId: session?.user?.id,
        },
        query: {
          page: recentActivityPage,
          limit: MEMBERSHIP_ACTIVITY_LIMIT,
        },
      })
    );
  }, [recentActivityPage]);

  return (
    <Stack direction="column" pb={7.2}>
      {/* Header Section */}
      <Typography fontWeight={600} textAlign="center" p={2}>
        Your Member Details
      </Typography>

      {/* Content Section */}
      <Stack
        gap={1}
        sx={{ height: window.screen.availHeight - 56 }}
        direction="column"
        className={classes.memberDetails}
      >
        <MemberCard
          primaryTitle="Your Member Plan"
          secondaryTitle="Check your member details"
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography className={classes.cardDetailLabel}>
              Membership Status
            </Typography>
            <Chip
              size="small"
              label="ACTIVE"
              color="success"
              className={classes.activeChip}
            />
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography className={classes.cardDetailLabel}>
              Membership Type
            </Typography>
            {/* membership type with logo */}
            <Stack direction="row" gap={1} alignItems="center">
              <Avatar
                sx={{ width: 20, height: 20 }}
                variant="square"
                src={membershipTier.icon.src}
              />
              <Typography
                className={memberTypeClassName[membershipData.memberType]}
              >
                {membershipData.memberType} Member
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography className={classes.cardDetailLabel}>
              Start Date
            </Typography>
            <Typography className={classes.cardDetailValue}>
              {formatDate(membershipData.startDate, "dd MMMM yyyy")}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography className={classes.cardDetailLabel}>
              Expiry Date
            </Typography>
            <Typography className={classes.cardDetailValue}>
              {formatDate(membershipData.endDate, "dd MMMM yyyy")}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography className={classes.cardDetailLabel}>
              Remaining Profiling Test
            </Typography>
            <Typography className={classes.cardDetailValue}>
              {membershipData.remainingProfilingTest}
            </Typography>
          </Stack>
        </MemberCard>
        <MemberCard
          primaryTitle="Recent Activity"
          secondaryTitle="Your recent activity in SMART APES"
        >
          {membershipActivitiesData.map((activityData) => (
            <>
              <Typography className={classes.cardDetailLabel}>
                {formatDate(activityData.activity_date, "dd MMMM yyyy")}
              </Typography>
              <Typography className={classes.cardDetailValue}>
                {activityData.description}
              </Typography>
              <Divider />
            </>
          ))}
          <Pagination
            sx={{
              alignSelf: "center",
              [`& .${paginationItemClasses.sizeSmall}`]: {
                fontSize: 12,
              },
            }}
            size="small"
            page={recentActivityPage}
            count={membershipActivitiesTotalPages}
            onChange={handleMemberActivitiesPagination}
          />
        </MemberCard>
      </Stack>
    </Stack>
  );
}

export default MemberDetails;
