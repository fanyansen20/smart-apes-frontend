import View from "view";
import FaqLayout from "view/desktop/pages/faq/components/faqLayout";

const FaqPage = ({ device }) => {
  return <View device={device} path="faq-page" />;
};

FaqPage.getLayout = (page) => <FaqLayout>{page}</FaqLayout>;

export default FaqPage;
