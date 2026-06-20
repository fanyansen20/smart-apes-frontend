import xss from "xss";

/**
 * Function to sanitize html string and return html
 * @param {string} htmlString
 * @returns {HTMLElement}
 */
export const htmlParser = (htmlString) => {
  if (!htmlString) return <div></div>;

  const customXss = new xss.FilterXSS({
    // Allow html tags and attributes here
    whiteList: {
      p: ["style"],
      strong: [],
      ol: [],
      ul: [],
      li: [],
      br: [],
    },
  });

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: customXss.process(htmlString),
      }}
    />
  );
};
