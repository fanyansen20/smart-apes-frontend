// Shared
import IllustrationPage from "@components/shared/IllustrationPage";

// Images
import searchNotFound from "@public/assets/images/SearchNotFound.svg";

const NoProductFound = () => {
  return (
    <IllustrationPage
      illustrationImage={searchNotFound}
      titleIllustration="Product Not Found"
      contentIllustration="Your Search did not match any product
  Please try again"
    />
  );
};

export default NoProductFound;
