import React, { memo, useEffect, useState } from "react";
import {
  styled,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
  TableCell,
  tableCellClasses,
  Tooltip,
  Alert,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import TextButton from "@components/shared/Button/TextButton/TextButton";
import AlertIcon from "@public/assets/icons/alert.svg";
import classes from "./_ManageVariantDetails.module.scss";
import Image from "next/image";
import ControlledInputNumber from "@components/shared/ControlledInputNumber";
import PictureIcon from "@public/assets/icons/picture.svg";

const StyledTableCell = styled(TableCell)(() => ({
  textAlign: "center",
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#F7F9FC",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderLeft: "1px solid rgba(224, 224, 224, 1)",
  },
}));

const StyledTableRow = styled(TableRow)(
  ({ lastVariantRowCell, tableRowSpan }) => ({
    // hide last row span border
    "th, td": (!lastVariantRowCell || tableRowSpan) && {
      borderBottom: 0,
    },
    "td > span:has(img)": {
      borderRadius: "8px",
      border: "1px solid #b0b0b0 !important",
    },
  })
);

function ManageVariantDetails({ open, handleClose, handleSubmit }) {
  const { control, watch, setValue } = useFormContext();
  const { selectedProductId, variantsData, quotaRemaining } = watch();
  const selectedVariantsItem = variantsData?.[selectedProductId] || [];
  const variantsIsEmpty = selectedVariantsItem
    .map((variant) => variant.details.map((detail) => detail.qty))
    .flat(2)
    .every((val) => !val);
  const allQtyList = selectedVariantsItem.map((variant) =>
    variant.details.map((detail) => detail.qty || 0)
  );
  const totalQtyVariants =
    allQtyList.length > 0
      ? allQtyList.flat().reduce((total, num) => total + num)
      : 0;
  const totalQuotaRemaining =
    quotaRemaining?.[selectedProductId] - totalQtyVariants;
  const [isAllQtyEmpty, setIsAllQtyEmpty] = useState(false);

  const getDisabledQtyMsgInfo = (variantDetail) => {
    if (!variantDetail?.stock) {
      return "This variant is out of stock";
    }

    if (!totalQuotaRemaining && !variantDetail?.qty) {
      return "Total quantity of selected variants is already at the maximum quota";
    }
  };

  const onSubmit = () => {
    if (totalQtyVariants > 0) {
      handleSubmit();
      setIsAllQtyEmpty(false);
    } else {
      setIsAllQtyEmpty(true);
    }
  };

  const onClose = () => {
    setIsAllQtyEmpty(false);
    handleClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={onClose}
      className={classes.manageVariantDetailsDialog}
    >
      <DialogTitle className={classes.dialogTitle}>Choose Variant</DialogTitle>
      <DialogContent>
        <Stack direction="column" spacing={3}>
          {/* Quota Info Section */}
          <Stack direction="row" spacing={0.9}>
            <Typography>Quota Remaining</Typography>
            <Typography className={classes.quotaNumber}>
              {totalQuotaRemaining}
            </Typography>
          </Stack>

          {/* Choose Variants Table Section */}
          <Stack direction="column" spacing={1}>
            <Typography>Please choose the specific product</Typography>
            <TableContainer
              sx={{
                borderRadius: 2,
              }}
              component={Paper}
              variant="outlined"
            >
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell width="25%">Image</StyledTableCell>
                    {selectedVariantsItem?.[0]?.variantComboName?.map(
                      (variantName) => (
                        <StyledTableCell key={variantName} width="18%">
                          {variantName}
                        </StyledTableCell>
                      )
                    )}
                    <StyledTableCell width="18%">
                      Discount Price
                    </StyledTableCell>
                    <StyledTableCell width="21%">Quantity</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedVariantsItem.map((variant, variantIdx) => (
                    <>
                      <StyledTableRow
                        lastVariantRowCell
                        tableRowSpan={
                          variantIdx + 1 === selectedVariantsItem.length
                        }
                      >
                        <StyledTableCell rowSpan={variant.details.length + 1}>
                          {variant?.imageProduct ? (
                            <Image
                              src={variant?.imageProduct || PictureIcon}
                              alt={variant?.firstVariant}
                              width={150}
                              height={150}
                              objectFit="contain"
                            />
                          ) : (
                            <Paper
                              sx={{
                                display: "inline-flex",
                                width: 150,
                                height: 150,
                                borderRadius: 2,
                                border: "1px solid #b0b0b0",
                                justifyContent: "center",
                              }}
                              variant="outlined"
                            >
                              <Stack
                                spacing={1.5}
                                direction="column"
                                alignSelf="center"
                                justifySelf="center"
                              >
                                <Image
                                  src={PictureIcon}
                                  alt={variant?.firstVariant}
                                  width={40}
                                  height={40}
                                  objectFit="contain"
                                />
                                <Typography
                                  sx={{ userSelect: "none" }}
                                  variant="subtitle"
                                >
                                  No Picture
                                </Typography>
                              </Stack>
                            </Paper>
                          )}
                        </StyledTableCell>
                        <StyledTableCell rowSpan={variant.details.length + 1}>
                          {variant.firstVariant}
                        </StyledTableCell>
                      </StyledTableRow>
                      {variant.variantComboName.length > 1 ? (
                        variant.details.map((detail, detailIdx) => (
                          <StyledTableRow
                            key={detail.secondVariant}
                            lastVariantRowCell={
                              detailIdx + 1 === variant.details.length
                            }
                            tableRowSpan={
                              variantIdx + 1 === selectedVariantsItem.length
                            }
                          >
                            <StyledTableCell>
                              {detail.secondVariant}
                            </StyledTableCell>
                            <StyledTableCell>
                              <Stack
                                display="inline-flex"
                                direction="row"
                                spacing={1}
                              >
                                <Typography
                                  sx={{ textDecoration: "line-through" }}
                                  variant="caption"
                                >
                                  {detail.basePrice}
                                </Typography>
                                <Typography variant="subtitle">
                                  {detail.finalPrice}
                                </Typography>
                              </Stack>
                            </StyledTableCell>
                            <StyledTableCell>
                              <Tooltip
                                title={getDisabledQtyMsgInfo(detail)}
                                placement="top"
                                arrow
                              >
                                <div>
                                  <ControlledInputNumber
                                    sx={{ width: "60%" }}
                                    name={`variantsData.${selectedProductId}.${variantIdx}.details.${detailIdx}.qty`}
                                    control={control}
                                    onChange={(_d, numValue) => {
                                      // Save Previous Variants Qty Data
                                      if (numValue) {
                                        setValue(
                                          "defaultVariantsData",
                                          variantsData
                                        );
                                      }
                                    }}
                                    isAllowed={(values) => {
                                      const totalCurrentQty =
                                        allQtyList
                                          .flat()
                                          .reduce((total, num) => total + num) -
                                        allQtyList[variantIdx][detailIdx] +
                                        (values.floatValue || 0);

                                      return (
                                        totalCurrentQty <= detail.stock &&
                                        totalCurrentQty <=
                                          quotaRemaining?.[selectedProductId]
                                      );
                                    }}
                                    allowNegative={false}
                                    error={isAllQtyEmpty}
                                    disabled={
                                      (!detail.stock || !totalQuotaRemaining) &&
                                      !detail?.qty
                                    }
                                  />
                                </div>
                              </Tooltip>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))
                      ) : (
                        <StyledTableRow
                          lastVariantRowCell
                          tableRowSpan={
                            variantIdx + 1 === selectedVariantsItem.length
                          }
                        >
                          <StyledTableCell>
                            <Stack
                              display="inline-flex"
                              direction="row"
                              spacing={1}
                            >
                              <Typography
                                sx={{ textDecoration: "line-through" }}
                                variant="caption"
                              >
                                {
                                  selectedVariantsItem?.[variantIdx]
                                    ?.details?.[0]?.basePrice
                                }
                              </Typography>
                              <Typography variant="subtitle">
                                {
                                  selectedVariantsItem?.[variantIdx]
                                    ?.details?.[0]?.finalPrice
                                }
                              </Typography>
                            </Stack>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Tooltip
                              title={getDisabledQtyMsgInfo(variant.details[0])}
                              placement="top"
                              arrow
                            >
                              <div>
                                <ControlledInputNumber
                                  sx={{ width: "60%" }}
                                  name={`variantsData.${selectedProductId}.${variantIdx}.details.${0}.qty`}
                                  control={control}
                                  onChange={(_d, numValue) => {
                                    // Save Previous Variants Qty Data
                                    if (numValue) {
                                      setValue(
                                        "defaultVariantsData",
                                        variantsData
                                      );
                                    }
                                  }}
                                  isAllowed={(values) => {
                                    const totalCurrentQty =
                                      allQtyList
                                        .flat()
                                        .reduce((total, num) => total + num) -
                                      allQtyList[variantIdx][0] +
                                      (values.floatValue || 0);

                                    return (
                                      totalCurrentQty <=
                                        variant.details[0].stock &&
                                      totalCurrentQty <=
                                        quotaRemaining?.[selectedProductId]
                                    );
                                  }}
                                  allowNegative={false}
                                  error={isAllQtyEmpty}
                                  disabled={
                                    (!variant.details[0].stock ||
                                      !totalQuotaRemaining) &&
                                    !variant.details[0]?.qty
                                  }
                                />
                              </div>
                            </Tooltip>
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>

          {/* Chosen Variants Table Section */}
          <TableContainer
            sx={{
              borderRadius: 2,
            }}
            component={Paper}
            variant="outlined"
          >
            <Table aria-label="customized table">
              <TableHead>
                <StyledTableCell width="33%">Variant</StyledTableCell>
                <StyledTableCell width="33%">Quantity</StyledTableCell>
                <StyledTableCell width="33%">Price</StyledTableCell>
              </TableHead>
              <TableBody>
                {selectedVariantsItem.map((variant) =>
                  variant.details.map(
                    (variantDetail) =>
                      variantDetail.qty > 0 && (
                        <StyledTableRow lastVariantRowCell>
                          <StyledTableCell>
                            {`${variant.firstVariant}${
                              variant.variantComboName.length > 1
                                ? `, ${variantDetail.secondVariant}`
                                : ""
                            }`}
                          </StyledTableCell>
                          <StyledTableCell>{variantDetail.qty}</StyledTableCell>
                          <StyledTableCell>
                            {variantDetail.finalPrice}
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                  )
                )}
                {variantsIsEmpty && (
                  <Typography
                    p={1.25}
                    colSpan={3}
                    component="th"
                    fontWeight={600}
                    className="disabledText"
                  >
                    No Variant Selected
                  </Typography>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Alert Section */}
          <Paper variant="outlined" className={classes.noteInfo}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Image
                src={AlertIcon}
                width="23px"
                height="23px"
                alt="alert icon"
              />
              <Typography className={classes.noteMsg}>
                Please be aware of the product stock before placing your order.
                Contact the seller to ask the stock.
              </Typography>
            </Stack>
          </Paper>

          {isAllQtyEmpty && (
            <Alert
              classes={{
                root: classes.errorInfo,
                icon: classes.errorIcon,
              }}
              severity="error"
            >
              You haven&apos;t select any variant yet
            </Alert>
          )}

          {/* Buttons Section */}
          <Stack direction="row" spacing={1}>
            <TextButton fullWidth onClick={onClose}>
              Cancel
            </TextButton>
            <PrimaryButton fullWidth onClick={onSubmit}>
              Submit
            </PrimaryButton>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default memo(ManageVariantDetails);
