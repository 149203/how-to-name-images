const toLower = require("lodash/fp/toLower");
const trim = require("lodash/fp/trim");
const deburr = require("lodash/fp/deburr");
const flow = require("lodash/fp/flow");
const replace = require("lodash/fp/replace");

// - asr --- sd-me s- sd -
const toNormWord = (word) => {
   return flow(
      trim,
      deburr,
      toLower,
      replace(/^[^a-z0-9]+/gm, ""), // remove non alpha and non digit chars from start of word
      replace(/[^a-z0-9]+$/gm, "") // remove non alpha and non digit chars from end of word
   )(word);
};

export default toNormWord;
