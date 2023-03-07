import React, { useState } from "react";
import axios from "axios";

const Home = () => {
   const [word, setWord] = useState("");
   // console.log(word)
   const [arrData, setArrData] = useState();

   var finalArr = [];
   const getWord = async (e) => {
      e.preventDefault();
      const arr = word.split("");
      setArrData(arr);
      for (let i = 0; i < nonRepeat.length; i++) {
         let apiData = await axios
            .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${nonRepeat[i]}`)
            .then(
               (e) => {
                  console.log('api', e.data[0].word)
                  finalArr.push(e.data[0].word)
               },
               (err) => {
                  console.log(err);
               }
            );
         console.log("Apidata", apiData.data[0].word);
         // if (nonRepeat[i] == apiData.data[0].word) {
         //    finalArr.push("kitty")
         // }

         console.log('data', nonRepeat[i], apiData.data[0].word)
      }
      console.log("finalArr", finalArr);
   };

   let res = [];
   const permutations = (len, val, existing) => {
      if (len === 0) {
         res.push(val);
         return;
      }
      for (let i = 0; i < arrData.length; i++) {
         if (!existing[i]) {
            existing[i] = true;
            permutations(len - 1, val + arrData[i], existing);
            existing[i] = false;
         }
      }
   };

   const buildPermuations = (arrData = []) => {
      for (let i = 0; i < arrData.length; i++) {
         permutations(arrData.length, "", []);
      }
   };
   buildPermuations(arrData);
   const letters = new Set(res);
   let nonRepeat = [];
   letters.forEach(function (value) {
      nonRepeat.push(value);
   });
   console.log("nonRepeat", nonRepeat);

   return (
      <div>
         <h1>Scrumbly</h1>
         <form onSubmit={getWord}>
            <input
               type="text"
               value={word}
               onChange={(e) => setWord(e.target.value)}
            ></input>
            <button type="submit">Submit</button>
         </form>
         <div>
            <ul>
               <li>List</li>
               <li></li>
            </ul>
         </div>
      </div>
   );
};

export default Home;
