import { createContext } from "react";
import useLocalStorage from "./hooks/useLocalStorage.js"

export const WordsContext = createContext();

export default function WordsProvider({ children }) {
    const [words, setWords] = useLocalStorage('words', []);
    return (
      <WordsContext.Provider value={{ words, setWords }}>
        {children}
      </WordsContext.Provider>
    );
  }
  
  