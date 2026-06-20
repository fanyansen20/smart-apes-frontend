// Next js
import Image from "next/image";

// Mui
import { Fade, Grid, IconButton, Modal, Typography } from "@mui/material";

// Icon
import CloseIcon from "@mui/icons-material/Close";

// Components
import ShareButtons from "./ShareButtons";

const ModalShareProduct = ({
  isOpen,
  isBundle,
  closeModal,
  shareImage,
  shareName,
  linkShare,
}) => {
  const bundleText = isBundle && "Bundle";

  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Fade in={isOpen} className="container-modal-share-product">
        <Grid container alignItems="center">
          <Grid item md={12} container>
            <Grid
              item
              container
              alignItems="center"
              justifyContent="center"
              md={11}
            >
              <Typography variant="h6">Share Product {bundleText}</Typography>
            </Grid>

            <Grid item md={1}>
              <IconButton>
                <CloseIcon onClick={closeModal} />
              </IconButton>
            </Grid>
          </Grid>

          <Grid
            container
            item
            md={12}
            justifyContent="center"
            alignContent="center"
          >
            <Grid
              container
              className="product-content"
              alignItems="center"
              gap="12px"
            >
              <Grid item md={2} className="share-product-image">
                <Image
                  src={shareImage}
                  alt="product image"
                  layout="fill"
                  objectFit="contain"
                />
              </Grid>
              <Grid item md={9}>
                <Typography className="share-product-name">
                  {shareName?.length >= 40
                    ? shareName?.substring(0, 40) + "..."
                    : shareName}
                </Typography>
                <Typography className="share-product-link">
                  Smartapes.link
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid md={12}>
            <Grid>
              <Typography className="title-share-product">
                Share Product {bundleText} with
              </Typography>
            </Grid>

            <Grid
              container
              justifyContent="space-around"
              alignItems="center"
              sx={{ marginTop: "10px" }}
            >
              <ShareButtons linkShare={linkShare} />
            </Grid>
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  );
};

export default ModalShareProduct;
