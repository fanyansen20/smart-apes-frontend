import { faqContent } from "constant/faqStaticPage";
import View from "view";
import FaqLayout from "../../../view/desktop/pages/faq/components/faqLayout";

const Article = ({ device, faqData }) => {
  return <View device={device} path="article" faqData={faqData} />;
};

Article.getLayout = (page) => <FaqLayout>{page}</FaqLayout>;

export default Article;

export function getServerSideProps({ query }) {
  const { cat, subCat, content } = query || {};

  if (!cat || !subCat) return { notFound: true };

  let faqData = {
    categoryOne: faqContent[cat],
    categoryTwo: faqContent[cat][subCat],
  };

  if (content) {
    const mainContent = faqContent?.[cat]?.[subCat]?.content?.find(
      (item) => item?.pathSlug === content
    );

    if (!mainContent) return { notFound: true };

    faqData.content = mainContent;
  }

  return {
    props: {
      faqData,
    },
  };
}
