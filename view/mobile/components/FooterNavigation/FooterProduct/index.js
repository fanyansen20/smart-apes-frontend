// Next
import useLoginCallback from "@hooks/useLoginCallback";
import useNotification from "@hooks/useNotification";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// API
import { postMultipleProductCart } from "services/carts/postMultipleProductCart";
import { createCheckoutMultipleVariant } from "services/checkout/product/createCheckoutMultipleVariant";
import { getQuantityCartData } from "store/reducer/quantityCart/quantityCartSlice";

// Helper
import { formatCurrency, roundUpDiscountLessThanOne } from "@helper/checkValue";
import errorHandler from "@helper/errorHandler/errorHandler";
import { filterNumberOnly } from "@helper/filterNumberOnly";

// MUI
import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton, Paper } from "@mui/material";

// Styles
import classes from "./FooterProduct.module.scss";

// Assets
import DangerIcon from "public/assets/icons/danger-triangle.svg";

// Comp
import QuantityButton from "@components/buttons/QuantityButton/QuantityButton";
import ExpansionPanel from "@components/expansionPanel/ExpansionPanel";
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";
import CustomBadge from "../../CustomBadge/CustomBadge";
import FooterProductButtons from "../components/FooterProductButtons";

// Constant
import { getMembershipDiscountPrice } from "@helper/getMembershipDiscountPrice";
import { productDrawerModes } from "./constant";

/**
 @param {{
  product: Object
  bundleQuota: number
  showDrawer: boolean
  handleApplyVariant: () => void
  setShowDrawer: () => void
  mode: String
  setMode: () => void
}} props
 */
const FooterProduct = ({
  product,
  bundleQuota = 1,
  handleApplyVariant,
  showDrawer = false,
  setShowDrawer,
  mode,
  setMode,
}) => {
  const handleLoginCallback = useLoginCallback();
  const { push } = useRouter();
  const { data: session } = useSession();
  const { accessToken: auth } = session || {};
  const dispatch = useDispatch();
  const [_, sendNotification] = useNotification();
  const [productData, setProductData] = useState([]);
  const [isValidQty, setIsValidQty] = useState(false);
  const [activeVarIdx, setActiveVarIdx] = useState([]);
  const [isLoadingPurchase, setIsLoadingPurchase] = useState(false);
  const [remainingQuota, setRemainingQuota] = useState(0);

  // #region redux state
  const membership = useSelector((state) => state.member);
  // #endregion

  const variantSetup = product?.variant_setups;
  const variantDetails = product?.variant_details;
  const modeTitle =
    variantDetails?.length > 1
      ? productDrawerModes.ALL.drawerTitle
      : productDrawerModes[mode].drawerTitle;
  const minOrder = productData?.[0]?.childVariant?.[0]?.min_order || 1;
  const isBundle = mode === productDrawerModes.BUNDLE.param;

  const increaseQty = (firstVariantIdx = 0, secondVariantIdx = 0) => {
    const _productData = [...productData];
    _productData[firstVariantIdx].childVariant[secondVariantIdx].purchaseQty++;
    setProductData(_productData);
  };

  const decreaseQty = (firstVariantIdx = 0, secondVariantIdx = 0) => {
    const _productData = [...productData];
    _productData[firstVariantIdx].childVariant[secondVariantIdx].purchaseQty--;
    setProductData(_productData);
  };

  const handleChangeQty = (
    firstVariantIdx = 0,
    secondVariantIdx = 0,
    value
  ) => {
    const _productData = [...productData];
    _productData[firstVariantIdx].childVariant[secondVariantIdx].purchaseQty =
      value || 0;
    setProductData(_productData);
  };

  const getSelectedVariantsItem = (variants) => {
    if (variants?.length === 0) return 0;

    const qty = variants
      ?.map((item) => item.purchaseQty)
      ?.reduce((acc, num) => acc + num, 0);

    return qty || 0;
  };

  const getVariantsData = () => {
    // Handle product with no variant
    if (variantDetails?.length === 1) {
      const noVariantData = variantDetails?.map((variant) => ({
        name: variant?.title || variant?.variant_title,
        productImage:
          variant?.cover_image_url ||
          variant?.images?.image_url ||
          product?.cover_image_url,
        childVariant: [{ ...variant, purchaseQty: variant?.min_order || 1 }],
      }));

      return setProductData(noVariantData);
    }

    // Handle product with 1 type and 2 type variant
    const variantsData = variantSetup?.[0]?.options.map((parentVariant) => ({
      name: parentVariant,
      childVariant: variantDetails
        .map((details) => {
          const parentVariantName = details?.variant_combo?.[0]?.value;
          if (parentVariant === parentVariantName) {
            return {
              ...details,
              productImage:
                details?.image_url ||
                details?.images?.image_url ||
                product?.cover_image_url,
              purchaseQty: isBundle ? details?.purchaseQty : 0,
            };
          }
        })
        .filter((item) => item !== undefined)
        .map((mappedChild, mappedChildIdx) => ({
          ...mappedChild,
          name: variantSetup?.[1]?.options?.[mappedChildIdx],
        })),
    }));

    const defaultActiveVariant = variantsData?.map((variant) => {
      const defaultSelectedIdx = variant?.childVariant?.findIndex(
        (childVar) => childVar?.purchaseQty > 0
      );

      let cheapestVariantIdx = 0;
      let lowestPrice = variant?.childVariant?.[0]?.price;
      variant?.childVariant?.forEach((childVar, childVarIdx) => {
        if (childVar?.price < lowestPrice) {
          lowestPrice = childVar?.price;
          cheapestVariantIdx = childVarIdx;
        }
      });

      return defaultSelectedIdx >= 0 ? defaultSelectedIdx : cheapestVariantIdx;
    });

    setActiveVarIdx(defaultActiveVariant);
    setProductData(variantsData);
  };

  const handleChangeActiveVariant = (parentIdx, childIdx) => {
    const _activeVarIdx = [...activeVarIdx];
    _activeVarIdx[parentIdx] = childIdx;

    setActiveVarIdx(_activeVarIdx);
  };

  const handleOpenDrawer = () => setShowDrawer(true);
  const handleCloseDrawer = () => setShowDrawer(false);

  const handleClickCart = () => {
    setMode(productDrawerModes.CART.param);
    handleOpenDrawer();
  };

  const handleClickPurchase = () => {
    setMode(productDrawerModes.PURCHASE.param);
    handleOpenDrawer();
  };

  const handlerAddToCart = async () => {
    try {
      if (!auth) {
        return handleLoginCallback();
      }

      const selectedVariants = productData
        ?.map((parentVariant) =>
          parentVariant.childVariant.map((childVariant) => {
            if (childVariant?.purchaseQty > 0) return childVariant;
          })
        )
        .flat()
        .filter((item) => item !== undefined);

      const payload = selectedVariants?.map((variant) => ({
        type: product?.type,
        item_id: product?.id,
        variant_id: variant?.id,
        qty: variant?.purchaseQty,
      }));

      const res = await postMultipleProductCart(payload);

      const failedVariantsId = res?.data
        ?.filter((item) => item.result.includes("Failed"))
        .map((item) => item?.variant_id);

      if (failedVariantsId.length === 0) {
        dispatch(getQuantityCartData());
        handleCloseDrawer(false);
        sendNotification({
          msg: ["Success add product to cart"],
        });
        return;
      }

      const failedVariants = variantDetails
        ?.filter((variants) => failedVariantsId.includes(variants.id))
        .map((item) => item?.title);

      sendNotification({
        msg: ["Unable add product to cart :", failedVariants],
        variant: "error",
      });

      handleCloseDrawer();
    } catch (error) {
      sendNotification({
        msg: [errorHandler(error)],
        variant: "error",
      });
    }
  };

  const handlerPurchaseNow = async () => {
    try {
      if (!auth) {
        return handleLoginCallback();
      }

      const selectedVariants = productData
        ?.map((parentVariant) =>
          parentVariant.childVariant.map((childVariant) => {
            if (childVariant?.purchaseQty > 0) return childVariant;
          })
        )
        .flat()
        .filter((item) => item !== undefined);

      const variants = selectedVariants?.map((variant) => ({
        variant_id: variant?.id,
        qty: variant?.purchaseQty,
      }));

      const payload = {
        type: product?.type,
        variants,
      };

      const res = await createCheckoutMultipleVariant(product?.id, payload);

      window.scrollTo(0, 0);
      push(`../cart/checkout/${res?.data?.id}`);
      handleCloseDrawer();
    } catch (error) {
      const errCode = error?.response?.status;
      const errMessage = error?.response?.data?.message;

      if (errCode !== 400) {
        return sendNotification({
          msg: [errMessage],
          variant: "error",
        });
      }

      if (errMessage === "Product qty is outside of checkout limit") {
        return sendNotification({
          msg: ["Not meet minimum order requirement"],
          variant: "error",
        });
      }

      if (errMessage == "User address is missing") {
        return handleNoAddress();
      }

      sendNotification({
        msg: [errMessage],
        variant: "error",
      });
    }
  };

  const handleApplyBundleVariant = () => {
    handleApplyVariant(productData);
  };

  const getRemainingQuota = () => {
    const usedQuota = productData
      ?.map((product) => product.childVariant)
      ?.flat()
      ?.map((variant) => variant?.purchaseQty)
      ?.reduce((acc, qty) => acc + qty, 0);

    setRemainingQuota(bundleQuota - usedQuota);
  };

  useEffect(() => {
    if (isBundle) getRemainingQuota();
  }, [productData]);

  const getVariantStock = ({ value = 0, stock = 1 }) => {
    if (!isBundle) return stock;

    const variantStock = remainingQuota + value;
    return stock < variantStock ? stock : variantStock;
  };

  const handleNoAddress = () => {
    setIsLoadingPurchase(false);
    return sendNotification({
      msg: ["Please insert your address in profile section"],
      variant: "error",
    });
  };

  useEffect(() => {
    const qty = productData
      ?.map((product) =>
        product?.childVariant?.map((variant) => variant?.purchaseQty)
      )
      .flat()
      .reduce((acc, num) => (acc += num), 0);

    const minOrderQty = isBundle
      ? variantDetails?.[0]?.qty
      : variantDetails?.[0]?.min_order;
    setIsValidQty(qty < minOrderQty || qty === 0 ? false : true);
  }, [productData]);

  useEffect(() => {
    getVariantsData();
  }, [product]);

  useEffect(() => {
    if (!showDrawer) getVariantsData();
  }, [showDrawer]);

  // #region jsx
  /**
   * @param {number} value
   * @returns
   */
  const renderDiscountPercentage = (value) => {
    return (
      <p className={classes.discountPercentage}>
        {roundUpDiscountLessThanOne(value)}%
      </p>
    );
  };

  /**
   * @param {number} value
   * @returns
   */
  const renderBasePrice = (value) => {
    return <p className={classes.basePrice}>{formatCurrency(value)}</p>;
  };

  /**
   * @param {number} value
   * @returns
   */
  const renderFinalPrice = (value) => {
    return <p className={classes.price}>{formatCurrency(value)}</p>;
  };
  // #endregion

  // #region data
  const memberDiscountRate = getMembershipDiscountPrice({
    membership,
    membershipDiscount:
      variantDetails?.length === 1
        ? productData?.[0]?.childVariant[0]?.membership_discount
        : undefined,
  });
  // #endregion

  return (
    <Paper className={classes.footerNavbarProduct} elevation={3}>
      {!isBundle && (
        <FooterProductButtons
          onClickCart={handleClickCart}
          onClickPurchase={handleClickPurchase}
        />
      )}
      <Drawer anchor="bottom" open={showDrawer} onClose={handleCloseDrawer}>
        <div className={classes.containerDrawer}>
          <section className={classes.header}>
            <h1>{modeTitle}</h1>
            <IconButton onClick={handleCloseDrawer}>
              <CloseIcon />
            </IconButton>
          </section>
          {/* Product no variant */}
          {variantDetails?.length === 1 && (
            <>
              <section className={classes.productOverview}>
                <Image
                  src={
                    productData?.[0]?.productImage || product?.cover_image_url
                  }
                  width="70px"
                  height="70px"
                  alt={productData?.[0]?.name}
                />
                <div>
                  {memberDiscountRate ? (
                    <>
                      <div className={classes.prices}>
                        {productData?.[0]?.childVariant?.[0]?.discount
                          ?.status == "ACTIVE" && (
                          <>
                            {renderDiscountPercentage(
                              productData?.[0]?.childVariant?.[0]?.discount
                                ?.percent
                            )}
                            <p className={classes.discountPlus}>+</p>
                          </>
                        )}
                        <p className={classes.discountMemberPercentage}>
                          {roundUpDiscountLessThanOne(
                            memberDiscountRate?.discount_percent
                          )}
                          %
                        </p>
                      </div>
                      <div className={classes.prices}>
                        {renderBasePrice(
                          productData?.[0]?.childVariant?.[0]?.base_price *
                            productData?.[0]?.childVariant?.[0]?.purchaseQty
                        )}
                        {renderFinalPrice(
                          memberDiscountRate?.final_price *
                            productData?.[0]?.childVariant?.[0]?.purchaseQty
                        )}
                      </div>
                    </>
                  ) : (
                    <div className={classes.prices}>
                      {productData?.[0]?.childVariant?.[0]?.discount?.status ==
                        "ACTIVE" && (
                        <>
                          {renderDiscountPercentage(
                            productData?.[0]?.childVariant?.[0]?.discount
                              ?.percent
                          )}
                          {renderBasePrice(
                            productData?.[0]?.childVariant?.[0]?.base_price *
                              productData?.[0]?.childVariant?.[0]?.purchaseQty
                          )}
                        </>
                      )}
                      {renderFinalPrice(
                        productData?.[0]?.childVariant?.[0]?.price *
                          productData?.[0]?.childVariant?.[0]?.purchaseQty
                      )}
                    </div>
                  )}
                  <p className={classes.stock}>
                    Stock: {productData?.[0]?.childVariant?.[0]?.stock}
                  </p>
                </div>
              </section>
              <section className={classes.quantity}>
                <h2>Quantity</h2>
                <QuantityButton
                  value={productData?.[0]?.childVariant?.[0]?.purchaseQty}
                  incrementHandler={() => increaseQty(0, 0)}
                  decrementHandler={() => decreaseQty(0, 0)}
                  onChange={(e) =>
                    handleChangeQty(0, 0, filterNumberOnly(e.target.value))
                  }
                  stock={productData?.[0]?.childVariant?.[0]?.stock}
                  minQty={minOrder}
                />
              </section>
              <p className={classes.minOrder}>Minimum Order: {minOrder}</p>
            </>
          )}

          {/* Product with variant */}
          {variantDetails?.length > 1 && (
            <div className={classes.containerVariants}>
              {isBundle ? (
                <p>
                  Quota Remaining{" "}
                  <span className={classes.textRed}>{remainingQuota}</span>
                </p>
              ) : (
                <p>
                  Minimum Order{" "}
                  <span className={classes.textRed}>{minOrder}</span>
                </p>
              )}
              <p>Please choose the specific product</p>
              {productData?.map((product, idxProduct) => {
                const childVariantProduct =
                  product?.childVariant?.[activeVarIdx[idxProduct]];

                const variantMemberDiscountRate = getMembershipDiscountPrice({
                  membership,
                  membershipDiscount: childVariantProduct?.membership_discount,
                });

                return (
                  <div key={idxProduct} className={classes.containerExpansion}>
                    <ExpansionPanel
                      title={
                        <div className={classes.expansionTitle}>
                          <Image
                            src={
                              product?.childVariant?.[0]?.productImage ||
                              product?.cover_image_url
                            }
                            width="48px"
                            height="48px"
                            alt={product?.name}
                          />
                          <p className={classes.titleText}>{product?.name}</p>
                          <div className={classes.badge}>
                            <CustomBadge
                              value={getSelectedVariantsItem(
                                product?.childVariant
                              )}
                            />
                          </div>
                          {/* {product?.childVariant?.length === 1 && (
                            <div className={classes.badge}>
                              <Badge
                                badgeContent={
                                  product?.childVariant?.[0]?.purchaseQty
                                }
                              />
                            </div>
                          )} */}
                        </div>
                      }
                    >
                      <section className={classes.content}>
                        {variantSetup?.[1] && (
                          <div className={classes.variantSelection}>
                            {product?.childVariant?.map(
                              (variant, idxVariant) => (
                                <SecondaryButton
                                  disabled={
                                    isBundle &&
                                    remainingQuota === 0 &&
                                    product?.childVariant?.[idxVariant]
                                      ?.purchaseQty === 0
                                  }
                                  key={idxVariant}
                                  onClick={() =>
                                    handleChangeActiveVariant(
                                      idxProduct,
                                      idxVariant
                                    )
                                  }
                                  className={
                                    activeVarIdx?.[idxProduct] === idxVariant
                                      ? classes.btnActive
                                      : undefined
                                  }
                                >
                                  {product?.childVariant?.[idxVariant]
                                    ?.purchaseQty > 0 && (
                                    <div className={classes.badge}>
                                      <CustomBadge
                                        value={
                                          product?.childVariant?.[idxVariant]
                                            ?.purchaseQty
                                        }
                                      />
                                    </div>
                                  )}
                                  {product?.childVariant?.[idxVariant]
                                    ?.stock === 0 && (
                                    <div className={classes.dangerIcon}>
                                      <Image
                                        src={DangerIcon}
                                        alt="stock empty"
                                      />
                                    </div>
                                  )}
                                  <p>{variant?.name}</p>
                                </SecondaryButton>
                              )
                            )}
                          </div>
                        )}

                        <div className={classes.variantQty}>
                          {variantMemberDiscountRate ? (
                            <div>
                              <p
                                className={classes.priceTitle}
                              >{`${variantMemberDiscountRate?.tier} Member Price:`}</p>
                              <div className={classes.prices}>
                                {renderBasePrice(
                                  variantMemberDiscountRate?.price
                                )}
                                {renderFinalPrice(
                                  variantMemberDiscountRate?.final_price
                                )}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <p className={classes.priceTitle}>Price:</p>
                              {childVariantProduct?.discount?.status ===
                              "ACTIVE" ? (
                                <div className={classes.prices}>
                                  {renderBasePrice(
                                    product?.childVariant?.[
                                      activeVarIdx[idxProduct]
                                    ]?.base_price
                                  )}
                                  {renderFinalPrice(
                                    product?.childVariant?.[
                                      activeVarIdx[idxProduct]
                                    ]?.price
                                  )}
                                </div>
                              ) : (
                                renderFinalPrice(
                                  product?.childVariant?.[
                                    activeVarIdx[idxProduct]
                                  ]?.price
                                )
                              )}
                            </div>
                          )}
                          {childVariantProduct?.stock > 0 ? (
                            <QuantityButton
                              value={childVariantProduct?.purchaseQty}
                              incrementHandler={() =>
                                increaseQty(
                                  idxProduct,
                                  activeVarIdx[idxProduct]
                                )
                              }
                              decrementHandler={() =>
                                decreaseQty(
                                  idxProduct,
                                  activeVarIdx[idxProduct]
                                )
                              }
                              onChange={(e) =>
                                handleChangeQty(
                                  idxProduct,
                                  activeVarIdx[idxProduct],
                                  filterNumberOnly(e.target.value)
                                )
                              }
                              stock={getVariantStock({
                                stock:
                                  product?.childVariant?.[
                                    activeVarIdx[idxProduct]
                                  ]?.stock,
                                value:
                                  product?.childVariant?.[
                                    activeVarIdx[idxProduct]
                                  ]?.purchaseQty,
                              })}
                              minQty={0}
                            />
                          ) : (
                            <p className={classes.emptyStock}>Out of Stock</p>
                          )}
                        </div>
                      </section>
                    </ExpansionPanel>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {isBundle ? (
          <section className={classes.btnApplyVariant}>
            <PrimaryButton
              disabled={isLoadingPurchase || !isValidQty}
              fullWidth
              className={classes.btnAddCart}
              text={productDrawerModes?.[mode]?.btnText}
              onClick={handleApplyBundleVariant}
            />
          </section>
        ) : (
          <section className={classes.btnProceed}>
            {mode !== productDrawerModes.ALL.param ? (
              <div className={classes.btnAddCartMobile}>
                <PrimaryButton
                  disabled={isLoadingPurchase || !isValidQty}
                  fullWidth
                  className={classes.btnAddCart}
                  text={productDrawerModes?.[mode]?.btnText}
                  onClick={
                    mode === productDrawerModes.PURCHASE.param
                      ? handlerPurchaseNow
                      : handlerAddToCart
                  }
                />
              </div>
            ) : (
              <FooterProductButtons
                onClickCart={handlerAddToCart}
                onClickPurchase={handlerPurchaseNow}
                disabled={isLoadingPurchase || !isValidQty}
              />
            )}
          </section>
        )}
      </Drawer>
    </Paper>
  );
};

export default FooterProduct;
