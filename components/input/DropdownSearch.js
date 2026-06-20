// Material Ui & icons
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button, Divider, InputAdornment, Menu, MenuItem } from "@mui/material";

// hooks

/**
 * @param {{
 * titleName : string
 * nameSlug : string
 * isOpenMenuItem : boolean
 * handlerChangeTitleName : () => void
 * handlerOpenUserMenu : () => void
 * handlerCloseUserMenu : () => void
 * }} props
 * @returns
 */

const DropdownSearch = ({
  titleName,
  handlerChangeTitleName,
  handlerOpenUserMenu,
  handlerCloseUserMenu,
  isOpenMenuItem,
  isGeneralSearch,
}) => {
  if (titleName) {
    return (
      <InputAdornment position="start">
        <Button onClick={handlerOpenUserMenu}>
          {!isGeneralSearch ? `in ${titleName}` : `in Smart Apes `}
          <KeyboardArrowDownIcon />
        </Button>
        <Divider orientation="vertical" />
        <Menu
          sx={{ mt: "20px" }}
          anchorEl={isOpenMenuItem}
          open={isOpenMenuItem}
          onClose={handlerCloseUserMenu}
        >
          <MenuItem
            divider={true}
            onClick={() => handlerChangeTitleName("Smart Apes")}
          >
            in {titleName}
          </MenuItem>
          <MenuItem onClick={() => handlerChangeTitleName(titleName)}>
            in Smart Apes
          </MenuItem>
        </Menu>
      </InputAdornment>
    );
  }
};

export default DropdownSearch;
