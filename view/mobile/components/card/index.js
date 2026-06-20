// React
import { memo } from "react";

// Next
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

// Images
import discountBanner from "@public/assets/images/discount-logo.svg";

// Css
import classes from "./_CardMobile.module.scss";

// Mui Material
import StarIcon from "@mui/icons-material/Star";
import { Stack, Typography } from "@mui/material";

// convertData
import { convertDataCardProduct } from "@helper/convertProductData";

// hooks
import useWishlistMenu from "@hooks/wishlist/useWishlistMenu";

// components
import ThreeDotIcons from "@components/icons/ThreeDotHorizontalIcons";
import MenuWishlist from "@components/menu/MenuWishlist";

const CardMobile = ({ dataProduct }) => {
  const { data: session } = useSession();

  const {
    isDataWishlist,
    openModal,
    openMenuWishlist,
    handleCloseModal,
    addProductToWishlist,
    deleteProductWishlist,
  } = useWishlistMenu(session);

  return (
    <div className={classes.containerCardMobile}>
      <Link
        href={{
          pathname: `/${dataProduct?.shop_slug}/${dataProduct?.slug}`,
          query: { id: dataProduct?.id, shop_id: dataProduct?.shop_id },
        }}
      >
        <div className={classes.contentCard}>
          {convertDataCardProduct(dataProduct).isDiscount && (
            <div className={classes.discountBannerImage}>
              <div className={classes.discountContent}>
                <Typography className={classes.discountPercent}>
                  {convertDataCardProduct(dataProduct).discountPercent}
                </Typography>
                <Typography className={classes.discountOff}>OFF</Typography>
              </div>
              <Image src={discountBanner} alt="discount banner" layout="fill" />
            </div>
          )}

          <div className={classes.imageProduct}>
            <Image
              src={convertDataCardProduct(dataProduct).imageProduct}
              alt={convertDataCardProduct(dataProduct).productName}
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className={classes.overviewDetailProduct}>
            <Typography className={classes.titleProduct}>
              {convertDataCardProduct(dataProduct).productName}
            </Typography>

            <div className={classes.priceProductOverview}>
              <Typography className={classes.priceProduct}>
                {convertDataCardProduct(dataProduct).priceProduct}
              </Typography>
              {convertDataCardProduct(dataProduct).isDiscount && (
                <Typography className={classes.discountPriceProduct}>
                  {convertDataCardProduct(dataProduct).discountPriceProduct}
                </Typography>
              )}
            </div>
          </div>
        </div>
      </Link>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pb={2}
      >
        <Stack direction="row" justifyContent="space-between" marginX={1}>
          <div className={classes.ratingAverageAndLabel}>
            <StarIcon className={classes.ratingIcon} />
            <Typography className={classes.ratingProduct}>
              {convertDataCardProduct(dataProduct).ratingProduct.toFixed(1)}
            </Typography>
            <Typography className={classes.salesProduct}>
              sold {convertDataCardProduct(dataProduct).totalSalesProduct}
            </Typography>
          </div>
        </Stack>
        <ThreeDotIcons
          onClick={(event) => {
            openMenuWishlist(event, dataProduct.id);
          }}
        />
      </Stack>

      <MenuWishlist
        productId={dataProduct.id}
        openModal={openModal}
        addProductToWishlist={addProductToWishlist}
        deleteProductWishlist={deleteProductWishlist}
        handleCloseModal={handleCloseModal}
        dataWishlist={isDataWishlist}
      />
    </div>
  );
};

export default memo(CardMobile);
