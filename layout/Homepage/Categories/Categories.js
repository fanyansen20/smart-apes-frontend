//React
import { useEffect, useState } from "react";

// Next JS
import Link from "next/link";

//Material UI
import { Grid, Skeleton } from "@mui/material";

//Components
import CategoryCard from "@components/card/CategoryCard/CategoryCard";

const Categories = ({ dataCategoryLevelOne }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    setLoadingCategories(true);
    const fetchCategories = async () => {
      dataCategoryLevelOne
        ? setCategories(dataCategoryLevelOne)
        : setCategories([]);
    };
    fetchCategories();
    setLoadingCategories(false);
  }, []);

  return (
    <Grid
      container
      spacing="10px"
      justifyContent="space-evenly"
      alignItems="center"
      sx={{ marginTop: "10px", marginBottom: "20px" }}
    >
      {loadingCategories || categories.length <= 0
        ? [...Array(8)].map((_, key) => (
            <Grid key={key} item md={3}>
              <Skeleton type="rectangular" width="100%" height={80} />
            </Grid>
          ))
        : categories.map((category, key) => (
            <Grid key={key} item md={3}>
              <Link href={`/category/${category.slug}`}>
                <a>
                  <CategoryCard
                    isComingSoon={category.is_coming_soon}
                    imageIcon={category.icon_menu_url}
                  >
                    {category.name}
                  </CategoryCard>
                </a>
              </Link>
            </Grid>
          ))}
    </Grid>
  );
};

export default Categories;
