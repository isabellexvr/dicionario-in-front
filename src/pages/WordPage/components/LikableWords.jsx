import styled from "styled-components";
import PORTUGUESEALPHABET from "../../../constants/portugueseAlphabet";
import { useEffect, useState } from "react";

export default function HighlightWords({
  text,
  hashtable,
  navigate,
  setGlobalSelectedWord,
  selectedLetter,
  setSelectedLetter,
  shownWords,
}) {
  const test = text?.split(/([^A-Za-z\u00C0-\u017F]+)/)

  return (
    <p>
      {test?.map((word, index) => {
        if (!/\s+/.test(word)) {
          if (hashtable[word] !== undefined) {
            return (
              <Highlight
                onClick={() => {

                  navigate(`/palavra/${word}`);

                  setSelectedLetter(
                    PORTUGUESEALPHABET.indexOf(word[0].toUpperCase())
                  );

                  setGlobalSelectedWord(null);

                  const filteredWord = Object.keys(hashtable).filter(
                    (e) => e[0].toLowerCase() == word[0].toLowerCase()
                  );

                  setGlobalSelectedWord(filteredWord.indexOf(word));
                  
                }}
                key={index}
              >
                {word}
              </Highlight>
            );
          }
          return <span key={index}>{word}</span>;
        }
        return <span key={index}>{word}</span>;
      })}
    </p>
  );
}

export const Highlight = styled.a`
  text-decoration: underline;
  cursor: pointer;
  white-space: nowrap;
  flex-wrap: wrap;
  margin-bottom: 2%;
  //background-color: red;
  width: fit-content;
`;
