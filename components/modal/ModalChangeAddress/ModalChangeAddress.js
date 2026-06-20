// Components
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import SecondaryButton from "@components/shared/Button/SecondaryButton/SecondaryButton";

// MUI
import { Button, Fade, Grid, Modal, Typography } from "@mui/material";

// helper
import { parsePhoneNumber } from "awesome-phonenumber";

const ModalChangeAddress = ({
  chooseAddress,
  closeModal,
  dataAddress,
  isBorder,
  open,
  submitHandler,
}) => {
  return (
    <Modal open={open} onClose={closeModal} closeAfterTransition>
      <Fade in={open} className="containerModalChangesAddress">
        <Grid>
          <Grid className="headerContentChangeAddress">
            <Typography variant="h6">Change Address</Typography>
            <Typography variant="body2">
              Change the delivery address or add new one.
            </Typography>
          </Grid>

          {dataAddress.map((item, key) => (
            <Grid
              key={key}
              className={
                isBorder == item.id ? "cardAddressActive" : "cardAddress"
              }
              container
              justifyContent="center"
              spacing={1.8}
              onClick={() => chooseAddress(item.id)}
            >
              <Grid item md={12}>
                <Button className="btn_location">{item.name}</Button>
                {item.is_default && (
                  <Button className="btn_address_primary">Primary</Button>
                )}
              </Grid>

              <Grid item md={6}>
                <Typography variant="body2">Recipient</Typography>
                <Typography variant="subtitle2">
                  {item.receiver_name}
                </Typography>
              </Grid>

              <Grid item md={5}>
                <Typography variant="body2">Phone Number</Typography>
                <Typography variant="subtitle2">
                  {parsePhoneNumber(item.receiver_phone)?.valid
                    ? parsePhoneNumber(item.receiver_phone)?.number
                        ?.international
                    : item.receiver_phone}
                </Typography>
              </Grid>

              <Grid item md={6}>
                <Typography variant="body2">Full Address</Typography>
                <Typography variant="subtitle2">
                  {item.address_detail}, {item.postal_code}
                </Typography>
              </Grid>

              <Grid item md={5}>
                <Typography variant="body2">Country</Typography>
                <Typography variant="subtitle2">{item.country_name}</Typography>
              </Grid>
            </Grid>
          ))}

          <Grid className="containerButtonSubmit">
            <PrimaryButton
              text="Submit"
              fullWidth
              onClick={() => submitHandler(isBorder)}
            />
            <SecondaryButton text="Cancel" fullWidth onClick={closeModal} />
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  );
};

export default ModalChangeAddress;
