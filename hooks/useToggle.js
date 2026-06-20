import { useState } from "react";

const useToggle = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((current) => !current);
  };

  return [open, toggle];
};

export default useToggle;
