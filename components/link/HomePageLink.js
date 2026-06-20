//Next JS
import Image from "next/image";
import Link from "next/link";

//Material UI
import { Typography } from "@mui/material";

//Images
import arrow from "@public/assets/icons/BestSellerArrow.svg";

const HomePageLink = ({ link, text }) => {
  return (
    <div className="linkDiv">
      <Link href={link ?? "/"}>
        <a>
          <div className="link">
            <Typography className="linkText">{text}</Typography>
            <Image src={arrow} alt="arrow" />
          </div>
        </a>
      </Link>
    </div>
  );
};

export default HomePageLink;
