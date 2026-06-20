//Next JS
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

// css
import bigCardStyles from "./_BigCard.module.scss";
import smallCardStyles from "./_SmallCard.module.scss";

//Material UI
import StarIcon from "@mui/icons-material/Star";
import { Button, Card, Grid, Menu, Typography } from "@mui/material";

// Helper
import { roundUpDiscountLessThanOne } from "@helper/checkValue";
import { truncateString } from "@helper/truncateString";
import numeral from "numeral";

// Image
import threeDotsHorizontal from "@public/assets/icons/three-dots-horizontal.svg";
import discountBanner from "@public/assets/images/discount-logo.svg";

// hooks
import useWishlistMenu from "@hooks/wishlist/useWishlistMenu";

/**
 * @param {{
 *  size: 'small' | 'large'
 * }} props
 * @returns
 */

const ProductCard = ({ product, size = "small" }) => {
  const { data: session } = useSession();

  const {
    isDataWishlist,
    openModal,
    openMenuWishlist,
    handleCloseModal,
    addProductToWishlist,
    deleteProductWishlist,
  } = useWishlistMenu(session);

  function sizeCard(size) {
    if (size === "small") return smallCardStyles;

    if (size === "large") return bigCardStyles;

    return smallCardStyles;
  }

  const imageUrl = product.cover_image_url;
  const rating = product.rating.value;
  const productName = product.title;

  const isRecommended = product?.is_recommended;

  const isDiscount = product?.main_variant?.discount?.status === "ACTIVE";
  const discountPercent = roundUpDiscountLessThanOne(
    product?.main_variant?.discount?.percent
  );

  const totalSold = product?.stats?.total_sales_quantity;

  const discountPrice = product?.main_variant?.base_price_string;
  const realPrice = product?.main_variant?.price_string;

  return (
    <Card className={sizeCard(size).Card}>
      <Link
        href={{
          pathname: `/${product.shop_slug}/${product.slug}`,
          query: { id: product.id, shop_id: product.shop_id },
        }}
      >
        <a>
          <div className={sizeCard(size).contentProductCard}>
            <div>
              <div className={sizeCard(size).containerCardImage}>
                {isRecommended && (
                  <div className="recommended-label">
                    <Typography>RECOMMENDED</Typography>
                  </div>
                )}

                {isDiscount && (
                  <div className={sizeCard(size)["discount-banner-image"]}>
                    <div className={sizeCard(size)["discount-content"]}>
                      <Typography
                        className={sizeCard(size)["discount-percent"]}
                      >
                        {discountPercent}%
                      </Typography>
                      <Typography className={sizeCard(size)["discount-off"]}>
                        OFF
                      </Typography>
                    </div>
                    <Image
                      src={discountBanner}
                      alt="discount banner"
                      layout="fill"
                    />
                  </div>
                )}

                <Image src={imageUrl} alt="image product" layout="fill" />
              </div>

              <Typography className={sizeCard(size).cardTitle}>
                {truncateString(productName, 30)}
              </Typography>
            </div>

            <div className={sizeCard(size).details}>
              <Grid container direction="column">
                <Typography className={sizeCard(size).price}>
                  {realPrice}
                </Typography>
                {isDiscount && (
                  <Typography className={sizeCard(size).discountPrice}>
                    {discountPrice}
                  </Typography>
                )}
              </Grid>

              <div className={sizeCard(size).bottomCardSection}>
                <StarIcon className={sizeCard(size).starIcon} />
                <Typography className={sizeCard(size).scoreText}>
                  {numeral(rating).format("0.0")}
                </Typography>
                <Typography className={sizeCard(size).scoreText}>
                  Sold{" "}
                  {totalSold > 1000
                    ? numeral(totalSold).format("0.0a")
                    : totalSold ?? 0}
                </Typography>
              </div>
            </div>
          </div>
        </a>
      </Link>
      <div
        className={sizeCard(size).buttonPopupSection}
        onClick={(event) => {
          openMenuWishlist(event, product.id);
        }}
      >
        <Image
          src={threeDotsHorizontal}
          alt="icon dots"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <Menu
        anchorEl={openModal}
        open={openModal}
        onClose={handleCloseModal}
        disableScrollLock
        sx={{ zIndex: 1 }}
      >
        <Button
          color="inherit"
          onClick={() =>
            isDataWishlist.code === 200
              ? deleteProductWishlist(product.id)
              : addProductToWishlist(product.id)
          }
          onMouseLeave={handleCloseModal}
          className={sizeCard(size).buttonMenu}
          disableRipple
          sx={{ width: isDataWishlist.code !== 200 ? "100%" : "180px" }}
        >
          {isDataWishlist.code !== 200
            ? "Add to Wishlist"
            : "Remove from Wishlist"}
        </Button>
      </Menu>
    </Card>
  );
};

export default ProductCard;
