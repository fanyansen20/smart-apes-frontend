// MUI materials
import { Grid, Skeleton } from "@mui/material";

// Css
import classes from "../../pages/bundles/_BundlesDetails.module.scss";

const SkeletonBundleContent = () => {
  return (
    <>
      <Skeleton variant="text" width="60%" height="30px" />

      <Grid container gap="36px">
        {[...Array(5)].map((_, key) => (
          <Grid key={key} className={classes.cardBundleContainer}>
            <Skeleton className={classes.imageBundle} variant="rounded" />
            <Skeleton variant="text" height="40px" />
          </Grid>
        ))}
      </Grid>

      <Grid container direction="column" he>
        <Skeleton width="35%" height="32px" variant="text" />
        <Skeleton width="20%" height="32px" variant="text" />
      </Grid>
    </>
  );
};

export default SkeletonBundleContent;
