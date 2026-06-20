import { useState } from "react";

/**
 *
 * @param {{
 * isOpenModalAddChild : boolean
 * }} props
 */

const useHandlerModalCHild = ({ isOpenModalAddChild }) => {
  const [childSelected, setChildSelected] = useState({});

  const [isModalAssign, setIsModalAssign] = useState(false);
  const [isModalAddChild, setIsModalAddChild] = useState(false);

  const handlerSelectChild = (idChild, pendingBasic) => {
    setChildSelected({
      childId: idChild,
      pendingBasicData: pendingBasic,
    });
  };

  const handlerOpenModalAssignChild = () => setIsModalAssign(true);
  const handlerCloseModalAssignChild = () => setIsModalAssign(false);

  const handlerCloseModalAddChild = () => {
    if (isOpenModalAddChild) {
      return setIsModalAddChild(false);
    }

    setIsModalAddChild(false);
    setIsModalAssign(true);
  };

  const handlerOpenModalAddChild = () => {
    setIsModalAddChild(true);
    setIsModalAssign(false);
  };

  return {
    isModalAssign,
    isModalAddChild,
    childSelected,
    handlerOpenModalAssignChild,
    handlerCloseModalAssignChild,
    handlerCloseModalAddChild,
    handlerOpenModalAddChild,
    handlerSelectChild,
  };
};

export default useHandlerModalCHild;
