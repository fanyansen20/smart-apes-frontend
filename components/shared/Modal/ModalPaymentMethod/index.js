// Next
import Image from "next/image";

// MUI
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Modal,
  Typography,
} from "@mui/material";

// Assets
import PrimaryButton from "@components/shared/Button/PrimaryButton/PrimaryButton";
import TextButton from "@components/shared/Button/TextButton/TextButton";
import HitPay from "@public/assets/images/hitpay.png";
import Paypal from "@public/assets/images/paypal.png";

const ModalPaymentMethod = ({
  paymentMethods,
  dataCheckout,
  updatePayment,
  active,
  handleChoosePaymentMethod,
  isOpenModal,
  handleCloseModal,
}) => {
  return (
    <Modal
      onClose={handleCloseModal}
      open={isOpenModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="cardModal">
        <div className="headerModal">
          <Typography>Choose Payment Method</Typography>
          <Typography>
            Choose your Payment Method to complete the transaction.
          </Typography>
        </div>
        {paymentMethods?.map(
          (paymentMethod, key) =>
            paymentMethod.code === "hitpay" && (
              <Card
                key={key}
                className="cardContainer"
                style={{
                  backgroundColor: active === key && "#f9f9f9",
                  border: active === key && "1px solid #774bf0",
                }}
                onClick={() => handleChoosePaymentMethod(key, paymentMethod.id)}
              >
                <CardContent className="cardContent">
                  <Checkbox
                    checked={active === key}
                    disabled={active === key}
                  />
                  {paymentMethod.name == "PAYPAL" ? (
                    <Image src={Paypal} width={106} height={28} alt="logo" />
                  ) : (
                    <Image src={HitPay} width={106} height={28} alt="logo" />
                  )}
                  <div className="cardText">
                    <Typography>{paymentMethod.name} Payment Method</Typography>
                    <Typography>
                      Shipping Insurance Terms and Conditions are part of the
                      SMART APES Site/Application Terms and Conditions.
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            )
        )}

        <div className="buttonContainer">
          <PrimaryButton
            text="Confirm"
            disabled
            fullWidth
            onClick={() => updatePayment(dataCheckout)}
          />
          <TextButton text="Cancel" onClick={() => handleCloseModal()} />
        </div>
      </Box>
    </Modal>
  );
};

export default ModalPaymentMethod;
