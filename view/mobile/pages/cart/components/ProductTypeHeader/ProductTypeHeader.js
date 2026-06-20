import headerBackground from "@public/assets/images/FlowTop.png";
import classes from "./ProductTypeHeader.module.scss";

/**
 *
 * @param {{
 * type: "physical" | "digital"
 * }} props
 * @returns
 */
const ProductTypeHeader = ({ type = "physical", itemsCount = 1 }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${headerBackground.src})`,
      }}
      className={classes[`productTypeHeader__${type}`]}
    >
      <span>{type}</span> Product ({itemsCount} items)
    </div>
  );
};

export default ProductTypeHeader;
