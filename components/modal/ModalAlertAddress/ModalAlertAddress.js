// MUI
import {
  Button,
  Modal,
  Fade,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";

// NEXT
import Image from "next/image";

// Icon
import CloseIcon from "@mui/icons-material/Close";

// Image
import NoAddress from "@public/assets/images/no-address.png";
import AddIcon from "@mui/icons-material/Add";

const ModalAlertAddress = ({ closeModal, isOpen, openModalAddress }) => {
  return (
    <Modal open={isOpen} onClose={closeModal} closeAfterTransition>
      <Fade in={isOpen} className="containerModalAlertAddress">
        <Grid>
          <Grid container justifyContent="flex-end">
            <IconButton>
              <CloseIcon onClick={closeModal} />
            </IconButton>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={12} className="containerImageAlert">
              <Image
                src={NoAddress}
                layout="fill"
                objectFit="contain"
                alt="no address"
              />
            </Grid>
            <Grid item xs={8} className="contentContainer">
              <Typography variant="h6">Whoops!</Typography>
              <Typography variant="body2">
                You haven’t set your address. Please add your address for your
                better experience
              </Typography>
              <Button
                onClick={openModalAddress}
                variant="contained"
                startIcon={<AddIcon />}
              >
                Add New Address
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  );
};

export default ModalAlertAddress;
