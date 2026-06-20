// Mui Material
import { Grid } from "@mui/material";

// classes
import classes from "./_CardPrice.module.scss";

// components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";

// icon
import CheckIcon from "@mui/icons-material/Check";
import InfoIcon from "@mui/icons-material/Info";

// helper
import { formatCurrency } from "@helper/checkValue";

const CardPrice = ({
  title,
  realPrice,
  totalPrice,
  discountPercentage,
  benefitData,
  onClick,
}) => {
  const benefitList = JSON.parse(benefitData);

  return (
    <div className={classes.containerCardPrice}>
      <span className={classes.discountLabel}>{discountPercentage}% OFF</span>
      <h4>{title}</h4>
      <Grid container justifyContent="center" alignItems="center" gap={1}>
        <h5>{formatCurrency(realPrice)}</h5>
        <h4>{formatCurrency(totalPrice)}</h4>
      </Grid>

      <PrimaryButton text="Purchase Test" fullWidth onClick={onClick} />

      <div className={classes.divider} />

      {benefitList?.benefit?.map((item, key) => (
        <Grid
          container
          gap={1}
          key={key}
          className={classes.benefitSection}
          alignItems="center"
        >
          <CheckIcon sx={{ color: "#7e54f1" }} />
          <p>{item.text}</p>
          {item.isTooltip && (
            <InfoIcon fontSize="inherit" sx={{ color: "#D6D6D6" }} />
          )}
        </Grid>
      ))}
    </div>
  );
};

export default CardPrice;
