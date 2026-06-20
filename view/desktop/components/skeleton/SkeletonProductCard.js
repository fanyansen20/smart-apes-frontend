//Material UI
import { Card, Skeleton } from "@mui/material";

// css
import bigCardStyles from "../card/ProductCart/_BigCard.module.scss";
import smallCardStyles from "../card/ProductCart/_SmallCard.module.scss";

/**
 *
 * @param {{
 *  size: 'small' | 'large'
 * }} props
 * @returns
 */
const SkeletonProductCard = ({ size }) => {
  function sizeCard(size) {
    if (size === "small") return smallCardStyles;

    if (size === "large") return bigCardStyles;

    return smallCardStyles;
  }

  return (
    <Card className={sizeCard(size).Card}>
      <div className={sizeCard(size).contentProductCard}>
        <div>
          <Skeleton
            className={sizeCard(size).containerCardImage}
            variant="rectangular"
            width={size === "small" ? "175px" : "100%"}
          />

          <Skeleton
            variant="text"
            className="cardTitle"
            sx={{ margin: "0 5px" }}
          />
        </div>

        <div className={sizeCard(size).details}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
      </div>
    </Card>
  );
};

export default SkeletonProductCard;
