import { memo } from "react";
import desktopRoute from "./desktop/route";
import mobileRoute from "./mobile/route";

function View({ device, path, ...otherProps }) {
  const dynamicComponents = {
    desktop: desktopRoute,
    mobile: mobileRoute,
  };

  const Component = dynamicComponents[device][path];

  return <Component {...otherProps} />;
}

export default memo(View);
