// react
import { useEffect } from "react";
import View from "view";

// Next js
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getWishlistData } from "store/reducer/wishlist/wishlistSlice";

// hooks
import useLoginCallback from "@hooks/useLoginCallback";

const Wishlist = ({ device, session }) => {
  const dispatch = useDispatch();
  const handleLoginCallback = useLoginCallback();

  const { status } = useSelector((store) => store.wishlist);

  useEffect(() => {
    if (!session) {
      handleLoginCallback(encodeURIComponent("wishlist"));
    }

    if (status === "idle") {
      dispatch(getWishlistData({ page: 1 }));
    }
  }, []);

  return <View device={device} path="wishlist" />;
};

export default Wishlist;

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);

  return {
    props: { session },
  };
}
