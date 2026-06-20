//React
import { Fragment, memo, useEffect, useState } from "react";

//NEXT JS
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getProductReviews } from "store/reducer/getProductReviews/getProductReviewsSlice";
import { isLayout } from "store/reducer/layout/layoutSlice";
import { getQuantityCartData } from "store/reducer/quantityCart/quantityCartSlice";
import { getWishlistByIdProduct } from "store/reducer/wishlist/getWishlistByIdProduct";

//material UI
import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  Modal,
  Pagination,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

// ICON
import { StarRounded } from "@mui/icons-material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//Carousel
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

//Components
import QuantityButton from "@components/buttons/QuantityButton/QuantityButton";
import GalleryImageProduct from "@components/galleryImageProduct";
import NoRatings from "@components/layout/NoRatings";
import NoRelatedProduct from "@components/layout/NoRelatedProduct";
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import InnerImageZoom from "react-inner-image-zoom";
import ManageProductButtons from "view/desktop/components/ManageProductButtons";
import ProductCard from "view/desktop/components/card/ProductCart";
import MembershipBenefitTooltip from "./components/MembershipBenefitTooltip";
import MembershipDiscountRate from "./components/MembershipDiscountRate";
import BundleProductContainer from "./components/bundleProductContainer";

// Modal
import ModalAddAddress from "@components/modal/ModalAddAddress/ModalAddAddress";
import ModalAlertAddress from "@components/modal/ModalAlertAddress/ModalAlertAddress";
import ModalShareProduct from "@components/modal/ModalShareProduct/ModalShareProduct";

//Helper
import { formatCurrency, roundUpDiscountLessThanOne } from "helper/checkValue";
import xss from "xss";

//Image
import cart from "@public/assets/icons/buy-cart.svg";
import playing from "@public/assets/icons/playing-icon.svg";
import noShopImage from "@public/assets/images/not-shop-image.svg";

// Hooks
import useNotification from "@hooks/useNotification";

// API
import createProductCart from "pages/api/clientSide/cart/createProductCart";
import deleteWishlist from "pages/api/clientSide/wishlist/deleteWishlist";
import postWishList from "pages/api/clientSide/wishlist/postWishList";

// helper
import { API_FETCH_STATUS } from "constant/api";
import { format, parseISO } from "date-fns";
import Head from "next/head";
import numeral from "numeral";

// hooks
import useProcessCheckout from "@hooks/product-detail/useProcessCheckout";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 0 },
    items: 3,
  },
};

function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const ProductPage = ({
  relatedProducts,
  product,
  shop,
  isBundle,
  dataBundles,
}) => {
  /**
   * @type {MembershipInitialState}
   */
  const currentUserMemberData = useSelector((store) => store.member);
  const { data: session } = useSession();
  const { accessToken: auth, user } = session || {};

  const { push, asPath } = useRouter();
  const dispatch = useDispatch();

  const [_msg, sendNotification] = useNotification();
  const isWishlist =
    useSelector((store) => store.wishlistByIdProduct).code === 200;
  const {
    data: reviewsData,
    total_results: totalRatingsResult,
    status: statusGetProductReviews,
  } = useSelector((state) => state.getProductReviews);

  const processCheckout = useProcessCheckout({ isLogin: auth, push });

  const [isOpenGallery, setIsOpenGallery] = useState(false);
  const [isSeeMoreSpecification, setIsSeeMoreSpecification] = useState(false);
  const [isSeeMoreDescription, setIsSeeMoreDescription] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [ratingTab, setRatingTab] = useState(0);
  const [selectedRatingPage, setSelectedRatingPage] = useState(1);
  const [specifications, setSpecifications] = useState([]);

  const [discountIsActive, setDiscountIsActive] = useState(false);
  const [productDiscountPercentage, setProductDiscountPercentage] = useState(0);
  const [discountedProductPrice, setDiscountedProductPrice] = useState(0);

  const [priceProduct, setPriceProduct] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [membershipPriceSummary, setMembershipPriceSummary] = useState([]);

  const [nameVariants, setNameVariants] = useState([]);
  const [isVariantActive, setIsVariantActive] = useState(true);

  const [idVariant, setIdVariant] = useState(product.main_variant.id);
  const [stockProduct, setStockProduct] = useState(product.main_variant.stock);

  const [galleryImages, setGalleryImages] = useState([]);
  const [videoUrls, setVideoUrls] = useState([]);
  const [displayImage, setDisplayImage] = useState("");

  const [isModalAlert, setIsModalAlert] = useState(false);
  const [isModalAddress, setIsModalAddress] = useState(false);

  const [isLoadPurchaseButton, setIsLoadPurchaseButton] = useState(false);
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);

  const productName =
    product.title +
    (nameVariants.length != 0
      ? " - " + nameVariants.map((variant) => variant.value).join(" , ")
      : "");
  const productMembershipPrice = membershipPriceSummary?.find(
    (membershipDataByTier) =>
      membershipDataByTier?.tier === currentUserMemberData?.memberType
  )?.final_price;
  const productFinalPrice = productMembershipPrice || priceProduct;

  const variantSetups = product.variant_setups;
  const variantCombo = product?.variant_details?.map((item) =>
    item?.variant_combo?.map(({ ...variant }) => variant)
  );
  const minimumOrderQuantity = product.main_variant.min_order;

  const idProduct = product.id;
  const nameShop = shop.Shop.name;
  const countryShop = shop.Country.name;
  const imageProfileShop = shop.Shop.logo_url;

  const hasDiscountInMainVariant =
    product?.main_variant?.discount?.status === "ACTIVE";

  const discountPercentInMainVariant = roundUpDiscountLessThanOne(
    product?.main_variant?.discount?.percent
  );
  const membershipPriceSummaryInMainVariant =
    product?.main_variant?.membership_discount;
  const membershipPriceInMainVariant =
    membershipPriceSummaryInMainVariant?.find(
      (membershipTier) =>
        membershipTier?.tier === currentUserMemberData.memberType
    )?.final_price;
  const discountPriceInMainVariant = product?.main_variant?.base_price;
  const priceInMainVariant = product?.main_variant?.price;

  const payloadCheckoutCart = {
    item_id: idProduct,
    type: product.type,
    qty: quantity,
    variant_id: idVariant,
  };

  useEffect(() => {
    if (auth) {
      dispatch(
        getWishlistByIdProduct({
          auth,
          idProduct,
        })
      );
    }

    dispatch(
      isLayout({
        websiteTitle: product.title,
        contentDescription: product?.desc,
        contentImage: product?.cover_image_url_700,
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
  }, [session]);

  useEffect(() => {
    dispatch(
      getProductReviews({
        product_id: idProduct,
        queries_param: {
          page: selectedRatingPage,
          limit: 5,
          rating: 5 - ratingTab,
        },
      })
    );
  }, [ratingTab, selectedRatingPage]);

  useEffect(() => {
    if (product.main_variant.variant_combo) {
      const valueMainVariant = product.main_variant.variant_combo.map(
        ({ ...variant }) => {
          return variant;
        }
      );
      setNameVariants(valueMainVariant);
    }
  }, [product]);

  useEffect(() => {
    const coverImage = product.cover_image_url_700;

    const additionalImage = product.additional_image_urls.map(
      (additionalImageUrl) => {
        return additionalImageUrl;
      }
    );

    const variantImage = product.variant_details.map((imageVariant) => {
      if (imageVariant.image_url_700 !== undefined) {
        return imageVariant.image_url_700;
      }
    });

    const newImage = [coverImage, ...additionalImage, ...variantImage].filter(
      (item) => item
    );
    const uniqImage = new Set(newImage);

    setGalleryImages([...uniqImage]);

    setDisplayImage(product.cover_image_url_700);

    // Set initial state
    setPriceProduct(priceInMainVariant);
    setTotalPrice(membershipPriceInMainVariant || priceInMainVariant);
    setMembershipPriceSummary(membershipPriceSummaryInMainVariant);
    setProductDiscountPercentage(discountPercentInMainVariant);
    setDiscountedProductPrice(discountPriceInMainVariant);
    setDiscountIsActive(hasDiscountInMainVariant);

    if (product.additional_video_urls.length != 0) {
      const videoUrls = product.additional_video_urls.map((url) => {
        const isIdYoutubeUrl =
          /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})(?:$|&|\?|#)/;

        const newVideoUrl = url.match(isIdYoutubeUrl);

        const thumbnailImage = `https://img.youtube.com/vi/${newVideoUrl[1]}/hqdefault.jpg`;
        const videoYoutube = `https://www.youtube.com/embed/${newVideoUrl[1]}?autoplay=0`;

        return newVideoUrl ? { thumbnailImage, videoYoutube } : null;
      });

      setVideoUrls(videoUrls);
    }
  }, [product]);

  const handlerModalAlert = () => setIsModalAlert(!isModalAlert);

  const handlerModalAddress = () => {
    setIsModalAddress(!isModalAddress);
    setIsModalAlert(false);
  };

  const handlerOpenGallery = () => {
    setIsOpenGallery(true);
  };

  const changeImageHandler = (newImage) => {
    setDisplayImage(newImage);
  };

  const handlerProductVariant = ({ name, value }) => {
    const newVariant = { name: name, value: value };

    const newVariants = nameVariants.map((variant) => {
      if (
        variant.name === newVariant.name &&
        variant.value !== newVariant.value
      ) {
        return newVariant;
      } else {
        return variant;
      }
    });

    if (newVariants.length >= 2) {
      const variantActive = variantCombo.some(
        (item) =>
          item[0].name == newVariants[0].name &&
          item[0].value == newVariants[0].value &&
          item[1].name == newVariants[1].name &&
          item[1].value == newVariants[1].value
      );
      setIsVariantActive(variantActive);
    }

    product.variant_details.map((variant_detail) => {
      const newVariantCombo = [];
      const variantChoose = [];
      newVariants.map((newVariant) => {
        variantChoose += newVariant.value;
      });

      variant_detail.variant_combo.map(({ ...variantCombo }) => {
        newVariantCombo += variantCombo.value;
      });

      if (newVariantCombo == variantChoose) {
        const membershipPrice = variant_detail?.membership_discount?.find(
          (membershipDataByTier) =>
            membershipDataByTier?.tier === currentUserMemberData.memberType
        )?.final_price;
        const totalFinalPrice = membershipPrice || variant_detail.price;

        setIdVariant(variant_detail.id);
        setStockProduct(variant_detail.stock);
        setQuantity(1);
        setPriceProduct(variant_detail.price);
        setMembershipPriceSummary(variant_detail.membership_discount);
        setDiscountedProductPrice(variant_detail.base_price);
        setProductDiscountPercentage(parseInt(variant_detail.discount.percent));
        setDiscountIsActive(variant_detail.discount.status === "ACTIVE");
        setTotalPrice(totalFinalPrice);

        if (variant_detail.image_url_700) {
          setDisplayImage(variant_detail.image_url_700);
        }
      }
    });

    setNameVariants(newVariants);
  };

  const quantityIncrementHandler = () => {
    const newQuantity = Number(quantity) + 1;
    setQuantity(newQuantity);
    setTotalPrice(productFinalPrice * newQuantity);
  };

  const quantityDecrementHandler = () => {
    if (quantity !== 1) {
      const newQuantity = Number(quantity) - 1;
      setQuantity(newQuantity);
      setTotalPrice(productFinalPrice * newQuantity);
    }
  };

  const quantityChangeHandler = async (event) => {
    const { target, _reactName } = event;
    const isNumber = /^[0-9]*$/;

    const newQuantity = isNumber.test(target.value) ? Number(target.value) : 0;

    if (newQuantity <= stockProduct * 100) {
      setQuantity(newQuantity);
      setTotalPrice(productFinalPrice * newQuantity);
    }

    if (_reactName === "onBlur") {
      if (newQuantity === 0) {
        setQuantity(1);
        setTotalPrice(productFinalPrice);
      }

      if (target.value >= stockProduct) {
        setQuantity(stockProduct);
        setTotalPrice(productFinalPrice * stockProduct);
      }
    }
  };

  const handlerModalShare = () => setIsOpenShareModal(!isOpenShareModal);

  const handlerWishlistProduct = async () => {
    if (!auth) {
      return push("/login");
    }

    if (isWishlist) {
      const resultsDeleteToWishlist = await deleteWishlist({
        auth,
        idProduct,
      });

      if (!resultsDeleteToWishlist.code) {
        sendNotification({
          msg: ["Success delete from wishlist"],
        });

        dispatch(
          getWishlistByIdProduct({
            auth,
            idProduct,
          })
        );
      }
    } else {
      const resultsAddToWishlist = await postWishList({
        auth,
        idProduct,
      });

      if (!resultsAddToWishlist.code) {
        sendNotification({
          msg: ["Success add to wishlist"],
        });

        dispatch(
          getWishlistByIdProduct({
            auth,
            idProduct,
          })
        );
      }
    }
  };

  const ratingTabChangeHandler = (_event, newValue) => {
    setRatingTab(newValue);
  };

  const handlerAddToCart = async () => {
    if (auth) {
      const createCart = await createProductCart(auth, payloadCheckoutCart);

      if (!createCart.code) {
        dispatch(getQuantityCartData());
        sendNotification({
          msg: ["Success add product to cart"],
        });
      }

      if (createCart.code) {
        sendNotification({
          msg: [createCart.message],
          variant: "error",
        });
      }
    } else {
      push("/login");
    }
  };

  const renderRatingTabs = () => {
    const ratingTab = [];

    for (let i = 5; i > 0; i--) {
      ratingTab.push(
        <Tab
          key={i}
          className="star"
          label={
            <div>
              {[...new Array(i)].map((_, key) => (
                <StarRounded key={key} />
              ))}
            </div>
          }
          {...tabProps(i)}
        />
      );
    }

    return ratingTab;
  };

  const handleChangeRatingsPage = (_, value) => {
    setSelectedRatingPage(value);
  };

  const renderRatingSkeleton = () => {
    const ratingSkeleton = [];

    for (let i = 0; i < 3; i++) {
      ratingSkeleton.push(
        <Skeleton variant="rectangular" width={801} height={100} />
      );
    }

    return ratingSkeleton;
  };

  const finishFetchRatingAPI = [
    API_FETCH_STATUS.IS_SUCCESS,
    API_FETCH_STATUS.IS_FAILED,
  ];

  const manageProductButtonsProps = {
    isWishlist,
    handlerModalShare,
    handlerWishlistProduct,
  };

  return (
    <>
      <Head>
        <meta property="og:title" content={`${productName} | Smart Apes`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${process.env.NEXTAUTH_URL}${asPath}`}
        />
        <meta property="og:image:url" content={displayImage} />
        <meta
          property="og:description"
          content={product?.desc.substring(0, 250) + "..."}
        />
      </Head>
      <Container
        maxWidth="lg"
        sx={{ paddingTop: "55px", position: "relative" }}
      >
        <div className="product">
          <div className="productImage">
            <div className="imageContainer">
              <div onClick={handlerOpenGallery}>
                <InnerImageZoom
                  hideHint={true}
                  src={displayImage}
                  zoomScale={1}
                  zoomType="hover"
                  zoomPreload={true}
                />
              </div>

              <Modal
                open={isOpenGallery}
                onClose={() => setIsOpenGallery(false)}
              >
                <GalleryImageProduct
                  productName={productName}
                  closeModal={() => setIsOpenGallery(false)}
                  images={galleryImages}
                  videoUrls={videoUrls}
                />
              </Modal>

              <Carousel
                autoPlay={false}
                swipeable={true}
                draggable={false}
                indicators={false}
                responsive={responsive}
                containerClass="carouselContainer"
                className="carouselContainer"
                infinite={false}
                removeArrowOnDeviceType={["tablet", "mobile"]}
              >
                {[...videoUrls, ...galleryImages].map((image, key) => (
                  <div
                    key={key}
                    className={`smallImage ${
                      image === displayImage && "imageActive"
                    }`}
                    onClick={() =>
                      image.thumbnailImage
                        ? handlerOpenGallery()
                        : changeImageHandler(image)
                    }
                    style={
                      image.thumbnailImage && {
                        backgroundPosition: "center",
                        backgroundSize: "contain",
                        backgroundImage: `url(${image.thumbnailImage})`,
                      }
                    }
                  >
                    {image.thumbnailImage ? (
                      <Image
                        src={playing}
                        alt="image variant"
                        width="40px"
                        height="40px"
                        objectFit="contain"
                      />
                    ) : (
                      <Image
                        src={image}
                        alt="image variant"
                        layout="fill"
                        objectFit="contain"
                      />
                    )}
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          <div className="productHeader">
            <Typography className="productTitle">{productName}</Typography>
          </div>

          <MembershipDiscountRate
            productMembershipTiersPrice={membershipPriceSummary}
          />

          <div className="cardDiscount">
            {discountIsActive && (
              <>
                <div className="discountPercent">
                  {parseInt(productDiscountPercentage)}%
                </div>
                <Typography className="discountAmount">
                  {formatCurrency(discountedProductPrice)}
                </Typography>
              </>
            )}
            <Typography className="price">
              {formatCurrency(priceProduct)}
            </Typography>
            <MembershipBenefitTooltip />
          </div>

          <Divider className="divider" />

          <div className="productSeller">
            <div className="sellerDetails">
              <Avatar
                src={imageProfileShop ?? noShopImage}
                className="sellerLogo"
              />
              <div className="seller">
                <Typography className="sellerName">{nameShop}</Typography>
                <Typography className="sellerLocation">
                  {countryShop}
                </Typography>
              </div>
            </div>
            <Link href={`/${shop.Shop.slug}`}>
              <a>
                <PrimaryButton text="Visit Store" />
              </a>
            </Link>
          </div>

          <Divider className="divider" />

          {variantSetups.length != 0 && (
            <div className="productVariants">
              <div>
                <Typography>Product Variants</Typography>
              </div>

              {variantSetups.map((variantSetup) => (
                <div key={variantSetup._id} className="variantOptions">
                  <Typography>{variantSetup.name}</Typography>
                  <Grid container gap={1}>
                    {variantSetup.options.map((option, indexOption) => (
                      <Button
                        key={indexOption}
                        className={
                          nameVariants[0]?.value == option ||
                          nameVariants[1]?.value == option
                            ? "buttonSelect"
                            : (!isVariantActive ||
                                product.variant_details[indexOption].stock ==
                                  0) &&
                              "buttonDisabled"
                        }
                        onClick={() =>
                          handlerProductVariant({
                            name: variantSetup.name,
                            value: option,
                          })
                        }
                        variant="outlined"
                        color="primary"
                      >
                        {option}
                      </Button>
                    ))}
                  </Grid>
                </div>
              ))}
            </div>
          )}

          <div className="productDetails">
            <Typography className="detailsHeader">Specification</Typography>
            <ul>
              {specifications ? (
                <>
                  {isSeeMoreSpecification
                    ? specifications?.map((specification, key) => (
                        <li key={key}>
                          {specification.title} : &ensp;
                          {specification.name}
                        </li>
                      ))
                    : specifications?.map(
                        (specification, key) =>
                          key <= 4 && (
                            <li key={key}>
                              {specification.title} : &ensp;
                              {specification.name}
                            </li>
                          )
                      )}
                </>
              ) : (
                "No Product Specification"
              )}
            </ul>
            {specifications.length > 5 && (
              <Button
                onClick={() =>
                  setIsSeeMoreSpecification(!isSeeMoreSpecification)
                }
                className="button-see-more"
                endIcon={
                  isSeeMoreSpecification ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )
                }
              >
                {isSeeMoreSpecification ? "See Less" : "See More"}
              </Button>
            )}

            <Divider className="divider" />

            <div className="productDescription">
              <Typography className="descriptionHeader">Description</Typography>
              {!isSeeMoreDescription && product?.desc.length >= 250 ? (
                <p
                  dangerouslySetInnerHTML={{
                    __html: xss(product?.desc.substring(0, 250) + "..."),
                  }}
                />
              ) : (
                <p
                  dangerouslySetInnerHTML={{
                    __html: xss(product?.desc),
                  }}
                />
              )}
            </div>

            {product?.desc.length >= 250 && (
              <Button
                onClick={() => setIsSeeMoreDescription(!isSeeMoreDescription)}
                className="button-see-more"
                endIcon={
                  isSeeMoreDescription ? <ExpandLessIcon /> : <ExpandMoreIcon />
                }
              >
                {isSeeMoreDescription ? "See Less" : "See More"}
              </Button>
            )}
          </div>

          <div className="purchaseMenus">
            <div className="menuDiv">
              <div className="purchaseQuantity">
                <Stack direction="row" gap="1.4rem">
                  <Stack direction="column" gap="0.75rem">
                    <Typography className="quantityHeader">Quantity</Typography>
                    <QuantityButton
                      decrementHandler={quantityDecrementHandler}
                      incrementHandler={quantityIncrementHandler}
                      onChange={quantityChangeHandler}
                      value={
                        isVariantActive && stockProduct != 0 ? quantity : 0
                      }
                      stock={isVariantActive ? stockProduct : 0}
                    />
                  </Stack>
                  <Stack direction="column" gap="0.75rem">
                    <Typography className="quantityHeader">Stock</Typography>
                    <Typography
                      className={
                        ((stockProduct == 0 || !isVariantActive) &&
                          "outOfStockProduct") ||
                        (stockProduct <= 20 && "lowStockProduct") ||
                        (stockProduct >= 20 && "stockProduct")
                      }
                    >
                      {stockProduct == 0 || !isVariantActive
                        ? "Out-of-Stock"
                        : stockProduct != 0 && stockProduct}
                    </Typography>
                  </Stack>
                </Stack>
                <p>Minimum Order : {minimumOrderQuantity}</p>
              </div>

              <div className="subTotalPrice">
                <Typography className="subTotalHeader">Subtotal</Typography>
                <Typography className="price">
                  {isVariantActive ? formatCurrency(totalPrice) : "-"}
                </Typography>
              </div>

              <div className="menuButtons">
                <SecondaryButton
                  fullWidth={true}
                  disabled={!isVariantActive || stockProduct == 0}
                  onClick={handlerAddToCart}
                  text="Add to Cart"
                  startIcon={<Image src={cart} alt="cart" />}
                />

                <PrimaryButton
                  fullWidth={true}
                  disabled={!isVariantActive || stockProduct == 0}
                  onClick={() =>
                    processCheckout({
                      payload: payloadCheckoutCart,
                      openModalAlert: setIsModalAlert,
                    })
                  }
                  text="Purchase Now"
                  isLoading={isLoadPurchaseButton}
                />
                <ManageProductButtons {...manageProductButtonsProps} />
              </div>
            </div>
          </div>

          {isBundle && dataBundles && (
            <div className="bundleContainer">
              <Typography className="detailsHeader">Bundle Deals</Typography>
              <BundleProductContainer
                idProduct={idProduct}
                data={dataBundles}
              />
            </div>
          )}

          <div className="ratings">
            <div className="ratingDiv">
              <Stack direction="row" spacing={0.8}>
                <Typography className="header">Ratings</Typography>
                <Typography
                  color="#C5C5C5"
                  fontSize="13px"
                  fontWeight="500"
                  alignSelf="center"
                >
                  {`(${numeral(product?.rating?.value).format("0.0")} with ${
                    product?.rating?.count
                  } ratings)`}
                </Typography>
              </Stack>
              <Tabs
                className="tabs"
                value={ratingTab}
                onChange={ratingTabChangeHandler}
                aria-label="basic tabs example"
              >
                {renderRatingTabs()}
              </Tabs>

              {[...Array(5)].map((_, key) => (
                <TabPanel key={key} value={ratingTab} index={key}>
                  {!finishFetchRatingAPI.includes(statusGetProductReviews) && (
                    <Stack direction="column" spacing={1.5} my={4}>
                      {renderRatingSkeleton()}
                    </Stack>
                  )}
                  {finishFetchRatingAPI.includes(statusGetProductReviews) &&
                    (reviewsData?.length === 0 ? (
                      <NoRatings />
                    ) : (
                      reviewsData?.map((review) => (
                        <Fragment key={review.id}>
                          <div key={review.id} className="rating">
                            <div className="ratingDetails">
                              <Typography className="name">
                                {review.User.full_name}
                              </Typography>
                              <div className="stars">
                                {[...Array(review.rating)].map((e, i) => (
                                  <StarRounded key={i} />
                                ))}

                                <Divider
                                  sx={{ px: 0.5 }}
                                  orientation="vertical"
                                  flexItem
                                />

                                <Typography
                                  px={1}
                                  color="#D4D4D4"
                                  fontSize={14}
                                  fontWeight={400}
                                >
                                  {format(
                                    parseISO(review.review_date),
                                    "dd MMMM yyyy. HH:mm"
                                  )}
                                </Typography>
                              </div>
                              <Typography className="ratingText">
                                {review?.review_detail}
                              </Typography>
                            </div>
                          </div>
                          <Divider />
                        </Fragment>
                      ))
                    ))}
                </TabPanel>
              ))}
              <Pagination
                sx={{ alignSelf: "flex-end", my: 3 }}
                page={selectedRatingPage}
                onChange={handleChangeRatingsPage}
                count={Math.floor(totalRatingsResult / 5) || 1}
              />
            </div>
          </div>

          <div className="relatedProducts">
            <div className="headerRow">
              <div className="header">
                <Typography className="headerText">Related Products</Typography>
              </div>
            </div>
            <Grid container>
              {relatedProducts.length == 0 ? (
                <NoRelatedProduct />
              ) : (
                relatedProducts.map((product, key) => (
                  <Grid item md={2.4} key={key}>
                    <ProductCard size="large" product={product} />
                  </Grid>
                ))
              )}
            </Grid>
          </div>
        </div>

        <ModalAlertAddress
          isOpen={isModalAlert}
          closeModal={handlerModalAlert}
          openModalAddress={handlerModalAddress}
        />

        <ModalAddAddress
          accessToken={auth}
          userId={user?.id}
          isOpen={isModalAddress}
          closeModal={handlerModalAddress}
          handlerCheckout={() =>
            processCheckout({
              payload: payloadCheckoutCart,
              openModalAlert: setIsModalAlert,
            })
          }
        />

        <ModalShareProduct
          isOpen={isOpenShareModal}
          closeModal={handlerModalShare}
          shareImage={displayImage}
          shareName={productName}
          linkShare={asPath}
        />
      </Container>
    </>
  );
};

export default memo(ProductPage);
