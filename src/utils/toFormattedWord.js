const trim = require("lodash/fp/trim");
const flow = require("lodash/fp/flow");
const replace = require("lodash/fp/replace");

const toFormattedWord = (word) => {
   return flow(
      replace(/'s/gm, ""), // remove possessives
      replace(/[^a-z0-9-]/gm, ""), // remove NON alphabetical, digit, and hyphen chars
      replace(/[-]{2,}/gm, "-"), // replace multiple hyphens with a single hyphen
      trim,
      replace(/^-$/gm, "") // if the result is only a single hyphen, replace with empty string
   )(word);
};

export default toFormattedWord;
