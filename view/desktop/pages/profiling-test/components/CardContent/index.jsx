// next
import Image from "next/image";

// styles
import classes from "./_CardContent.module.scss";

const CardContent = ({ image, title, textContent }) => {
  return (
    <div className={classes.containerCardContent}>
      <Image src={image} alt="card image" />
      <h5>{title}</h5>
      <p>{textContent}</p>
    </div>
  );
};

export default CardContent;
