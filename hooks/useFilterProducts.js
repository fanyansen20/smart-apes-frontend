import { checkSameValueInArray } from "@helper/checkValue";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsReset } from "store/reducer/search/searchSlice";

const useFilterProducts = ({ specifications, allCategories, open }) => {
  const { query, push } = useRouter();
  const { search } = useSelector((state) => state.search);

  const dispatch = useDispatch();
  const firstRender = useRef(true);
  const [selectedCat, setSelectedCat] = useState([{}, {}, {}]);
  const [selectedCatTemp, setSelectedCatTemp] = useState([{}, {}, {}]);

  const [specificationSelected, setSpecificationSelected] = useState([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [selectedRating, setSelectedRating] = useState();
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [isApplyFilter, setIsApplyFilter] = useState(false);

  const selectedCatOneSlug = selectedCat[0]?.slug || query.slug1;
  const selectedCatTwoSlug = selectedCat[1]?.slug || query.slug2;
  const selectedCatThreeSlug = selectedCat[2]?.slug || query.slug3;

  const queryIdSpecifications =
    query?.id_spec && JSON.parse(decodeURIComponent(query.id_spec));
  const selectedSpecification =
    queryIdSpecifications &&
    specifications
      ?.filter((value) => queryIdSpecifications?.includes(value.id))
      .map((value) => ({
        idSpecification: value.id,
        nameSpecification: value.name,
      }));

  const handleSelectCat = (catIndex, category, applyFilter = false) => {
    const _selectedCat = [...selectedCat];
    _selectedCat[catIndex] = category;

    // Clear selected cat 2 & 3
    if (catIndex === 0) {
      _selectedCat[1] = {};
      _selectedCat[2] = {};
    }

    // Clear selected cat 3
    if (catIndex === 1) {
      _selectedCat[2] = {};
    }

    setSelectedCat(_selectedCat);
    if (applyFilter) setIsApplyFilter(applyFilter);
  };

  const getCategoryOne = () => {
    if (!selectedCatOneSlug) return {};

    const catOne = allCategories?.find(
      (catOne) => catOne?.slug === selectedCatOneSlug
    );

    if (!catOne) return {};

    return catOne;
  };

  const getCategoryTwo = () => {
    if (!selectedCatTwoSlug) return {};

    const catTwo = getCategoryOne()?.children?.find(
      (catTwo) => catTwo?.slug === selectedCatTwoSlug
    );

    if (!catTwo) return {};

    return catTwo;
  };

  const getCategoryThree = () => {
    if (!selectedCatThreeSlug) return {};

    const catThree = getCategoryTwo()?.children?.find(
      (catThree) => catThree?.slug === selectedCatThreeSlug
    );

    if (!catThree) return {};

    return catThree;
  };

  /**
   * @param {import("@types/filtering").SpecificationSelectedType} param0
   * @returns
   */
  const handleChangeSpecification = ({
    idSpecification,
    nameSpecification,
    applyFilter = false,
  }) => {
    if (applyFilter) setIsApplyFilter(applyFilter);

    if (
      !checkSameValueInArray({
        arr: specificationSelected,
        key: "idSpecification",
        comparison: idSpecification,
      })
    ) {
      const _specificationSelected = specificationSelected.filter(
        (value) => value.idSpecification !== idSpecification
      );

      setSpecificationSelected(_specificationSelected);
      return;
    }

    setSpecificationSelected((prev) => [
      ...prev,
      {
        idSpecification,
        nameSpecification,
      },
    ]);
  };

  const handleChangePrice = ({ min, max, applyFilter = false }) => {
    if (min >= 0) setMinPrice(min);
    if (max >= 0) setMaxPrice(max);

    if (applyFilter) setIsApplyFilter(applyFilter);
  };

  const handleChangeRating = (rating, applyFilter = false) => {
    setSelectedRating(rating);
    if (applyFilter) setIsApplyFilter(applyFilter);
  };

  const handleChangeOffer = (offer, applyFilter = false) => {
    if (!isSelectedOffer(offer)) {
      return setSelectedOffers((currentOffers) => [...currentOffers, offer]);
    }

    // Remove offer
    const _selectedOffers = selectedOffers.filter((value) => value != offer);
    setSelectedOffers(_selectedOffers);

    if (applyFilter) setIsApplyFilter(applyFilter);
  };

  const isSelectedOffer = (offer) => {
    return selectedOffers.includes(offer);
  };

  const applyCategoryFromSlug = () => {
    const _selectedCat = [...selectedCat];

    if (query?.slug1) {
      const selectedCatOne = getCategoryOne();
      _selectedCat[0] = selectedCatOne;
    }

    if (query?.slug2) {
      const selectedCatTwo = getCategoryTwo();
      _selectedCat[1] = selectedCatTwo;
    }

    if (query?.slug3) {
      const selectedCatThree = getCategoryThree();
      _selectedCat[2] = selectedCatThree;
    }

    setSelectedCat(_selectedCat);
    if (firstRender?.current) setSelectedCatTemp(_selectedCat);
  };

  const applySpecificationFromSlug = () => {
    setSpecificationSelected(selectedSpecification || []);
  };

  const applyPriceFromSlug = () => {
    setMinPrice(query?.minprice || "");
    setMaxPrice(query?.maxprice || "");
  };

  const applyRatingFromSlug = () => {
    setSelectedRating(query?.rating || "");
  };

  const applyOffersFromSlug = () => {
    if (!query?.offers) return setSelectedOffers([]);

    const offersArray = query?.offers.split("-");
    setSelectedOffers(offersArray);
  };

  const handleApplyStateFromSlug = () => {
    applyCategoryFromSlug();
    applySpecificationFromSlug();
    applyPriceFromSlug();
    applyRatingFromSlug();
    applyOffersFromSlug();
  };

  const resetDefaultCategory = () => {
    setSelectedCat(selectedCatTemp);
  };

  useEffect(() => {
    handleApplyStateFromSlug();
  }, [
    query?.slug1,
    query?.slug2,
    query?.slug3,
    query?.minprice,
    query?.maxprice,
    query?.rating,
    query?.offers,
    query?.id_spec,
    open,
  ]);

  useEffect(() => {
    if (isApplyFilter) handleApplyFilter();
  }, [isApplyFilter]);

  /**
   *
   * @param {{
   * categoryUrl : string
   * searchKeyword : string
   * selectedTab  : 'product' | 'store'
   * additionalParams : string
   * isCatOne  : string
   * isCatTwo  : string
   * catThree : string
   * }} param0
   * @returns
   */
  const generateRedirectUrl = ({
    categoryUrl,
    searchKeyword,
    selectedTab,
    additionalParams,
    isCatOne,
    isCatTwo,
    isCatThree,
  }) => {
    if (searchKeyword) {
      if (isCatTwo || isCatThree) {
        return `${categoryUrl}?keyword=${searchKeyword}&${additionalParams}`;
      }

      if (isCatOne) {
        return `${categoryUrl}/search?keyword=${searchKeyword}&${additionalParams}`;
      }

      return `?query=${searchKeyword}&tab=${selectedTab}&${additionalParams}`;
    }
  };

  const handleApplyFilter = () => {
    const params = new URLSearchParams();
    if (minPrice > 0) params.append("minprice", minPrice);
    if (maxPrice > 0) params.append("maxprice", maxPrice);
    if (selectedRating) params.append("rating", selectedRating);
    if (selectedOffers.length > 0) {
      params.append("offers", selectedOffers.join("-"));
    }

    if (specificationSelected.length > 0)
      params.append(
        "id_spec",
        encodeURIComponent(
          JSON.stringify(
            specificationSelected.map((value) => value.idSpecification)
          )
        )
      );

    let url = "";
    let categoryUrl = "/category";

    if (selectedCatOneSlug) categoryUrl += `/${selectedCatOneSlug}`;
    if (selectedCatTwoSlug) categoryUrl += `/${selectedCatTwoSlug}`;
    if (selectedCatThreeSlug) categoryUrl += `/${selectedCatThreeSlug}`;

    dispatch(setIsReset(true));
    setIsApplyFilter(false);

    url += generateRedirectUrl({
      categoryUrl,
      searchKeyword: query?.query || query?.keyword || search,
      selectedTab: query?.tab,
      additionalParams: params.toString(),
      isCatOne: selectedCatOneSlug,
      isCatTwo: selectedCatTwoSlug,
      isCatThree: selectedCatThreeSlug,
    });

    push(url, undefined, { shallow: true });
  };

  useEffect(() => {
    if (firstRender.current) firstRender.current = false;
  }, []);

  return {
    selectedCat,
    selectedCatOneSlug,
    selectedCatTwoSlug,
    selectedCatThreeSlug,
    getCategoryOne,
    getCategoryTwo,
    handleSelectCat,
    minPrice,
    maxPrice,
    handleChangePrice,
    selectedRating,
    handleChangeRating,
    isSelectedOffer,
    selectedOffers,
    handleChangeOffer,
    handleApplyFilter,
    handleApplyStateFromSlug,
    resetDefaultCategory,
    handleChangeSpecification,
    specificationSelected,
  };
};

export default useFilterProducts;
