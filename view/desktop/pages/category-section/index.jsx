// React
import { useEffect } from "react";

// Next
import { useRouter } from "next/router";

const CategorySection = () => {
  const router = useRouter();
  const { slug1 } = router.query;

  useEffect(() => {
    router.push(`/category/${slug1}`);
  }, []);
};

export default CategorySection;
