// React
import React, { memo } from "react";

// Material UI
import { Button, TextField } from "@mui/material";

/**
 * @param {{
 * decrementHandler: () => void
 * incrementHandler: () => void
 * onChange: () => void
 * value: number
 * minQty?: number
 * stock: number
 * }} props
 * @returns
 */
const QuantityButton = ({
  decrementHandler,
  incrementHandler,
  onChange,
  value = 1,
  minQty = 1,
  stock = 10,
}) => {
  const stockProduct = stock;

  const cloneEventObj = (eventObj, overrideObj) => {
    if (!overrideObj) {
      overrideObj = {};
    }

    function EventCloneFactory(overProps) {
      for (var x in overProps) {
        this[x] = overProps[x];
      }
    }

    EventCloneFactory.prototype = eventObj;

    return new EventCloneFactory(overrideObj);
  };

  const handleChangeOnBlur = (e) => {
    const value = Number(e.target.value);

    if (value <= stockProduct && value >= minQty) {
      onChange(e);
    } else {
      const newEvent = cloneEventObj(e, {
        target: { value: minQty },
      });
      onChange(newEvent);
    }
  };

  const handleMoveCaretToEnd = (e) => {
    const { value } = e.target;
    const position = value.length;
    e.target.setSelectionRange(position, position);
  };

  return (
    <div className="quantityInputBtn">
      <Button
        disabled={value <= minQty}
        className="buttonQty"
        onClick={decrementHandler}
      >
        -
      </Button>

      <TextField
        className="numberInput"
        value={value}
        onChange={(e) => Number(e.target.value) <= stockProduct && onChange(e)}
        onClick={handleMoveCaretToEnd}
        onBlur={handleChangeOnBlur}
      />

      <Button
        disabled={value >= stockProduct}
        className="buttonQty"
        onClick={incrementHandler}
      >
        +
      </Button>
    </div>
  );
};

export default memo(QuantityButton);
