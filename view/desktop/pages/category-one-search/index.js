// React
import { useEffect } from "react";

// Next
import { useRouter } from "next/router";

const CategoryOneSearch = () => {
  const router = useRouter();
  const { slug1 } = router.query;

  useEffect(() => {
    router.push(`/category/${slug1}`);
  }, []);

  return <div></div>;
};

export default CategoryOneSearch;
