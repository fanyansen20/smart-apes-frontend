// Next
import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

// Helper
import API from "@helper/apiHelper";
import {
  setIsLoadingSearch,
  setIsReset,
} from "store/reducer/search/searchSlice";
import useNotification from "./useNotification";

const useGetProducts = (products = []) => {
  const axiosCancelToken = useRef();
  const dispatch = useDispatch();
  const [_, sendNotification] = useNotification();
  const [dataProducts, setDataProducts] = useState(products);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  /**
   * @param {{
   * search: string
   * categoryId: string
   * specificationsId: string[]
   * minPrice: number
   * maxPrice: number
   * rating: number
   * isDiscount: boolean
   * limit: number
   * page:number
   * isReset: boolean
   * }} props
   */
  const getProducts = async ({
    search,
    categoryId,
    specificationsId,
    minPrice,
    maxPrice,
    rating,
    isDiscount,
    limit,
    page,
    isReset,
  }) => {
    try {
      if (axiosCancelToken?.current) {
        axiosCancelToken.current.cancel();
      }

      axiosCancelToken.current = axios.CancelToken.source();

      setIsLoadingProducts(true);

      const params = new URLSearchParams();
      if (search) params.append("query_string", search);
      if (categoryId) params.append("category_tree", categoryId);
      if (specificationsId) params.append("spec_values", specificationsId);
      if (minPrice) params.append("price[gte]", minPrice);
      if (maxPrice) params.append("price[lte]", maxPrice);
      if (rating) params.append("rating.value[gte]", rating);
      if (isDiscount) params.append("has_discount", true);
      if (limit) params.append("limit", limit);
      if (page) params.append("page", page);

      const url = search
        ? `v1/search/products?${params.toString()}`
        : `v1/products?${params.toString()}`;

      const response = await API.get(url, {
        cancelToken: axiosCancelToken?.current?.token,
      });

      const productData = search
        ? response?.data?.data?.products?.results
        : response?.data?.results;

      if (isReset) {
        // Reset products data if user input new / clear search
        setDataProducts(productData);
      } else {
        setDataProducts((prevProducts) => {
          // Filter products which has duplicate
          const productIds = prevProducts.map((product) => product?.id);
          const newFilteredProducts =
            productData?.length > 0
              ? productData.filter(
                  (newProduct) => !productIds.includes(newProduct?.id)
                )
              : [];

          return [...prevProducts, ...newFilteredProducts];
        });
      }

      setIsFirstLoad(false);

      return {
        lastPage: search
          ? response?.data?.data?.products?.page
          : response?.data?.page || 1,
        totalPages: search
          ? response?.data?.data?.products?.total_pages
          : response?.data?.total_pages || 1,
        totalResults: search
          ? response?.data?.data?.products?.total_results
          : response?.data?.total_results || 0,
        categories: search && response?.data?.data?.categories,
        specifications: search && response?.data?.data?.specifications,
      };
    } catch (error) {
      if (error?.message === "canceled") return;
      if (error?.response?.status === 404) {
        setDataProducts([]);
        return;
      }

      sendNotification({
        msg: ["Something went wrong. Please try again later"],
        variant: "error",
      });
    } finally {
      setIsFirstLoad(false);
      setIsLoadingProducts(false);
      dispatch(setIsLoadingSearch(false));
      dispatch(setIsReset(false));
    }
  };

  return { dataProducts, getProducts, isLoadingProducts, isFirstLoad };
};

export default useGetProducts;
