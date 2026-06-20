// Next
import Image from "next/image";

// Mui
import {
  Button,
  Fade,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";

// Icon
import CloseIcon from "@mui/icons-material/Close";

// Images
import IllustrationSplitPackage from "@public/assets/images/illustration-splitted-package.png";

// Helper
import { convertSizeValue, formatCurrency } from "helper/checkValue";

const ModalSplitPackages = ({
  isOpenModal,
  handlerOpenModalSplitDelivery,
  updateDelivery,
}) => {
  return (
    <Modal open={isOpenModal.isOpen} closeAfterTransition>
      <Fade in={isOpenModal.isOpen} className="containerModalSplitPackages">
        <Grid>
          <Grid container>
            <Grid container justifyContent="flex-end" item sm={12}>
              <IconButton onClick={handlerOpenModalSplitDelivery}>
                <CloseIcon />
              </IconButton>
            </Grid>

            <Grid className="imageSplitPackage">
              <Image
                src={IllustrationSplitPackage}
                layout="fill"
                objectFit="contain"
                alt="illustration spilt package"
              />
            </Grid>

            <Grid container alignItems="center" direction="column">
              <Typography variant="h6">Package will be splitted</Typography>
              <Typography variant="body2">
                Your package will be splitted due to excessive weight. Here is
                the details of your package
              </Typography>

              <table>
                <thead>
                  <tr>
                    <th>Parcel Quantity</th>
                    <th>Package Size</th>
                    <th>Delivery Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {isOpenModal?.serviceData?.plans?.map((plan) => (
                    <tr key={plan.id}>
                      <td>{plan.packages.length}</td>
                      <td>{convertSizeValue(plan.name)}</td>
                      <td>{formatCurrency(plan.total_package_amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Button
                variant="contained"
                onClick={() => {
                  updateDelivery(
                    isOpenModal.deliveryData,
                    isOpenModal.serviceData
                  );
                  handlerOpenModalSplitDelivery();
                }}
              >
                Okay, Understand
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  );
};

export default ModalSplitPackages;
