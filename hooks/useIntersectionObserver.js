import { useCallback, useRef } from "react";

const useIntersectionObserver = ({
  isLoadingSearch = true,
  hasMorePage = false,
  callback = () => null,
}) => {
  const observer = useRef();

  const intersectionRef = useCallback(
    (node) => {
      if (isLoadingSearch) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMorePage) {
          callback();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoadingSearch, hasMorePage]
  );

  return { intersectionRef };
};

export default useIntersectionObserver;
