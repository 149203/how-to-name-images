import * as React from "react";
import { useState } from "react";
import Intro from "../components/intro";
import toNormWord from "../utils/toNormWord";
import stopWords from "../utils/stopWords";
import toFormattedWord from "../utils/toFormattedWord";

export default function IndexPage() {
   const [KeywordsInput, setKeywordsInput] = useState({
      value: "",
      isValid: false,
   });
   const [DescInput, setDescInput] = useState({
      value: "",
      isValid: false,
   });
   const [filename, setFilename] = useState("");

   const checkIsValidKeywords = (keywordsInput) => {
      // split on spaces to get a list of words
      // no more than 4 separate words allowed
      return keywordsInput.trim().split(" ").length <= 4;
   };
   const getFilename = (keyWordsValue, DescValue) => {
      const keyWords = keyWordsValue.split(" ");
      const descWords = DescValue.split(" ");
      const allWords = [...keyWords, ...descWords];

      const normWords = allWords.map((word) => {
         console.log(toNormWord(word));
         return toNormWord(word);
      });

      const normGoWords = normWords.filter((word) => {
         return stopWords.includes(word) === false;
      });

      const formattedGoWords = normGoWords.map((word) => {
         return toFormattedWord(word);
      });

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
   const handleDescInput = (value) => {
      setDescInput((state) => ({
         ...state,
         value,
         isValid: true,
      }));
      setFilename(getFilename(KeywordsInput.value, value));
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
                     className={`form-control mb-6`}
                     id="keywords"
                     onChange={(e) => handleKeywordsInput(e.target.value)}
                  />
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
                     className={`form-control`}
                     id="description"
                     onChange={(e) => handleDescInput(e.target.value)}
                  />
                  <p className="float-end">0/80</p>
                  <div className="clearfix mb-6"></div>
                  <label className="form-label mb-1 fw-bold" htmlFor="filename">
                     Your image filename
                  </label>
                  <textarea
                     readOnly
                     rows="2"
                     id="filename"
                     className="mb-6"
                     value={filename}
                  ></textarea>
                  <label className="form-label mb-1 fw-bold" htmlFor="altText">
                     Your alt text
                  </label>
                  <textarea
                     readOnly
                     rows="2"
                     id="altText"
                     className="mb-6"
                     value={DescInput.value}
                  ></textarea>
                  <p className="fw-bold mb-1">Your title</p>
                  <p className="text-red fw-bold">Don't include a title!</p>
               </div>
            </div>
         </div>
      </main>
   );
}
