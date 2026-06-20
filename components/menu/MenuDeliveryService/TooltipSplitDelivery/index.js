// Mui
import { Grid, Typography } from "@mui/material";

// helper
import numeral from "numeral";
import { convertSizeValue } from "helper/checkValue";

const TooltipSplitDelivery = ({ dataPackagesSplitDelivery }) => {
  return (
    <Grid className="containerTooltipSplitDelivery">
      <Typography variant="subtitle2">Your order is more than 30kg.</Typography>
      <Typography variant="subtitle2">Parcel will divided into:</Typography>
      <ul>
        {dataPackagesSplitDelivery.map((dataPackage) => (
          <li key={dataPackage.id}>
            <Typography variant="subtitle2">
              {dataPackage.packages.length}&nbsp;
              {convertSizeValue(dataPackage.name)}&nbsp; (S$&nbsp;
              {numeral(dataPackage.total_package_amount).format("0.00")})
            </Typography>
          </li>
        ))}
      </ul>
    </Grid>
  );
};

export default TooltipSplitDelivery;
