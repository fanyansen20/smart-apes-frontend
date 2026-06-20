import Head from "next/head";
import Banner from "public/assets/images/banner.png";

/**
 * @param {{
 *  title: string
 *  type: string
 *  image: string
 *  description: string
 * }} props
 * @returns {JSX.Element}
 */
const HeadComponent = ({ title, type, image, description }) => {
  return (
    <Head>
      <meta property="og:title" content={title || "Smart Apes"} />
      <meta property="og:type" content={type || "website"} />
      <meta property="og:image" content={image || Banner} />
      <meta
        property="og:description"
        content={`${description || "Smart Apes Marketplace"}`}
      />
    </Head>
  );
};

export default HeadComponent;
