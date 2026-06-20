// react
import { useEffect, useState } from "react";

const useChangeQuantity = ({ basePrice = 0 }) => {
  const [quantity, setQuantity] = useState(1);
  const [subTotal, setSubTotal] = useState(basePrice);

  const incrementHandler = () => {
    setSubTotal((prev) => prev + basePrice);
    setQuantity((prev) => prev + 1);
  };

  const decrementHandler = () => {
    setSubTotal((prev) => prev - basePrice);
    setQuantity((prev) => prev - 1);
  };

  const changeQuantity = (e) => {
    const type = e.type;

    const isNumber = /^[0-9]*$/;

    const newQuantity = isNumber.test(e.target.value)
      ? Number(e.target.value)
      : quantity;

    if (type === "blur") {
      if (!quantity || !newQuantity) {
        setQuantity(1);
        setSubTotal(basePrice);
      }
      return;
    }

    setSubTotal(newQuantity * basePrice);
    setTimeout(() => {
      setQuantity(newQuantity);
    }, 50);
  };

  useEffect(() => {
    if (basePrice) setSubTotal(basePrice);
  }, [basePrice]);

  return {
    quantity,
    subTotal,
    changeQuantity,
    incrementHandler,
    decrementHandler,
  };
};

export default useChangeQuantity;
