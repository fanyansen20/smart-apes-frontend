import { Grid, Modal, Typography } from "@mui/material";

import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import TextButton from "@components/shared/Button/TextButton/TextButton";

const ModalConfirmationAlerts = ({
  titleModal = "This Title Header Modal Alert",
  dialogBox = "This dialog Modal Alert",
  onClick,
  closeModal,
  isOpen,
}) => {
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Grid
        container
        gap="10px"
        direction="column"
        className="containerModalConfirmAlert"
      >
        <Typography className="titleModalConfirmAlert">{titleModal}</Typography>
        <Typography className="dialogBoxModalConfirmAlert">
          {dialogBox}
        </Typography>
        <Grid container justifyContent="flex-end" gap="10px">
          <PrimaryButton onClick={onClick} fullWidth text="Submit" />
          <TextButton onClick={closeModal} fullWidth text="Cancel" />
        </Grid>
      </Grid>
    </Modal>
  );
};

export default ModalConfirmationAlerts;
