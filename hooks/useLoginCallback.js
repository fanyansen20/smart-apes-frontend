import { useRouter } from "next/router";

const useLoginCallback = () => {
  const router = useRouter();

  /**
   * @param {string} path - path to navigate after successful login
   */
  const handleLoginCallback = (path = router?.asPath) => {
    router.push(`/login?callback=${encodeURIComponent(path)}`);
  };

  return handleLoginCallback;
};

export default useLoginCallback;
