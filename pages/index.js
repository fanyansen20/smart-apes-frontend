// React
import { useEffect } from "react";

import View from "view";
import getCategories from "./api/dataCategory/getCategories";

// Redux
import { useDispatch } from "react-redux";
import { isLayout } from "store/reducer/layout/layoutSlice";

// Cookie
import { setCookie } from "cookies-next";

const Homepage = ({ device, ...otherProps }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLayout({ isNavbar: true, isFooter: true }));

    if (window.location.host === process.env.NEXT_PUBLIC_MARKET_PLACE_URL) {
      setCookie(
        "next-auth.callback-url",
        process.env.NEXT_PUBLIC_MARKET_PLACE_URL,
        {
          domain: "smartapes.sg",
        }
      );
    }
  }, []);

  return <View {...otherProps} device={device} path="home" />;
};

export async function getServerSideProps() {
  const dataCategories = await getCategories({
    orderLevel: 1,
    pretty: true,
  });

  const idTopProductPromotions =
    dataCategories
      ?.filter((category) => {
        if (category.is_top_category) return category;
      })
      .map((category) => {
        return {
          idCategory: category.id,
          slugCategory: category.slug,
          nameCategory: category.display_string,
        };
      }) || [];

  return { props: { dataCategories, idTopProductPromotions } };
}

export default Homepage;
