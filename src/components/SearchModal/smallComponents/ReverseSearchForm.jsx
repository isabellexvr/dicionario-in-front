import {
  AddOrDeleteButton,
  AddedReverseSearchWords,
  ReverseSearchFormStyle,
  ReverseSearchWord,
} from "../styledComponents";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import { useState } from "react";

export default function ReverseSearchForm({
  reverseSearch,
  setSearchResults,
  setShowResults,
}) {
  const [excludedRSWords, setExcludedRSWords] = useState({});
  const [excludedRSWordInput, setExcludedRSWordInput] = useState("");
  const [includedRSWords, setIncludedRSWords] = useState({});
  const [includedRSWordInput, setIncludedRSWordInput] = useState("");

  function addWords(input, words, setter) {
    const inputHash = {};
    input.split(" ").forEach((e) => (inputHash[e] = true));
    setter({ ...words, ...inputHash });
  }

  return (
    <ReverseSearchFormStyle onSubmit={(e) => e.preventDefault()}>
      <h1>
        Adicione palavras desejadas que estão dentro e/ou fora da definição
        desejada:
      </h1>

      <AddedReverseSearchWords>
        <div className="to-add">
          <h1>Palavras incluídas:</h1>
          {Object.keys(includedRSWords).map((w, i) => (
            <ReverseSearchWord key={i} isToAdd={true}>
              <h1>{w}</h1>
              <div
                className="close-icon"
                onClick={() => {
                  const aux = { ...includedRSWords };
                  delete aux[w];
                  setIncludedRSWords(aux);
                }}
              >
                <IoMdCloseCircle />
              </div>
            </ReverseSearchWord>
          ))}
        </div>
        <div className="to-delete">
          <h1>Palavras excluídas:</h1>
          {Object.keys(excludedRSWords).map((w, i) => (
            <ReverseSearchWord key={i}>
              <h1>{w}</h1>
              <div
                className="close-icon"
                onClick={() => {
                  const aux = { ...excludedRSWords };
                  delete aux[w];
                  setExcludedRSWords(aux);
                }}
              >
                <IoMdCloseCircle />
              </div>
            </ReverseSearchWord>
          ))}
        </div>
      </AddedReverseSearchWords>

      <div className="input">
        <label htmlFor="add">Incluir Palavra:</label>

        <input
          id="add"
          name="name"
          value={includedRSWordInput}
          onChange={(e) => {
            setIncludedRSWordInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              addWords(
                includedRSWordInput,
                includedRSWords,
                setIncludedRSWords
              );
              setIncludedRSWordInput("");
            }
          }}
        />

        <AddOrDeleteButton
          onClick={() => {
            addWords(includedRSWordInput, includedRSWords, setIncludedRSWords);

            setIncludedRSWordInput("");
          }}
        >
          <IoMdAdd />
        </AddOrDeleteButton>
      </div>

      <div className="input">
        <label htmlFor="delete">Excluir Palavra:</label>

        <input
          id="delete"
          name="name"
          disabled={Object.keys(includedRSWords).length == 0}
          value={excludedRSWordInput}
          onChange={(e) => setExcludedRSWordInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              addWords(
                excludedRSWordInput,
                excludedRSWords,
                setExcludedRSWords
              );
              setExcludedRSWordInput("");
            }
          }}
        />

        <AddOrDeleteButton
          onClick={() => {
            addWords(excludedRSWordInput, excludedRSWords, setExcludedRSWords);
            setExcludedRSWordInput("");
          }}
        >
          <RiSubtractFill />
        </AddOrDeleteButton>
      </div>
      <div className="buttons">
        <button
          onClick={async () => {
            setShowResults(true);
            const form = {
              contains: Object.keys(includedRSWords),
              doesNotContain: Object.keys(excludedRSWords),
            };
            const res = await reverseSearch(form);
            setSearchResults(res.map((e) => e.Verbete));
          }}
          type="submit"
        >
          Pesquisar
        </button>
        <button
          onClick={() => {
            setSimpleSearchForm({});
            setShowSearchModal(false);
          }}
        >
          Cancelar
        </button>
      </div>
    </ReverseSearchFormStyle>
  );
}
