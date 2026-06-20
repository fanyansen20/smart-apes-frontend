//Next JS
import Image from "next/image";

//Material UI
import { Typography } from "@mui/material";

//Images
import image from "@public/assets/images/EmptyCart.png";

const EmptyCart = () => {
  return (
    <div className="emptyCartDiv">
      <div className="image">
        <Image src={image} alt="empty" />
      </div>
      <Typography className="title">Your Cart is Empty</Typography>
      <Typography className="subtitle">
        Looks like you haven&apos;t added anything to you cart yet{" "}
      </Typography>
    </div>
  );
};

export default EmptyCart;
