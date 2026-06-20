import { Grid } from "@mui/material";
import SkeletonCardMobile from "./SkeletonCardMobile";

/**
 * @param {{
 * count: number
 * }} props
 * @returns
 */
const SkeletonCardMobileGroup = ({ count = 6 }) => {
  return (
    <Grid container spacing={2}>
      {[...new Array(count)].map((_, index) => (
        <Grid item key={index} xs={6}>
          <SkeletonCardMobile />
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonCardMobileGroup;
