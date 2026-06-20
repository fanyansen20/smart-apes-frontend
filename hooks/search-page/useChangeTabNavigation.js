// next js
import { useRouter } from "next/router";

const useChangeTabNavigation = () => {
  const { replace, query: params } = useRouter();

  /**
   * @param {'product' | 'store'} param
   * @param {string} className
   * @returns
   */
  const isActiveTab = (param, className) => {
    if (params?.tab === param) return className;
  };

  const changeTab = (tab) => {
    replace(`search?query=${params?.query}&tab=${tab}`);
  };

  return {
    isActiveTab,
    changeTab,
  };
};

export default useChangeTabNavigation;
