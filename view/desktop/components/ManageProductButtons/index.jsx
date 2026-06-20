import TextButton from "@components/shared/Button/TextButton/TextButton";
import { Divider, Stack } from "@mui/material";

// icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import chatIcon from "@public/assets/icons/chat-outlined.svg";
import shareIcon from "@public/assets/icons/share.svg";

import Image from "next/image";
import React, { memo } from "react";

function ManageProductButtons({
  isWishlist,
  disableWishlist,
  handlerModalShare,
  handlerWishlistProduct,
}) {
  return (
    <Stack
      direction="row"
      className="productManageBtnGroup"
      justifyContent="space-evenly"
    >
      <TextButton
        color="secondary"
        startIcon={<Image src={shareIcon} alt="share" />}
        disableRipple
        onClick={handlerModalShare}
      >
        Share
      </TextButton>
      {!disableWishlist && (
        <>
          <Divider orientation="vertical" variant="middle" flexItem />
          <TextButton
            color="secondary"
            onClick={handlerWishlistProduct}
            startIcon={
              isWishlist ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )
            }
            disableRipple
          >
            Wishlist
          </TextButton>
        </>
      )}

      {/* // TODO : not implement yet */}
      {/* <Divider orientation="vertical" variant="middle" flexItem />
      <TextButton
        color="secondary"
        startIcon={<Image src={chatIcon} alt="chat" />}
        disableRipple
      >
        Chat
      </TextButton> */}
    </Stack>
  );
}

export default memo(ManageProductButtons);
