import {
  AddOrDeleteButton,
  AddedReverseSearchWords,
  DeleteButtonTooltip,
  ReverseSearchFormStyle,
  ReverseSearchWord,
} from "../styledComponents";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import { Tooltip } from "react-tooltip";

export default function ReverseSearchForm({
  reverseSearch,
  setSearchResults,
  setShowResults,
  excludedRSWords,
  setExcludedRSWords,
  excludedRSWordInput,
  setExcludedRSWordInput,
  includedRSWords,
  setIncludedRSWords,
  includedRSWordInput,
  setIncludedRSWordInput,
}) {
  function addWords(input, words, setter) {
    const inputHash = {};
    input.split(" ").forEach((e) => (inputHash[e] = true));
    setter({ ...words, ...inputHash });
  }

  return (
    <ReverseSearchFormStyle onSubmit={(e) => e.preventDefault()}>
      <h1>Adicione ou exclua palavras específicas da sua pesquisa</h1>

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
          data-tooltip-id="add-button"
          data-tooltip-content="Adicionar palavra"
          data-tooltip-place="right"
          onClick={() => {
            if (includedRSWordInput !== "")
              addWords(
                includedRSWordInput,
                includedRSWords,
                setIncludedRSWords
              );

            setIncludedRSWordInput("");
          }}
        >
          <IoMdAdd />
        </AddOrDeleteButton>
        <Tooltip id="add-button" />
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
          data-tooltip-id="delete-button"
          data-tooltip-content="Excluir palavra (requer ao menos uma palavra incluída)"
          data-tooltip-place="right"
          disabled={Object.keys(includedRSWords).length == 0}
          onClick={() => {
            if (excludedRSWordInput !== "")
              addWords(
                excludedRSWordInput,
                excludedRSWords,
                setExcludedRSWords
              );
            setExcludedRSWordInput("");
          }}
        >
          <RiSubtractFill />
        </AddOrDeleteButton>
        <DeleteButtonTooltip  id="delete-button" />
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
