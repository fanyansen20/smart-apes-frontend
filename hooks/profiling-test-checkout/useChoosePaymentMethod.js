import { useEffect, useState } from "react";

const useChoosePaymentMethod = ({ paymentMethods, closeModal = false }) => {
  const [active, setActive] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentMethodId, setPaymentMethodId] = useState(null);

  useEffect(() => {
    autoSelectHitpay();
  }, []);

  const updatePaymentMethodName = async (paymentName = "") => {
    setPaymentMethod(paymentName);
    closeModal && closeModal();
  };

  const handleChoosePaymentMethod = (key, id) => {
    setActive(key);
    setPaymentMethodId(id);
  };

  const autoSelectHitpay = () => {
    const hitpayIndex = paymentMethods.findIndex(
      (item) => item.code === "hitpay"
    );

    handleChoosePaymentMethod(hitpayIndex, paymentMethods[hitpayIndex].id);
  };

  return {
    active,
    handleChoosePaymentMethod,
    paymentMethodId,
    paymentMethod,
    updatePaymentMethodName,
  };
};

export default useChoosePaymentMethod;
