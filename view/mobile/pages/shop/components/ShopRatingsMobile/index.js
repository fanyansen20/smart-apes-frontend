// Next
import Image from "next/image";
import { useState, useEffect } from "react";
import { get } from "helper/network";

// Styles
import classes from "./ShopRatings.module.scss";

// MUI
import { StarRounded } from "@mui/icons-material";

// Assets
import FilterIcon from "@public/assets/icons/filter.svg";

// Components
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";

const ShopRatingsMobile = ({ shopId }) => {
  const [ratings, setRatings] = useState([]);
  const [isLoadingRatings, setIsLoadingRatings] = useState(false);

  // Refetch product ratings
  const getProductRatings = async () => {
    try {
      setIsLoadingRatings(true);
      const res = await get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/shops/${shopId}/reviews`
      );

      if (res.ok) {
        setRatings(res?.data?.results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingRatings(false);
    }
  };

  useEffect(() => {
    getProductRatings();
  }, []);

  return (
    <section className={classes.container}>
      <div>
        <SecondaryButton
          text="Filter"
          startIcon={
            <Image src={FilterIcon} width="12px" height="12px" alt="filter" />
          }
        />
        {new Array(3).fill(" ").map((_item, indexRating) => (
          <div key={indexRating} className={classes.ratingCard}>
            <Image
              src="https://picsum.photos/700.webp"
              width="48px"
              height="48px"
              alt="product image"
              objectFit="contain"
            />
            <div>
              <h3>Angga Wibowo</h3>
              <div className={classes.ratingContainer}>
                <h3>Basic Early Education |</h3>
                <div>
                  {new Array(5).fill(" ").map((e, i) => (
                    <StarRounded fontSize="inherit" key={i} />
                  ))}
                </div>
              </div>
              <h4>Thankyou. Recommended seller and product as well</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopRatingsMobile;
