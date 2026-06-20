import { useState } from "react";

const useHandlerChangeTitleName = () => {
  const [isOpenMenuItem, setIsOpenMenuItem] = useState(null);
  const [isGeneralSearch, setIsGeneralSearch] = useState(false);

  const handlerOpenUserMenu = (event) => {
    setIsOpenMenuItem(event.currentTarget);
  };

  const handlerCloseUserMenu = () => {
    setIsOpenMenuItem(null);
  };

  const handlerChangeTitleName = (nameSlug) => {
    setIsGeneralSearch(nameSlug !== "Smart Apes");

    setIsOpenMenuItem(null);
  };

  return {
    isGeneralSearch,
    setIsGeneralSearch,
    isOpenMenuItem,
    handlerChangeTitleName,
    handlerOpenUserMenu,
    handlerCloseUserMenu,
  };
};

export default useHandlerChangeTitleName;
