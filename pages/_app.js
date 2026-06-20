// Next
import { SessionProvider, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";

// react
import { useEffect, useState } from "react";

// Layout
import Layout from "@layout/Layout";

// Redux
import { persistor, wrapper } from "store/store";

// Mui
import { CircularProgress } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";

// CSS
import "../styles/_all.scss";
import "../styles/globals.css";

// notistack
import { SnackbarProvider } from "notistack";

// constants
import { DEVICE_TYPE } from "constant/app";

// helpers
import ProtectedAuth from "@components/auth/ProtectedAuth";
import { deleteCookie, getCookie } from "cookies-next";
import { getSelectorsByUserAgent } from "react-device-detect";
import { isLayout } from "store/reducer/layout/layoutSlice";

// date pickers
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps, session, device } = props;

  const isParentLogout = getCookie("is_parent_log_out");

  if (isParentLogout) {
    deleteCookie("is_parent_log_out", {
      path: "Path=/",
      domain: "smartapes.sg",
    });
    signOut();
  }

  const renderLoadingUI = () => (
    <div className="loadingPage">
      <CircularProgress color="secondary" />
    </div>
  );

  const getLayout =
    Component.getLayout || ((page) => (loadingPage ? renderLoadingUI() : page));

  const router = useRouter();
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    router.events.on("routeChangeError", () => setLoadingPage(true));
    router.events.on("routeChangeStart", () => {
      setLoadingPage(true);

      // Set Default Layout
      store.dispatch(isLayout({}));
    });
    router.events.on("routeChangeComplete", () =>
      setTimeout(() => {
        setLoadingPage(false);
      }, 1000)
    );

    return () => {
      router.events.off("routeChangeError", () => setLoadingPage(true));
      router.events.off("routeChangeStart", () => setLoadingPage(true));
      router.events.off("routeChangeComplete", () =>
        setTimeout(() => {
          setLoadingPage(false);
        }, 1000)
      );
    };
  }, [router.events]);

  return (
    <StyledEngineProvider injectFirst>
      <SessionProvider session={session}>
        <SnackbarProvider dense>
          <Provider store={store}>
            <PersistGate loading={renderLoadingUI} persistor={persistor}>
              <Layout device={device} isAppLoading={loadingPage}>
                {getLayout(
                  <ProtectedAuth>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Component {...pageProps} device={device} />
                    </LocalizationProvider>
                  </ProtectedAuth>
                )}
              </Layout>
            </PersistGate>
          </Provider>
        </SnackbarProvider>
      </SessionProvider>
    </StyledEngineProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  const { req } = ctx;

  // Fetch the User-Agent from the server side request headers
  const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
  const { isMobile, isDesktop } = getSelectorsByUserAgent(userAgent);

  const isMobileDevice = isMobile && DEVICE_TYPE.MOBILE;
  const isDesktopDevice = isDesktop && DEVICE_TYPE.DESKTOP;

  const getDeviceType = isMobileDevice || isDesktopDevice;

  return { device: getDeviceType };
};

export default MyApp;
