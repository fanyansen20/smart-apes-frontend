import { useRouter } from "next/router";
import { useState } from "react";

// Helper
import { convertToKebabCase } from "@helper/convertToKebabCase";

export const useSelectCategory = () => {
  const { query: queryParam } = useRouter();

  // #region useState
  const [isCollapseCategories, setIsCollapseCategories] = useState({
    [`${queryParam.cat}`]: true,
  });
  // #endregion

  // #region function
  const handlerCollapseCategories = (categories) => {
    const slugCategories = convertToKebabCase(categories);

    setIsCollapseCategories((prev) => ({
      ...prev,
      [slugCategories]: !isCollapseCategories[slugCategories],
    }));
  };

  const isActiveCategory = (param) => {
    return convertToKebabCase(param) === queryParam.subCat;
  };
  // #endregion

  return { isCollapseCategories, handlerCollapseCategories, isActiveCategory };
};
