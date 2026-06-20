//React
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//Next JS
import { useRouter } from "next/router";

//Material UI
import { IconButton, InputAdornment, InputBase } from "@mui/material";

// Icon MUI
import { Search } from "@mui/icons-material";
import DropdownSearch from "./DropdownSearch";

// hooks
import useHandlerChangeTitleName from "./hooks/useHandlerChangeTitleName";

// helper
import { handleSearchNavigation } from "./handleSearchNavigation ";

const shopUrl = ["/[shop]", "/[shop]/products"];

const SearchInput = ({ placeholder, closeModalCategory }) => {
  const { dataShop: shopData } = useSelector((store) => store.shopData);

  const { push, pathname } = useRouter();

  const isShopPage = shopUrl.includes(pathname);

  const { titleName, slugCategory } = useSelector((store) => store.layout);

  const [searchInput, setSearchInput] = useState("");

  const {
    handlerChangeTitleName,
    handlerOpenUserMenu,
    handlerCloseUserMenu,
    isOpenMenuItem,
    isGeneralSearch,
    setIsGeneralSearch,
  } = useHandlerChangeTitleName();

  const typeSearch = isShopPage ? "shop" : "";
  const dropDownName = (isShopPage && shopData?.name) || titleName;

  const shopSLug =
    shopData && isShopPage ? `${shopData.slug}/products` : slugCategory;

  useEffect(() => {
    setSearchInput("");
    setIsGeneralSearch(!dropDownName);
  }, [dropDownName, pathname]);

  const inputChangeHandler = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="searchInputDiv" onMouseEnter={closeModalCategory}>
      <InputBase
        className="searchInput"
        placeholder={placeholder}
        onChange={inputChangeHandler}
        onKeyDown={(e) =>
          handleSearchNavigation({
            e,
            searchInput,
            push,
            isGeneralSearch,
            slugCategory: shopSLug,
            typeSearch,
          })
        }
        value={searchInput}
        fullWidth
        startAdornment={
          <DropdownSearch
            titleName={dropDownName}
            handlerChangeTitleName={handlerChangeTitleName}
            handlerCloseUserMenu={handlerCloseUserMenu}
            handlerOpenUserMenu={handlerOpenUserMenu}
            isOpenMenuItem={isOpenMenuItem}
            isGeneralSearch={isGeneralSearch}
          />
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton>
              <Search
                onClick={(e) =>
                  handleSearchNavigation({
                    e,
                    searchInput,
                    push,
                    isGeneralSearch,
                    slugCategory,
                    typeSearch,
                  })
                }
              />
            </IconButton>
          </InputAdornment>
        }
      />
    </div>
  );
};

export default SearchInput;
