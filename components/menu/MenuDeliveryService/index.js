// Mui
import {
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";

// Icon
import InfoIcon from "@mui/icons-material/Info";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Helper
import { formatCurrency } from "helper/checkValue";

// Components
import { memo } from "react";
import TooltipSplitDelivery from "./TooltipSplitDelivery";

/**
 * @param {{
 * open : boolean
 * shop : Object
 * dataDeliveryServices : [{}]
 * handlerOpenMenuDelivery : () => void
 * handlerOpenModalSplitDelivery : () => void
 * updateDelivery : (string, string) => void
 * isBundlesExist : boolean
 * isLoadOpenMenu : boolean
 * isLoadDelivery : boolean
 * isOutOfStockBundles  : boolean
 * isOutOfQuotaBundles  : boolean
 * isInactiveProductBundles  : boolean
 * }} props
 * @returns
 */

const MenuDeliveryService = ({
  open,
  shop,
  dataDeliveryServices,
  deliveryData,
  updateDelivery,
  closeModal,
  handlerOpenModalSplitDelivery,
  handlerOpenMenuDelivery,
  isBundlesExist,
  isLoadOpenMenu,
  isLoadDelivery,
  isOutOfStockBundles,
  isOutOfQuotaBundles,
  isInactiveProductBundles,
}) => {
  /**
   *
   * @param {number | boolean} totalPackages
   * @param {string} serviceName
   */
  const countParcels = (totalPackages, serviceName) => {
    if (serviceName !== "Flat Price") return "( 1 Parcels )";

    if (totalPackages) return `( ${totalPackages} Parcels )`;

    return null;
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-end"
      item
      sm={4}
      className="additionalButtons"
    >
      <Grid>
        <Typography className="deliveryText">Delivery</Typography>

        {isLoadDelivery ? (
          <Skeleton width={200} height={80} />
        ) : (
          <Button
            name="shopId"
            value={shop}
            disableRipple
            className={
              !deliveryData[shop.id] ? "deliverySelect" : "deliverySelectTrue"
            }
            onClick={(e) => handlerOpenMenuDelivery(e, shop)}
            endIcon={<KeyboardArrowDownIcon />}
            disabled={
              isBundlesExist &&
              (isOutOfStockBundles ||
                isOutOfQuotaBundles ||
                isInactiveProductBundles)
            }
          >
            {!deliveryData[shop.id] ? (
              "Choose Delivery"
            ) : (
              <div className="optionDelivery">
                <div>
                  <Typography className="nameCompany">
                    {deliveryData[shop.id].companyName}
                  </Typography>
                  <Grid container>
                    <Typography className="nameService">
                      {deliveryData[shop.id]?.serviceName >= 17
                        ? deliveryData[shop.id].serviceName.substring(0, 17) +
                          "..."
                        : deliveryData[shop.id].serviceName}
                    </Typography>
                    <Typography className="deliveryFee">
                      &nbsp;
                      {formatCurrency(deliveryData[shop.id].deliveryFee)}
                    </Typography>

                    <Typography className="deliveryFee">
                      &nbsp;
                      {countParcels(
                        deliveryData[shop.id].totalPackagesSplit,
                        deliveryData[shop.id].serviceName
                      )}
                    </Typography>
                  </Grid>
                </div>
              </div>
            )}
          </Button>
        )}

        <Menu
          anchorEl={open}
          open={open}
          onClose={closeModal}
          closeAfterTransition
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          className="containerModalDelivery"
        >
          <Grid className="menuItem">
            {isLoadOpenMenu && (
              <MenuItem
                className="optionDelivery"
                style={{ pointerEvents: "none" }}
              >
                <Grid container direction="row">
                  {[...Array(4)].map((_, index) => (
                    <Typography key={index} className="nameCompany">
                      <Skeleton variant="text" width="90%" height={30} />
                    </Typography>
                  ))}
                </Grid>
              </MenuItem>
            )}

            {!isLoadOpenMenu && (
              <>
                <Typography className="optionHeaderDelivery">
                  Choose Delivery
                </Typography>

                {dataDeliveryServices?.length === 0 && (
                  <Typography className="optionHeaderDelivery">
                    No current delivery
                  </Typography>
                )}

                {dataDeliveryServices?.map(
                  (delivery) =>
                    delivery &&
                    delivery?.services?.length !== 0 &&
                    delivery?.services?.map((service) => (
                      <MenuItem key={service.id} className="optionDelivery">
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          onClick={() =>
                            service?.is_split
                              ? handlerOpenModalSplitDelivery(delivery, service)
                              : updateDelivery(delivery, service)
                          }
                        >
                          <Grid item sm={12}>
                            <Typography className="nameCompany">
                              {delivery.name}
                            </Typography>
                          </Grid>
                          <Typography className="nameService">
                            {service.name}
                          </Typography>
                          <Typography className="deliveryService">
                            &nbsp;
                            {formatCurrency(
                              service.total_delivery_fee ?? service.price
                            )}
                            &nbsp;
                          </Typography>
                          {service?.is_split && (
                            <>
                              <Typography className="deliveryService">
                                (&nbsp;
                                {service.plans
                                  .map((plan) => plan.packages.length)
                                  .reduce((a, b) => a + b)}
                                &nbsp; Parcels )
                              </Typography>
                              <Tooltip
                                arrow={true}
                                title={
                                  <TooltipSplitDelivery
                                    dataPackagesSplitDelivery={service.plans}
                                  />
                                }
                                placement="right"
                                className="deliveryService"
                              >
                                <IconButton>
                                  <InfoIcon sx={{ fontSize: "16px" }} />
                                </IconButton>
                              </Tooltip>
                            </>
                          )}
                        </Grid>
                      </MenuItem>
                    ))
                )}
              </>
            )}
          </Grid>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default memo(MenuDeliveryService);
