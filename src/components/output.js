import * as React from "react";

export default function Output({ filename, altText }) {
   return (
      <>
         <label className="form-label mb-1 fw-bold" htmlFor="filename">
            Filename
         </label>
         <textarea
            readOnly
            rows="2"
            id="filename"
            className="mb-6 py-2 px-4"
            value={filename}
         ></textarea>
         <label className="form-label mb-1 fw-bold" htmlFor="altText">
            Alt text
         </label>
         <textarea
            readOnly
            rows="2"
            id="altText"
            className="mb-6 py-2 px-4"
            value={altText}
         ></textarea>
         <p className="fw-bold mb-1">Your title</p>
         <p className="text-red fw-bold">Don't include a title!</p>
      </>
   );
}
