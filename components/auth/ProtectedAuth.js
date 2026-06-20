// Redux
import { useDispatch, useSelector } from "react-redux";

// Next
import { getCookie, setCookie } from "cookies-next";
import { useSession } from "next-auth/react";

// Utils
import { useEffect } from "react";
import {
  getMembershipData,
  resetMembershipData,
} from "store/reducer/membership/membershipSlice";
import { refreshAccessToken } from "utils/auth";

const ProtectedAuth = ({ children }) => {
  const dispatch = useDispatch();
  /**
   * @type {MembershipInitialState}
   */
  const membershipData = useSelector((state) => state.member);
  const { data: session, update } = useSession({
    required: true,
    async onUnauthenticated() {
      const savedRefreshToken = getCookie("refresh_token");

      // Refresh Token if session is not authenticated
      if (savedRefreshToken) {
        const updatedSession = await refreshAccessToken({
          ...session,
          refreshToken: savedRefreshToken,
        });

        setCookie("refresh_token", updatedSession?.refreshToken);

        update(updatedSession);
      }

      // Reset Membership State Data if session is not authenticated
      if (membershipData?.memberType) {
        dispatch(resetMembershipData());
      }
    },
  });

  useEffect(() => {
    if (session && !membershipData?.memberType && !membershipData?.isLoading) {
      dispatch(
        getMembershipData({
          userId: session?.user?.id,
          accessToken: session?.accessToken,
        })
      ).then((res) => {
        console.log("updated session", {
          ...session,
          user: {
            ...(session?.user || {}),
          },
          membership_tier: res?.payload?.tier,
        });
        update({
          ...session,
          user: {
            ...(session?.user || {}),
          },
          membership_tier: res?.payload?.tier,
        });
      });
    }
  }, [session, membershipData]);

  return children;
};

export default ProtectedAuth;
