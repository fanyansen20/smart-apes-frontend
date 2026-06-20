// React
import React from "react";
import { useFormContext } from "react-hook-form";

// Redux
import { useSelector } from "react-redux";

// Next
import Image from "next/image";

// Components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";

// MUI Components
import {
  Dialog,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";

// Images
import IllustrationSplitPackage from "@public/assets/images/illustration-splitted-package.svg";

// Styles
import { convertSizeValue, formatCurrency } from "@helper/checkValue";
import classes from "./PackageDetails.module.scss";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#EFF8FF",
    borderBottom: 0,
    padding: 10,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "#FAFAFA",
    padding: 10,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "& td, & th": {
    border: 0,
  },
}));

const tableColumns = ["Parcel Quantity", "Package Size", "Delivery Fee"];

function PackageDetails() {
  const { watch, setValue } = useFormContext();
  const {
    isOpenPackageDetails,
    selectedDeliveryOptionsShopId,
    selectedDeliveryServicesByShop,
  } = watch();
  const {
    data: deliveryServicesByShopIdData,
    loading: isLoadingGetDeliveryServicesByShopId,
  } = useSelector((state) => state.getDeliveryServicesByShopId);

  const handleClose = () => {
    setValue("isOpenPackageDetails", false);
  };

  const deliveryServices = deliveryServicesByShopIdData
    .map((delivery) => delivery?.services)
    .flat();

  const productsShopById =
    selectedDeliveryServicesByShop?.[selectedDeliveryOptionsShopId];

  const deliveryServicePlans = deliveryServices?.find(
    (service) => service?.id === productsShopById?.serviceId
  )?.plans;

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={isOpenPackageDetails}
      onClose={handleClose}
      classes={{
        paper: classes.packageDetailsDialog,
      }}
    >
      <Stack
        className={classes.packageDetailsContent}
        direction="column"
        alignItems="center"
        gap={2}
      >
        <Image
          alt="Splitted Ninja Van Packages"
          src={IllustrationSplitPackage}
        />

        <Typography className={classes.contentTitle}>
          Package will be split
        </Typography>

        <Typography className={classes.contentDesc}>
          Your package will be splited due to excessive weight. Here is the
          details of your package
        </Typography>

        {isLoadingGetDeliveryServicesByShopId ? (
          <Skeleton variant="rounded" width={303} height={105} />
        ) : (
          <TableContainer component={Paper} elevation={0}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  {tableColumns.map((column) => (
                    <StyledTableCell key={column} align="center">
                      <Typography className={classes.contentLabel}>
                        {column}
                      </Typography>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {deliveryServicePlans?.map((plan) => (
                  <StyledTableRow key={plan.id}>
                    <StyledTableCell align="center">
                      <Typography className={classes.contentValue}>
                        {plan.packages.length}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography className={classes.contentValue}>
                        {convertSizeValue(plan.name)}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography className={classes.contentValue}>
                        {formatCurrency(plan.total_package_amount)}
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <PrimaryButton
          fullWidth
          text="Okay, Understand"
          onClick={handleClose}
        />
      </Stack>
    </Dialog>
  );
}

export default PackageDetails;
