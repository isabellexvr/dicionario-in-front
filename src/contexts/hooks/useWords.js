import { useContext } from "react";
import { WordsContext } from "../WordsContext";

export default function useWords() {
  const context = useContext(WordsContext);
  const { words, setWords } = context;
  return { words, setWords };
}
