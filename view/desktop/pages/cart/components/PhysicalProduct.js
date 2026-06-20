// React
import React, { memo } from "react";

// Next
import Image from "next/image";
import Link from "next/link";

// Redux
import { useSelector } from "react-redux";

// Components
import QuantityButton from "@components/buttons/QuantityButton/QuantityButton";
import PurpleCheckBox from "@components/checkbox/PurpleCheckBox/PurpleCheckBox";
import TextButton from "@components/shared/Button/TextButton/TextButton";

// MUI Components
import { Grid, Typography } from "@mui/material";

// MUI Icons
import { DeleteOutline } from "@mui/icons-material";

// Helpers
import { formatCurrency } from "@helper/checkValue";
import { convertDataProductCart } from "@helper/convertProductData";
import MembershipDiscountPercent from "view/desktop/components/MembershipDiscountPercent";

function PhysicalProduct({
  physicalProduct,
  checkHandler,
  deleteHandler,
  selectedProduct,
  quantityProduct,
  quantityChangeHandler,
  incrementDecrementHandler,
  setIsModalConfirmDelete,
}) {
  const physicalProductData = convertDataProductCart(physicalProduct.product);
  /**
   * @type {ProductMembershipTierPrice}
   */
  const membershipDiscountPrice = physicalProduct?.product?.membership_discount;

  return (
    <Grid className="product">
      <div
        onClick={() => checkHandler(physicalProduct.id)}
        className="checkBoxDiv"
      >
        <PurpleCheckBox
          disabled={physicalProductData.stockProduct === 0}
          checked={selectedProduct.includes(physicalProduct.id)}
        />
      </div>
      <div
        className={
          physicalProductData.stockProduct === 0
            ? "disabledProductImage"
            : "productImage"
        }
      >
        <Link
          href={{
            pathname: `/${physicalProduct.shop_slug}/${physicalProductData.slugProduct}`,
            query: {
              id: physicalProductData.idProduct,
              shop_id: physicalProductData.shopId,
            },
          }}
        >
          <a>
            <Image
              src={physicalProductData.imageProduct}
              alt="product"
              layout="fill"
              objectFit="contain"
            />
          </a>
        </Link>
      </div>

      <div className="productDetails">
        {physicalProductData.isOutOfStock ? (
          <>
            <Typography className="disabledProductCartTitle">
              {physicalProductData.nameProduct}
            </Typography>
            <div className="disabledPriceCartContainer">
              <Typography className="price">
                {formatCurrency(physicalProductData.priceProduct)}
              </Typography>
            </div>
            <Typography variant="h6">Out-of-stock!</Typography>
          </>
        ) : (
          <>
            <Link
              href={{
                pathname: `/${physicalProduct.shop_slug}/${physicalProductData.slugProduct}`,
                query: {
                  id: physicalProductData.idProduct,
                  shop_id: physicalProductData.shopId,
                },
              }}
            >
              <a>
                <Typography className="productCartTitle">
                  {physicalProductData.nameProduct}
                </Typography>
              </a>
            </Link>

            <div className="priceCartContainer">
              {physicalProductData.hasDiscountProduct && (
                <>
                  <Typography className="discountPercent">
                    {physicalProductData.percentDiscountProduct}%
                  </Typography>
                  <MembershipDiscountPercent
                    hasDiscount={physicalProductData.hasDiscountProduct}
                    membershipDiscountPrice={membershipDiscountPrice}
                  />
                  <Typography className="discountAmount">
                    {formatCurrency(physicalProductData.productDiscountPrice)}
                  </Typography>
                </>
              )}
              {!physicalProductData.hasDiscountProduct &&
                membershipDiscountPrice && (
                  <>
                    <MembershipDiscountPercent
                      hasDiscount={physicalProductData.hasDiscountProduct}
                      membershipDiscountPrice={membershipDiscountPrice}
                    />
                    <Typography className="discountAmount">
                      {formatCurrency(physicalProductData.membershipBasePrice)}
                    </Typography>
                  </>
                )}
              <Typography className="price">
                {formatCurrency(physicalProductData.priceProduct)}
              </Typography>
            </div>

            <Grid container gap="10px" alignItems="center">
              <QuantityButton
                stock={physicalProductData.stockProduct}
                incrementHandler={() =>
                  incrementDecrementHandler({
                    action: "INCREMENT",
                    cartId: physicalProduct.id,
                  })
                }
                decrementHandler={() =>
                  incrementDecrementHandler({
                    action: "DECREMENT",
                    cartId: physicalProduct.id,
                  })
                }
                value={quantityProduct[physicalProduct.id]}
                onChange={(event) =>
                  quantityChangeHandler({
                    event: event,
                    cartId: physicalProduct.id,
                    stockProduct: convertDataProductCart(
                      physicalProduct.product
                    ).stockProduct,
                  })
                }
              />

              {quantityProduct[physicalProduct.id] >
                physicalProductData.stockProduct && (
                <Typography variant="h6">
                  Max. Purchase&nbsp;
                  {physicalProductData.stockProduct}
                </Typography>
              )}
            </Grid>
          </>
        )}
      </div>

      <div className="additionalButtonsCart">
        {physicalProduct.wishlist ? (
          <Typography> Already in Wishlist</Typography>
        ) : (
          <TextButton
            color="secondary"
            text="Save for Later"
            onClick={() => deleteHandler(physicalProduct, "wishlist")}
          />
        )}
        <TextButton
          onClick={() =>
            setIsModalConfirmDelete({
              isOpen: true,
              dataProduct: physicalProduct,
              type: "delete",
            })
          }
          color="secondary"
          text={<DeleteOutline />}
        />
      </div>
    </Grid>
  );
}

export default memo(PhysicalProduct);
