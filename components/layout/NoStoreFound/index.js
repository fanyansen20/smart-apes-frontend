// Shared
import IllustrationPage from "@components/shared/IllustrationPage";

// Images
import searchNotFound from "@public/assets/images/no-store-found.png";

const NoStoreFound = () => {
  return (
    <IllustrationPage
      illustrationImage={searchNotFound}
      titleIllustration="No Store to Display "
      contentIllustration="We are sorry. There is No Store related to your keyword."
    />
  );
};

export default NoStoreFound;
