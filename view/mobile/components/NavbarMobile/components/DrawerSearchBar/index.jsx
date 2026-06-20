import React, { useRef } from "react";

// next
import Image from "next/image";

// mui material
import { Drawer, Grid, IconButton, InputBase, Paper } from "@mui/material";

// MUI Icons
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@public/assets/icons/close-icon.svg";
import SearchIcon from "@public/assets/icons/search-mobile.svg";

// style
import classes from "./_DrawerSearchBar.module.scss";

// dispatch
import { useDispatch, useSelector } from "react-redux";

// Helper
import { setSearch } from "store/reducer/search/searchSlice";

/**
 * @param {{
 * open : boolean
 * onClose : () => void
 * handleSubmitSearch : () => void
 * handleClearSearch : () => void
 * }} props
 * @returns
 */

const DrawerSearchBar = ({
  open,
  onClose,
  handleSubmitSearch,
  handleClearSearch,
}) => {
  const inputSearchRef = useRef(null);

  const dispatch = useDispatch();
  const { search } = useSelector((store) => store.search);

  return (
    <Drawer anchor="top" open={open} onClose={onClose}>
      <div className={classes.containerDrawerSearchBar}>
        <Grid
          container
          justifyContent="space-around"
          direction="row"
          alignItems="center"
          p={1.5}
        >
          <Grid item xs={1}>
            <IconButton
              size="small"
              onClick={onClose}
              className={classes.backIconBtn}
            >
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
          </Grid>

          <Grid item xs={10}>
            <Paper variant="outlined" className={classes.searchInput}>
              <InputBase
                ref={inputSearchRef}
                sx={{
                  margin: 1,
                }}
                fullWidth
                autoFocus
                name="inputSearch"
                value={search || ""}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                onKeyDown={(e) => handleSubmitSearch(e)}
                placeholder="Search product or store"
                inputProps={{
                  "aria-label": "Search product or store",
                  sx: {
                    fontFamily: "Poppins",
                    fontSize: "12px !important",
                    fontWeight: "400 !important",
                    padding: 0,
                  },
                }}
                endAdornment={
                  <IconButton
                    onClick={() => handleClearSearch(inputSearchRef)}
                    type="button"
                    size="small"
                    aria-label="search"
                  >
                    <Image
                      src={search ? CloseIcon : SearchIcon}
                      width="16em"
                      height="16em"
                      alt="search-mobile"
                    />
                  </IconButton>
                }
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Drawer>
  );
};

export default DrawerSearchBar;
