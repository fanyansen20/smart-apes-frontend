// React
import { memo, useEffect } from "react";

//Next JS
import { useRouter } from "next/router";

// Components
import Loader from "@components/layout/Loader";

// Redux
import { useDispatch } from "react-redux";
import { isLayout } from "store/reducer/layout/layoutSlice";

const VerifyEmail = ({ token }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      isLayout({
        isNavbar: false,
        isFooter: false,
      })
    );

    const postVerifyEmail = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}v1/user-auth/verify-email?token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { status } = response;

      if (status === 204) {
        router.push("../success-sign-up");
      } else {
        router.push("../expired-sign-up");
      }
    };

    postVerifyEmail();
  }, []);

  return (
    <>
      <Loader />
    </>
  );
};

export default memo(VerifyEmail);
