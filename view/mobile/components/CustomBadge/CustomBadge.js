import classes from "./CustomBadge.module.scss";

/**
 * @param {{
 * value: number
 * }} props
 * @returns {HTMLElement}
 */
const CustomBadge = ({ value = 0 }) => {
  const displayValue = value > 99 ? "99+" : value;

  return (
    <div className={value === 0 ? classes.badge__hidden : classes.badge}>
      <p>{displayValue || ""}</p>
    </div>
  );
};

export default CustomBadge;
