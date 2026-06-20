// import App from "next/app";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getMembershipData } from "store/reducer/membership/membershipSlice";

// Components
import Navbar from "@components/Navigation/Navbar";
import Footer from "@components/footer/Footer";
import ShopHeader from "@components/shop/ShopHeader/ShopHeader";
import { DEVICE_TYPE } from "constant/app";
import {
  PATH_BOTTOM_NAV,
  PATH_FOR_NAVBAR_SEARCH,
  PATH_MOBILE_FOOTER,
  PATH_NAVBAR_WITH_LOGO,
} from "constant/mobileApp";
import FooterMobile from "view/mobile/components/FooterMobile";
import BottomNavbarMobile from "view/mobile/components/FooterNavigation";
import NavbarLogo from "view/mobile/components/NavbarLogo";
import NavbarMobile from "view/mobile/components/NavbarMobile";

// helper
import { isHeaderShop } from "@helper/checkUrlPage";

/**
 * @typedef {typeof DEVICE_TYPE} DevicesType
 *
 * @param {{
 *  isAppLoading: boolean
 *  device: keyof DevicesType
 *  children: import("react").ReactNode
 * }} props
 *
 * @returns {JSX.Element}
 */
export default function Layout({ children, device, isAppLoading }) {
  const { pathname } = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const { isFooter, isNavbar, websiteTitle, contentDescription, contentImage } =
    useSelector((store) => store.layout);
  const [showDesktopLayout, setShowDesktopLayout] = useState(false);
  const [showNavbarMobile, setShowNavbarMobile] = useState(false);
  const [showBottomNavbarMobile, setShowBottomNavbarMobile] = useState(false);

  const showLogoNavbar = PATH_NAVBAR_WITH_LOGO.includes(pathname);
  const showFooterMobile = PATH_MOBILE_FOOTER.includes(pathname);

  useEffect(() => {
    setShowDesktopLayout(device === DEVICE_TYPE.DESKTOP);
  }, []);

  useEffect(() => {
    const currentUrlPaths = pathname?.split("/");

    if (!PATH_FOR_NAVBAR_SEARCH.includes(pathname)) {
      setShowNavbarMobile(false);
    } else {
      setShowNavbarMobile(device === DEVICE_TYPE.MOBILE);
    }

    if (
      !PATH_BOTTOM_NAV.includes(currentUrlPaths?.[currentUrlPaths?.length - 1])
    ) {
      setShowBottomNavbarMobile(false);
    } else {
      setShowBottomNavbarMobile(device === DEVICE_TYPE.MOBILE);
    }
  }, [pathname]);

  return (
    <>
      <Head>
        <title>
          {websiteTitle ? `${websiteTitle} | Smart Apes` : "Smart Apes"}
        </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta
          name="title"
          content={websiteTitle ? `${websiteTitle} | Smart Apes` : "Smart Apes"}
        />
        <meta name="description" content={contentDescription ?? ""} />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={websiteTitle ? `${websiteTitle} | Smart Apes` : "Smart Apes"}
        />
        <meta property="og:description" content={contentDescription ?? ""} />
        <meta property="og:image" content={contentImage ?? ""} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content={websiteTitle ? `${websiteTitle} | Smart Apes` : "Smart Apes"}
        />
        <meta
          property="twitter:description"
          content={contentDescription ?? ""}
        />
        <meta property="twitter:image" content={contentImage ?? ""} />
      </Head>
      {isNavbar && showDesktopLayout && <Navbar />}
      {isNavbar && showDesktopLayout && isHeaderShop(pathname) && (
        <ShopHeader />
      )}
      {isNavbar && showLogoNavbar && !showDesktopLayout && <NavbarLogo />}
      {isNavbar && !showLogoNavbar && showNavbarMobile && <NavbarMobile />}
      {children}
      {isFooter && showDesktopLayout && <Footer />}
      {showFooterMobile && isFooter && !showDesktopLayout && !isAppLoading && (
        <FooterMobile />
      )}
      {isFooter && showBottomNavbarMobile && <BottomNavbarMobile />}
    </>
  );
}
