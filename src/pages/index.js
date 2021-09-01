import * as React from "react";
import { useState } from "react";
import Intro from "../components/intro";
import toNormWord from "../utils/toNormWord";
import stopWords from "../utils/stopWords";
import toFormattedWord from "../utils/toFormattedWord";
import Output from "../components/output";
import PlaceholderInfoBox from "../components/placeholderInfoBox";
import Pluralize from "pluralize";

export default function IndexPage() {
   const [KeywordsInput, setKeywordsInput] = useState({
      value: "",
      isValid: true,
   });
   const [DescInput, setDescInput] = useState({
      value: "",
      isValid: true,
   });
   const [filename, setFilename] = useState("");

   const checkIsValidKeywords = (keywordsInput) => {
      // split on spaces to get a list of words
      // no more than 4 separate words allowed
      return keywordsInput.trim().split(" ").length <= 4;
   };

   const getFilename = (keyWordsValue, DescValue) => {
      const keyWords = keyWordsValue
         .split(" ")
         .map((word) => {
            return toNormWord(word);
         })
         .map((word) => {
            return toFormattedWord(word);
         });

      const descWords = DescValue.split(" ")
         .map((word) => {
            return toNormWord(word);
         })
         .filter((word) => {
            return stopWords.includes(word) === false;
         })
         .map((word) => {
            return toFormattedWord(word);
         })
         .reduce((prevArr, currWord) => {
            const singularizedWord = Pluralize.singular(currWord);
            const pluralizedWord = Pluralize.plural(currWord);
            const allPrevWords = [...prevArr, ...keyWords];
            // if the currWord is already in the arr in a singular or plural form, skip it
            if (
               allPrevWords.includes(singularizedWord) ||
               allPrevWords.includes(pluralizedWord)
            )
               return prevArr;
            // else, add it to the arr
            else return [...prevArr, currWord];
         }, []);

      const formattedGoWords = [...keyWords, ...descWords];
      const uniqueWords = [...new Set(formattedGoWords)];
      return uniqueWords.filter((word) => word !== "").join("-");
   };
   const handleKeywordsInput = (value) => {
      setKeywordsInput((state) => ({
         ...state,
         value,
         isValid: checkIsValidKeywords(value),
      }));
      setFilename(getFilename(value, DescInput.value));
   };
   const checkDescIsValid = (value) => {
      return value.length <= 80;
   };
   const handleDescInput = (value) => {
      setDescInput((state) => ({
         ...state,
         value,
         isValid: checkDescIsValid(value),
      }));
      setFilename(getFilename(KeywordsInput.value, value));
   };

   const getCharCountCss = () => {
      const count = DescInput.value.length;
      if (count > 80) return "text-red fw-bold";
      return "";
   };

   const getKeywordsInputCss = () => {
      if (KeywordsInput.isValid === false) return "is-invalid";
      return "";
   };

   const getDescInputCss = () => {
      if (DescInput.isValid === false) return "is-invalid";
      return "";
   };

   const checkIsFormComplete = () => {
      if (
         KeywordsInput.isValid &&
         DescInput.isValid &&
         KeywordsInput.value !== "" &&
         DescInput.value !== ""
      )
         return true;
      return false;
   };

   return (
      <main>
         <title>How To Name Images</title>
         <div className="container mt-4">
            <div className="row gx-6">
               <div className="col-xl-6 offset-xl-3">
                  <Intro />

                  <label htmlFor="keywords" className="form-label mb-1 fw-bold">
                     Keywords
                  </label>
                  <p className="mb-0">
                     1-4 <strong>page-specific</strong> keywords separated by
                     spaces
                  </p>
                  <p className="text-muted fst-italic">
                     Example: best coding laptop
                  </p>
                  <input
                     type="text"
                     value={KeywordsInput.value}
                     className={`form-control ${getKeywordsInputCss()}`}
                     id="keywords"
                     onChange={(e) => handleKeywordsInput(e.target.value)}
                  />
                  {KeywordsInput.isValid === false && (
                     <p className={`float-end text-red fw-bold`}>
                        Please use no more than 4 keywords.
                     </p>
                  )}

                  <div className="clearfix mb-6"></div>
                  <label
                     htmlFor="description"
                     className="form-label mb-1 fw-bold"
                  >
                     Description
                  </label>
                  <p className="mb-0">
                     A properly-formed sentence describing this image to a blind
                     person
                  </p>
                  <p className="text-muted fst-italic">
                     Example: A happy student showing the app she made on her
                     laptop.
                  </p>
                  <ul>
                     <li>Include relevant descriptive details and emotion.</li>
                     <li>
                        Use proper grammar, capitalization, and punctuation.
                     </li>
                     <li>
                        Don't say "Image of" or "Picture of". Just describe it.
                     </li>
                  </ul>
                  <input
                     type="text"
                     value={DescInput.value}
                     className={`form-control ${getDescInputCss()}`}
                     id="description"
                     onChange={(e) => handleDescInput(e.target.value)}
                  />
                  <p className={`float-end ${getCharCountCss()}`}>
                     {DescInput.value.length}/80
                  </p>
                  <div className="clearfix mb-6"></div>
                  {checkIsFormComplete() ? (
                     <Output filename={filename} altText={DescInput.value} />
                  ) : (
                     <PlaceholderInfoBox />
                  )}
               </div>
            </div>
         </div>
      </main>
   );
}
