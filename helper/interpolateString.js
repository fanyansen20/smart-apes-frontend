import Link from "next/link";
import { cloneElement, isValidElement } from "react";

/**
 * Usage example
 * text = "Lorem ipsum {dolorLink} sit, amet consectetur {adipisicingBold}. Email to : {loremEmail}"
 * reference = {
 *    dolorLink: "www.smartapes.sg"
 *    dolorLinkText: "dolor" -> add (object key + Text) for link
 *    loremEmail: "cs@smartapes.sg" -> create mailto link
 *    adipisicingBold: "adipisicingBold" -> create bold text
 * }
 *
 * Add more text effect in inferElement function. Reference: https://github.com/facebook/docusaurus/blob/HEAD/packages/docusaurus/src/client/exports/Interpolate.tsx
 */

/**
 * @param {String} text
 * @param {Object} reference - Object containing variable reference for string interpolation
 * @returns {React.ReactNode}
 */
export const interpolateString = (text, reference) => {
  try {
    if (!text || typeof text !== "string") return <></>;

    const stringParts = text.split(/(\{\w+\})/);

    if (stringParts.length <= 1) return <>{text}</>; // if not curly bracket ({...}), then return immediately

    const segments = stringParts.map((seg, index) => {
      if (index % 2 === 1) {
        const referenceKey = seg.slice(1, -1);
        const value = reference?.[referenceKey];
        if (value !== undefined) {
          return inferElement(value, referenceKey, reference, index);
        }
      }
      return seg;
    });

    if (segments.some((seg) => isValidElement(seg))) {
      return segments
        .map((seg, index) =>
          isValidElement(seg) ? cloneElement(seg, { key: index }) : seg
        )
        .filter((seg) => seg !== "");
    }

    return <>{segments.join("")}</>;
  } catch (error) {
    console.error(error);
  }
};

/**
 * @param {String} value
 * @param {String} referenceKey - object key expected in the reference object
 * @param {Object} reference - Object containing variable reference for string interpolation
 * @param {Number} index - index of element
 * @returns {React.ReactNode | String}
 */
const inferElement = (value, referenceKey, reference = {}, index) => {
  const urlRegex = /\b\w*link|url\w*\b/i;
  const emailRegex = /\b\w*email|mail\w*\b/i;
  const boldTextRegex = /\b\w*bold\w*\b/i;
  const italicTextRegex = /\b\w*italic\w*\b/i;

  // Return next link if it's a link / url
  if (Boolean(referenceKey.match(urlRegex)?.length)) {
    const urlText = reference?.[`${referenceKey}Text`] || "link";
    return (
      <Link key={index} href={value}>
        {urlText}
      </Link>
    );
  }

  // Return mail to anchor if it's email
  if (Boolean(referenceKey.match(emailRegex)?.length)) {
    return <a href={`mailto:${value}`}>{value}</a>;
  }

  // Return bold if contain bold keyword
  if (Boolean(referenceKey.match(boldTextRegex)?.length)) {
    return <strong key={index}>{value}</strong>;
  }

  // Return bold if contain bold keyword
  if (Boolean(referenceKey.match(italicTextRegex)?.length)) {
    return <i key={index}>{value}</i>;
  }

  // Default
  return value;
};
