// next js
import Image from "next/image";
import { useState } from "react";

// component
import ModalPaymentMethod from "@components/shared/Modal/ModalPaymentMethod";

// styles
import classes from "./_PaymentMethodSection.module.scss";

// assets
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HitpayLogo from "@public/assets/images/hitpay.png";

// hooks
import useChoosePaymentMethod from "@hooks/profiling-test-checkout/useChoosePaymentMethod";

const PaymentMethodSection = ({ paymentChooseMethod, paymentMethods }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { active, handleChoosePaymentMethod } = useChoosePaymentMethod({
    paymentMethods,
    closeModal: handleCloseModal,
  });

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  return (
    <>
      <div className={classes.PaymentMethodSection}>
        <h2>Payment Method</h2>
        <div onClick={handleOpenModal} fullWidth className={classes.paymentBtn}>
          <div className={classes.paymentMethod}>
            <Image src={HitpayLogo} alt="hitpay logo" width={120} height={30} />
            <p>{paymentChooseMethod ?? "Choose"} Payment Method</p>
            <ArrowForwardIosIcon sx={{ color: "black" }} />
          </div>
        </div>
      </div>

      <ModalPaymentMethod
        paymentMethods={paymentMethods}
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
        handleChoosePaymentMethod={handleChoosePaymentMethod}
        active={active}
      />
    </>
  );
};

export default PaymentMethodSection;
