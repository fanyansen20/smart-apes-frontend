const pricesOptions = [
  {
    id: 1,
    display_string: "S$ 5.00 - S$ 10.00",
    minPrice: "5",
    maxPrice: "10",
    query_string: "price[lte]=10&price[gte]=5",
  },
  {
    id: 2,
    display_string: "S$ 11.00 - S$ 15.00",
    minPrice: "11",
    maxPrice: "15",
    query_string: "price[lte]=15&price[gte]=11",
  },
  {
    id: 3,
    display_string: "S$ 16.00 - S$ 20.00",
    minPrice: "16",
    maxPrice: "20",
    query_string: "price[lte]=20&price[gte]=15",
  },
  {
    id: 4,
    display_string: "S$ 21.00 - S$ 25.00",
    minPrice: "21",
    maxPrice: "25",
    query_string: "price[lte]=25&price[gte]=21",
  },
  {
    id: 5,
    display_string: "S$ 26.00 - S$ 30.00",
    minPrice: "26",
    maxPrice: "30",
    query_string: "price[lte]=30&price[gte]=26",
  },
];

const ratingOptions = [
  {
    id: 1,
    isEnable: [{}, {}, {}, {}, {}],
    isDisable: [],
    value: 5,
    query_string: "rating.value[gte]=5",
  },
  {
    id: 2,
    isEnable: [{}, {}, {}, {}],
    isDisable: [{}],
    value: 4,
    query_string: "rating.value[gte]=4",
  },
  {
    id: 3,
    isEnable: [{}, {}, {}],
    isDisable: [{}, {}],
    value: 3,
    query_string: "rating.value[gte]=3",
  },
  {
    id: 4,
    isEnable: [{}, {}],
    isDisable: [{}, {}, {}],
    value: 2,
    query_string: "rating.value[gte]=2",
  },
  {
    id: 5,
    isEnable: [{}],
    isDisable: [{}, {}, {}, {}],
    value: 1,
    query_string: "rating.value[gte]=1",
  },
];

const offerOptions = [
  {
    id: 1,
    display_string: "Discount",
    value: "discount",
    query_string: "has_discount=true",
  },
];

const locationOptions = [
  {
    id: 1,
    display_string: "Overseas",
    query_string: "is_available_overseas=true",
  },
  {
    id: 2,
    display_string: "Domestic",
    query_string: "is_available_domestic=true",
  },
];

const storesType = [
  {
    id: 1,
    display_string: "Verified",
    value: "verified",
    query_string: "is_verified=true",
  },
  {
    id: 2,
    display_string: "Unverified",
    value: "unverified",
    query_string: "is_unverified=true",
  },
];

export {
  locationOptions,
  offerOptions,
  pricesOptions,
  ratingOptions,
  storesType,
};
