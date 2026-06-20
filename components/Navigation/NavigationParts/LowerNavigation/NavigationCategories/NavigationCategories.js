//React
import { useEffect, useState } from "react";

//Material UI
import { Masonry } from "@mui/lab";
import { CircularProgress, Grid, Typography } from "@mui/material";

//NEXT
import Image from "next/image";
import Link from "next/link";

// component
import { SkeletonCategoryMenu } from "@components/shared/Skeleton/skeletonCategoryMenu";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesData } from "store/reducer/categories/categoriesSlice";

// TODO : category level 1
const Category = ({ link, closeHandler, children, isComingSoon }) => {
  return (
    <Link href={"/category/" + link} passHref>
      <a>
        <Grid
          container
          justifyContent="space-between"
          className="categoryDiv"
          onClick={() => closeHandler(null)}
        >
          <Typography className="categoryText">{children}</Typography>
          {isComingSoon && (
            <div className="coming-soon-banner">
              <Typography>COMING</Typography>
              <Typography>SOON!</Typography>
            </div>
          )}
        </Grid>
      </a>
    </Link>
  );
};

// TODO : category level 2 and 3
const SubCategory = ({
  categories,
  children,
  closeHandler,
  link,
  imageIconMenu,
}) => {
  const childCategories = categories?.children?.filter((category) => {
    return category.slug;
  });

  const isMasonry = (pathSlug) => {
    if (
      pathSlug === "education-materials/past-year-papers" ||
      pathSlug === "e-books/e-reader"
    )
      return "orderToOne";
    if (pathSlug === "education-materials/education-oral") return "orderToTwo";
    if (pathSlug === "education-materials/education-readers")
      return "orderToFour";

    return "";
  };

  return (
    <div className="subDiv" onClick={() => closeHandler(null)}>
      <Link href={"/category/" + link} passHref>
        <a>
          <div className="subCategoryDiv">
            <Image
              width="50px"
              height="50px"
              src={imageIconMenu}
              alt={children}
            />
            <Typography
              className="subCategoryText"
              onClick={() => closeHandler(null)}
            >
              {children}
            </Typography>
          </div>
        </a>
      </Link>

      <Masonry columns={5} spacing={2} className="containerCategoryNextLevel">
        {childCategories.map((category, key) => (
          <div key={key} className={`${isMasonry(category.path_slug)}`}>
            {/* category level two */}
            <Link href={`/category/${link}/${category.slug}`} passHref>
              <a>
                <Typography
                  style={{
                    background:
                      (key === 1 && "#84CAFF") ||
                      (key === 2 && "#FFB84C") ||
                      (key === 3 && "#F97066") ||
                      (key === 4 && "#32D583") ||
                      (key === 5 && "#85DFF3") ||
                      (key === 6 && "#82AAE3") ||
                      (key === 7 && "#BC3CE9") ||
                      (key === 8 && "#10A19D") ||
                      (key === 9 && "#8BBCCC"),
                  }}
                  className="labelCategoryLevelTwo"
                >
                  {category.display_string}
                </Typography>
              </a>
            </Link>

            {/* Category level three */}
            {category?.children?.map((item, key) => (
              <Link
                href={`/category/${link}/${category.slug}/${item.slug}`}
                passHref
                key={key}
              >
                <a>
                  <Typography className="LabelCategoryLevelThree">
                    {item.display_string}
                  </Typography>
                </a>
              </Link>
            ))}
          </div>
        ))}
      </Masonry>
    </div>
  );
};

const NavigationCategories = ({ closeModalCategory }) => {
  const dispatch = useDispatch();
  const categoriesData = useSelector((store) => store.categories);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [isLoadCategories, setIsLoadCategories] = useState(false);

  useEffect(() => {
    setIsLoadCategories(categoriesData.isLoading);
    if (categoriesData.dataCategories === "") {
      dispatch(getCategoriesData());
    } else {
      setCategories(categoriesData.dataCategories.data);
      setSubCategories([categoriesData.dataCategories?.data[0]]);
    }
  }, [categoriesData]);

  const hoverHandler = (slug) => {
    const sub_categories = categories.filter((category) => {
      return category.slug === slug;
    });
    setSubCategories(sub_categories);
  };

  return (
    <Grid
      container
      maxWidth="xl"
      className="categoriesContainer"
      onMouseLeave={closeModalCategory}
    >
      <Grid item md={2.5} className="parentCategories">
        <div className="parentCategoriesDiv">
          <div className="categoryContainer">
            {isLoadCategories
              ? [...Array(7)].map((_, index) => (
                  <SkeletonCategoryMenu key={index} />
                ))
              : categories?.map((category, key) => (
                  <div
                    onMouseEnter={() => hoverHandler(category.slug)}
                    key={key}
                  >
                    <Category
                      key={key}
                      closeHandler={closeModalCategory}
                      link={category.slug}
                      isComingSoon={category.is_coming_soon}
                    >
                      {category.display_string}
                    </Category>
                  </div>
                ))}
          </div>
        </div>
      </Grid>

      <Grid item md={9.5}>
        <div className="subCategories">
          {isLoadCategories ? (
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress sx={{ color: "#BC3CE9" }} />
            </p>
          ) : (
            subCategories.map((category, key) => (
              <SubCategory
                key={key}
                link={category.slug}
                categories={category}
                imageIconMenu={category.icon_menu_url}
                slug={category.slug}
                closeHandler={closeModalCategory}
              >
                <Typography>{category.display_string}</Typography>
              </SubCategory>
            ))
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default NavigationCategories;
