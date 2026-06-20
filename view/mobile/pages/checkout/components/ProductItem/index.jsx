// React
import React, { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";

// Next
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

// MUI Components
import { Avatar, Button, Stack, TextField, Typography } from "@mui/material";

// Helpers
import { roundUpDiscountLessThanOne } from "@helper/checkValue";
import updateDetailCheckout from "pages/api/clientSide/checkouts/updateDetailCheckout";

// Icons
import WriteNote from "../../../../assets/icons/write-note.svg";

// Styles
import classes from "./ProductItem.module.scss";

const ProductItem = ({
  productId,
  productName,
  productQty,
  productStock,
  productStatus,
  imageUrl,
  discountPercent,
  basePrice,
  finalPrice,
  isBundleItem,
  disabledProductItem,
  membershipDiscount,
  hasActiveDiscount,
}) => {
  const { setValue, watch, control } = useFormContext();
  const { selectedInputItemNoteId } = watch();
  const isActive = productStock && productStatus === "ACTIVE";
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Stack
      direction="column"
      spacing={1}
      className={(!isActive || disabledProductItem) && "disabled-content"}
    >
      <Stack direction="row" gap={1.4}>
        {/* Product Image */}
        <Avatar
          variant="rounded"
          src={imageUrl}
          alt={productName}
          className={classes.productImage}
        />

        {/* Product Info */}
        <Stack direction="column" gap={1}>
          <Typography className={classes.productTitle}>
            {productName}
          </Typography>
          {isActive ? (
            <>
              <Stack direction="row" gap={1} alignItems="center">
                {membershipDiscount ? (
                  <>
                    <Stack direction="row" alignItems="center" gap={0.5}>
                      {hasActiveDiscount && (
                        <>
                          {renderDiscountPercentage(discountPercent)}
                          <Typography
                            className={classes.plusDiscountPercentage}
                          >
                            +
                          </Typography>
                        </>
                      )}
                      <Typography className={classes.memberDiscountPercentage}>
                        {roundUpDiscountLessThanOne(
                          membershipDiscount?.discount_percent
                        )}
                        %
                      </Typography>
                    </Stack>
                    {renderBasePrice(basePrice)}
                  </>
                ) : (
                  <>
                    {hasActiveDiscount && (
                      <>
                        {renderDiscountPercentage(discountPercent)}
                        {renderBasePrice(basePrice)}
                      </>
                    )}
                  </>
                )}
                <Typography className={classes.productFinalPrice}>
                  {finalPrice}
                </Typography>
              </Stack>
              {!isBundleItem && (
                <Typography className={classes.productQty}>
                  {productQty}
                </Typography>
              )}
            </>
          ) : (
            <Typography className={classes.warningText}>
              {!productStock && productStatus === "ACTIVE" && "Out-of-stock!"}
              {productStatus === "INACTIVE" &&
                "Product is currently unavailable"}
            </Typography>
          )}
        </Stack>
      </Stack>

      <Controller
        control={control}
        name={`productItemsNotes.${productId}`}
        render={({ field }) => {
          const setNotesValue = () => {
            setValue("selectedInputItemNoteId", null);
            field.onBlur();
            updateDetailCheckout({
              accessToken: session?.accessToken,
              checkoutId: router?.query?.id,
              checkoutItemId: productId,
              notes: field.value,
            });
          };

          return selectedInputItemNoteId === productId ? (
            <TextField
              {...field}
              autoFocus
              fullWidth
              className={classes.inputNotes}
              onBlur={() => setNotesValue()}
              onKeyDown={(e) => e.key === "Enter" && setNotesValue()}
              placeholder="Write here"
            />
          ) : (
            <Stack direction="row" alignItems="center">
              <Button
                className={classes.writeNoteBtn}
                startIcon={
                  <Image
                    src={WriteNote}
                    alt="write note images"
                    objectFit="contain"
                  />
                }
                onClick={() =>
                  isActive &&
                  !disabledProductItem &&
                  setValue("selectedInputItemNoteId", productId)
                }
              >
                {field.value ? "Edit Notes" : "Write a Notes"}
              </Button>
              {field.value && (
                <Typography className={classes.productNotes}>
                  {field.value}
                </Typography>
              )}
            </Stack>
          );
        }}
      />
    </Stack>
  );
};

const renderBasePrice = (value) => {
  return <Typography className={classes.productBasePrice}>{value}</Typography>;
};

const renderDiscountPercentage = (value) => {
  return (
    <Typography className={classes.discountPercentage}>
      {roundUpDiscountLessThanOne(value)}%
    </Typography>
  );
};

export default memo(ProductItem);
