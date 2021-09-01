import toNormWord from "../utils/toNormWord";
import stopWords from "../utils/stopWords";
import toFormattedWord from "../utils/toFormattedWord";
import Pluralize from "pluralize";

const getFilename = (keyWordsValue, DescValue) => {
   const keyWords = keyWordsValue.split(" ").map((word) => {
      return toFormattedWord(toNormWord(word));
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
         // if the currWord is already in allPrevWords in a singular or plural form, skip it
         if (
            allPrevWords.includes(singularizedWord) ||
            allPrevWords.includes(pluralizedWord)
         )
            return prevArr;
         // else, add it to allPrevWords
         else return [...prevArr, currWord];
      }, []);

   const uniqueWords = [...new Set([...keyWords, ...descWords])];
   return uniqueWords.filter((word) => word !== "").join("-");
};

export default getFilename;
