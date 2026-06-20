// React
import { useEffect, useState } from "react";

// React Redux
import { useDispatch, useSelector } from "react-redux";
import { getProductReviews } from "store/reducer/getProductReviews/getProductReviewsSlice";
import { getQuantityCartData } from "store/reducer/quantityCart/quantityCartSlice";
import { getWishlistByIdProduct } from "store/reducer/wishlist/getWishlistByIdProduct";

// Next
import useToggle from "@hooks/useToggle";
import useWishlistMenu from "@hooks/wishlist/useWishlistMenu";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import numeral from "numeral";

// MUI Components
import { StarRounded } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Badge, IconButton, Stack } from "@mui/material";

// Components
import DiscountRateCard from "@components/card/DiscountRateCard";
import NoRatings from "@components/layout/NoRatings";
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import Collapsible from "view/mobile/components/Collapsible/Collapsible";
import DrawerMembershipDiscount from "view/mobile/components/DrawerMembershipDiscount";
import DrawerShareProduct from "view/mobile/components/DrawerShareProduct/DrawerShareProduct";
import FooterProduct from "view/mobile/components/FooterNavigation/FooterProduct";
import ModalImageCarousel from "view/mobile/components/Modals/ModalImageCarousel/ModalImageCarousel";
import ProductsList from "view/mobile/components/ProductsList";
import BundleProductContainerMobile from "./components/BundleProductContainerMobile";

// Styles
import classes from "./product.module.scss";

// Assets
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BurgerIcon from "@public/assets/icons/burger.svg";
import CartIcon from "@public/assets/icons/cart-mobile.svg";
import SearchIcon from "@public/assets/icons/search-mobile.svg";
import ShareIcon from "@public/assets/icons/share.svg";
import noShopImage from "@public/assets/images/not-shop-image.svg";

// Libs
import { getMembershipDiscountPrice } from "@helper/getMembershipDiscountPrice";
import { formatCurrency } from "helper/checkValue";
import moment from "moment";
import Carousel from "react-material-ui-carousel";
import xss from "xss";

// Constant
import { productDrawerModes } from "view/mobile/components/FooterNavigation/FooterProduct/constant";

function Product({
  product,
  shop,
  relatedProducts,
  isBundle,
  dataBundles,
  membershipData,
}) {
  const dispatch = useDispatch();
  const session = useSession();
  const router = useRouter();
  const [productImages, setProductImages] = useState([]);
  const [previewImageIdx, setPreviewImageIdx] = useState(0);
  const [showDrawerProduct, setShowDrawerProduct] = useState(false);
  const [specifications, setSpecifications] = useState([]);
  const { isDataWishlist, addProductToWishlist, deleteProductWishlist } =
    useWishlistMenu(session?.data);
  const isWishlist = isDataWishlist?.code === 200;
  const [openDrawerShare, toggleDrawerShare] = useToggle();
  const [openModalImageCarousel, toggleModalImageCarousel] = useToggle();
  const [drawerMode, setDrawerMode] = useState(productDrawerModes.ALL.param);

  const { data: reviewsData } = useSelector((state) => state.getProductReviews);
  const cart = useSelector((store) => store.quantityCart);
  const cartQty =
    session?.status !== "unauthenticated" ? cart?.totalQuantity : null;

  // #region redux state
  const membership = useSelector((state) => state.member);
  // #endregion

  const getProductImages = () => {
    const _productImages = [product?.cover_image_url_700];
    if (product?.additional_image_urls?.length > 0)
      _productImages.push(...product?.additional_image_urls);
    product?.variant_details?.map((variant) => {
      if (variant?.image_url_700) _productImages.push(variant.image_url_700);
    });

    const uniqueImages = [...new Set(_productImages)];
    setProductImages(uniqueImages);
  };

  const handleOpenDrawerProduct = () => {
    setDrawerMode(productDrawerModes.ALL.param);
    setShowDrawerProduct(true);
  };

  const handleChangePreviewImage = (idx) => setPreviewImageIdx(idx);

  const handleToggleWishlist = async () => {
    try {
      await getSession();
      if (isWishlist) {
        await deleteProductWishlist(product?.id);
      } else {
        await addProductToWishlist(product?.id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(
        getWishlistByIdProduct({
          auth: session?.data?.accessToken,
          idProduct: product?.id,
        })
      );
    }
  };

  useEffect(() => {
    if (session?.status !== "unauthenticated") {
      dispatch(
        getWishlistByIdProduct({
          auth: session?.data?.accessToken,
          idProduct: product?.id,
        })
      );
      dispatch(getQuantityCartData());
    }

    getProductImages();
    dispatch(
      getProductReviews({
        product_id: product.id,
        queries_param: {
          page: 1,
          limit: 2,
        },
      })
    );

    const specification =
      product.specification_values.map((value) => {
        return { title: value.specification.title, name: value.name };
      }) || [];

    const productDetails =
      product.details.map((detail) => {
        return {
          title: detail.key,
          name: detail.value,
        };
      }) || [];

    setSpecifications([...specification, ...productDetails]);
  }, [product]);

  // #region data
  const memberDiscountRate = getMembershipDiscountPrice({
    membership,
    membershipDiscount: product?.membership_discount,
  });
  // #endregion

  return (
    <div>
      <Stack className={classes.container} spacing={1}>
        <section className={classes.coverImg}>
          <div className={classes.topNavigation}>
            <IconButton onClick={() => router.back()}>
              <ArrowBackIosIcon />
            </IconButton>
            <div>
              <IconButton>
                <Image
                  src={SearchIcon}
                  width="24px"
                  height="24px"
                  alt="search"
                />
              </IconButton>
              <IconButton onClick={toggleDrawerShare}>
                <Image src={ShareIcon} width="24px" height="24px" alt="share" />
              </IconButton>
              <Link href="/cart">
                <a>
                  <IconButton>
                    <Badge badgeContent={cartQty} color="error">
                      <Image
                        src={CartIcon}
                        width="26px"
                        height="26px"
                        alt="share"
                      />
                    </Badge>
                  </IconButton>
                </a>
              </Link>
              <IconButton>
                <Image src={BurgerIcon} width="24px" height="24px" alt="menu" />
              </IconButton>
            </div>
          </div>
          <Carousel
            index={previewImageIdx}
            indicators={true}
            autoPlay={false}
            swipe
            navButtonsAlwaysInvisible={true}
            onChange={(targetIdx) => handleChangePreviewImage(targetIdx)}
            height="310px"
          >
            {productImages?.map((image, index) => (
              <Image
                onClick={toggleModalImageCarousel}
                key={index}
                className={classes.bannerImg}
                src={image}
                alt={product?.title}
                height="300px"
                width="400px"
                objectFit="contain"
              />
            ))}
          </Carousel>
        </section>
        <section className={classes.variants}>
          {product?.variant_details?.length > 1 && (
            <>
              <div
                onClick={handleOpenDrawerProduct}
                className={classes.variantHeader}
              >
                <p>See All Variant</p>
                <IconButton>
                  <ChevronRightIcon />
                </IconButton>
              </div>
              <div className={classes.productImages}>
                {productImages.map((image, index) => (
                  <div
                    className={
                      previewImageIdx === index
                        ? classes.productImage__active
                        : classes.productImage
                    }
                    key={index}
                  >
                    <Image
                      onClick={() => handleChangePreviewImage(index)}
                      src={image}
                      alt={product?.title}
                      height="64px"
                      width="64px"
                      objectFit="contain"
                    />
                  </div>
                ))}
              </div>
            </>
          )}
          <div className={classes.productTitle}>
            <h1>{product?.title}</h1>
            <IconButton onClick={handleToggleWishlist}>
              {isWishlist ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </div>
          {memberDiscountRate && (
            <>
              <div className={classes.productPrice}>
                <DiscountRateCard discountRate={memberDiscountRate} />
              </div>
              <p className={classes.withoutMembershipText}>
                Without membership:
              </p>
            </>
          )}
          <div className={classes.productPrice}>
            {product?.has_discount && (
              <>
                <p className={classes.discount}>
                  {Math.floor(product?.main_variant?.discount?.percent).toFixed(
                    0
                  )}
                  %
                </p>
                <p className={classes.basePrice}>
                  {product?.main_variant?.base_price_string}
                </p>
              </>
            )}
            <p className={classes.price}>
              {formatCurrency(product?.main_variant?.price)}
            </p>
          </div>
          {!memberDiscountRate && <DrawerMembershipDiscount />}
        </section>
        <section className={classes.shopInfo}>
          <div className={classes.shopDetails}>
            <Image
              src={shop?.Shop?.logo_url ?? noShopImage}
              width="47px"
              height="47px"
              alt="image"
            />
            <div>
              <h1>{shop?.Shop?.name}</h1>
              <h3>{shop?.Country?.name}</h3>
            </div>
          </div>
          <Link href={`/${shop.Shop.slug}`}>
            <PrimaryButton text="Visit Store" />
          </Link>
        </section>

        {isBundle && dataBundles && (
          <section className={classes.bundleContainer}>
            <h1>Bundle Deals</h1>
            <BundleProductContainerMobile
              idProduct={product?.id}
              data={dataBundles}
            />
          </section>
        )}

        <section className={classes.productDetails}>
          <h1>Specification</h1>
          {specifications?.length >= 5 ? (
            <Collapsible initialHeight={70}>
              <ul>
                {specifications?.map((details, index) => (
                  <li key={index}>
                    {details?.title}: {details?.name}
                  </li>
                ))}
              </ul>
            </Collapsible>
          ) : (
            <ul>
              {specifications?.map((details, index) => (
                <li key={index}>
                  {details?.title}: {details?.name}
                </li>
              ))}
            </ul>
          )}
          <h1>Description</h1>
          {product?.desc?.length >= 360 ? (
            <Collapsible initialHeight={90}>
              {product?.desc && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: xss(product.desc),
                  }}
                />
              )}
            </Collapsible>
          ) : (
            product?.desc && (
              <div
                dangerouslySetInnerHTML={{
                  __html: xss(product.desc),
                }}
              />
            )
          )}
        </section>
        <section className={classes.ratings}>
          <div className={classes.sectionHeader}>
            <h1>
              Ratings{" "}
              <span>{`(${numeral(product?.rating?.value).format("0.0")} with ${
                product?.rating?.count
              } ratings)`}</span>
            </h1>
            <SecondaryButton>See All</SecondaryButton>
          </div>
          {reviewsData.length > 0 ? (
            <div>
              {reviewsData.map((review, index) => (
                <div key={index} className={classes.ratingCard}>
                  <div className={classes.customer}>
                    <p>{review?.User?.full_name}</p>
                    <div>
                      {[...Array(review.rating)].map((e, i) => (
                        <StarRounded key={i} />
                      ))}
                    </div>
                  </div>
                  <p className={classes.ratingDate}>
                    {moment(review?.review_date).format("MMM, D. YYYY")}
                  </p>
                  <p className={classes.ratingDesc}>{review?.review_detail}</p>
                </div>
              ))}
            </div>
          ) : (
            <NoRatings />
          )}
        </section>
        {relatedProducts?.length > 0 && (
          <section className={classes.relatedProducts}>
            <div className={classes.sectionHeader}>
              <h1>Product Related</h1>
              <SecondaryButton>See All</SecondaryButton>
            </div>
            <div className={classes.containerCard}>
              <ProductsList
                showHeader={false}
                dataProduct={relatedProducts}
                isLoading={false}
              />
            </div>
          </section>
        )}
        <FooterProduct
          product={product}
          showDrawer={showDrawerProduct}
          setShowDrawer={setShowDrawerProduct}
          mode={drawerMode}
          setMode={setDrawerMode}
        />
        <DrawerShareProduct
          open={openDrawerShare}
          onClose={toggleDrawerShare}
          product={product}
        />
        <ModalImageCarousel
          openModal={openModalImageCarousel}
          handleCloseModal={toggleModalImageCarousel}
          productImages={productImages}
          currentImageIdx={previewImageIdx}
        />
      </Stack>
    </div>
  );
}

export default Product;
