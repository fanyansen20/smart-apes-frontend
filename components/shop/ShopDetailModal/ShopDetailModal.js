// Helper
import { htmlParser } from "@helper/htmlParser";

//MUI
import { Modal, Fade, Box, Backdrop, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ShopDetailModal = ({ open, handleClose, shopName, description }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade className="shopDetailModal" in={open}>
        <Box>
          <div className="modalHeader">
            <p>About {shopName}</p>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="modalContent">
            {description && htmlParser(description)}
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ShopDetailModal;
