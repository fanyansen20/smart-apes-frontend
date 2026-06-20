/**
 *
 * @param {{
 * isModalLogin : boolean
 * replaceUrl : () => ()
 * }}
 * @param props
 * @returns
 */

const useOpenModalLogin = ({ isModalLogin, replaceUrl }) => {
  /**
   * @param {{
   * callback : string
   * selectedContent : string
   * }} props
   */

  const handlerOpenModalLogin = ({
    callback = "",
    selectedContent = "",
  } = {}) => {
    const isCallback = !callback
      ? ""
      : `&callback=${encodeURIComponent(callback)}`;

    const queryLogin = !isModalLogin
      ? `?is-modal-login=true${isCallback}#${selectedContent}`
      : "";

    replaceUrl(`/profiling-test${queryLogin}`);
  };

  return handlerOpenModalLogin;
};

export default useOpenModalLogin;
