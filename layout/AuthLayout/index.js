// Mui material
import { Grid } from "@mui/material";

// styles
import classes from "./_AuthLayout.module.scss";

const AuthLayout = ({ children }) => {
  return (
    <Grid container>
      <Grid item md={6} className={classes.imageDiv} />
      <Grid item md={6} xs={12} className={classes.containerRightDiv}>
        {children}
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
