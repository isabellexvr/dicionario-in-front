import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { TbBracketsContainStart, TbBracketsContainEnd } from "react-icons/tb";
import forms from "../../helpers/forms";
import useSimpleSearch from "../../services/hooks/api/words/useSimpleSearch";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import useReverseSearch from "../../services/hooks/api/words/useReverseSearch";
import {
  AddedReverseSearchWords,
  CloseIcon,
  ModalBody,
  ModalHeader,
  ReverseSearchForm,
  ReverseSearchWord,
  SearchForm,
  SearchModalContainer,
  SearchModalWindow,
  ShowResultsIcon,
  Tab,
  TabsContainer,
} from "./styledComponents";
import ResultsBoxComponent from "./smallComponents/ResultsBox";

const SearchTypes = ["Pesquisa Simples", "Pesquisa Reversa"];

export default function SearchModal({ setShowSearchModal }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const [simpleSearchForm, setSimpleSearchForm] = useState({});

  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const [includedRSWords, setIncludedRSWords] = useState({});
  const [includedRSWordInput, setIncludedRSWordInput] = useState("");

  const [excludedRSWords, setExcludedRSWords] = useState({});
  const [excludedRSWordInput, setExcludedRSWordInput] = useState("");

  const { simpleSearch, simpleSearchLoading, simpleSearchError } =
    useSimpleSearch();
  const {
    reverseSearchData,
    reverseSearchLoading,
    reverseSearchError,
    reverseSearch,
  } = useReverseSearch();

  // const navigate = useNavigate();

  function addWords(input, words, setter) {
    const inputHash = {};
    input.split(" ").forEach((e) => (inputHash[e] = true));
    setter({ ...words, ...inputHash });
  }

  /*   export type ReverseSearchType = {
    contains: string[],
    doesNotContain: string[]
} */

  return (
    <>
      <SearchModalContainer onClick={() => setShowSearchModal(false)} />

      <SearchModalWindow>
        <ResultsBoxComponent
          showResults={showResults}
          searchResults={searchResults}
          setShowSearchModal={setShowSearchModal}
          setShowResults={setShowResults}
        />

        <ShowResultsIcon
          onClick={() => setShowResults(!showResults)}
          areResultsHidden={showResults}
          data-tooltip-id="show-results"
          data-tooltip-content="Mostrar resultados"
          data-tooltip-place="right"
        />
        <Tooltip id="show-results" />

        <CloseIcon onClick={() => setShowSearchModal(false)} />
        <ModalHeader>
          <FiSearch />
          Pesquisa
        </ModalHeader>
        <TabsContainer>
          {SearchTypes.map((t, i) => (
            <Tab
              onClick={() => {
                setSelectedTab(i);
              }}
              isSelected={selectedTab == i}
              key={i}
            >
              {t}
            </Tab>
          ))}
        </TabsContainer>
        <ModalBody>
          {selectedTab === 0 ? (
            <SearchForm
              onSubmit={(e) =>
                forms.sendFormWithQuery(
                  e,
                  simpleSearch,
                  setSearchResults,
                  simpleSearchForm,
                  ""
                )
              }
            >
              <div className="input">
                <label htmlFor="startsWith">Iniciado por:</label>
                <label htmlFor="startsWith" className="icon-label">
                  <TbBracketsContainStart />
                </label>
                <input
                  onChange={(e) =>
                    forms.handleForm(e, simpleSearchForm, setSimpleSearchForm)
                  }
                  id="startsWith"
                  name="startsWith"
                ></input>
              </div>

              <p>e/ou</p>

              <div className="input">
                <label htmlFor="endsWith">Terminado por:</label>
                <label htmlFor="endsWith" className="icon-label">
                  <TbBracketsContainEnd />
                </label>
                <input
                  onChange={(e) =>
                    forms.handleForm(e, simpleSearchForm, setSimpleSearchForm)
                  }
                  id="endsWith"
                  name="endsWith"
                ></input>
              </div>
              <div className="buttons">
                <button
                  onClick={() => {
                    setShowResults(true);
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
            </SearchForm>
          ) : (
            <ReverseSearchForm onSubmit={(e) => e.preventDefault()}>
              <h1>
                Adicione palavras desejadas que estão dentro e/ou fora da
                definição desejada:
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
                  onChange={(e) => setIncludedRSWordInput(e.target.value)}
                  onKeyDown={(e) => {if(e.key == "Enter"){
                    addWords(includedRSWordInput, includedRSWords, setIncludedRSWords)
                  }}}
                />

                <button
                  onClick={() => {
                    const inputHash = {};
                    includedRSWordInput
                      .split(" ")
                      .forEach((e) => (inputHash[e] = true));
                    setIncludedRSWords({ ...includedRSWords, ...inputHash });
                  }}
                >
                  <IoMdAdd />
                </button>
              </div>

              <div className="input">
                <label htmlFor="delete">Excluir Palavra:</label>

                <input
                  id="delete"
                  name="name"
                  onChange={(e) => setExcludedRSWordInput(e.target.value)}
                  onKeyDown={(e) => {if(e.key == "Enter"){
                    addWords(excludedRSWordInput, excludedRSWords, setExcludedRSWords)
                  }}}
                />

                <button
                  onClick={ () => addWords(excludedRSWordInput, excludedRSWords, setExcludedRSWords)}
                >
                  <RiSubtractFill />
                </button>
              </div>
              <div className="buttons">
                <button
                  onClick={async () => {
                    setShowResults(true);
                    const form = {contains: Object.keys(includedRSWords), doesNotContain: Object.keys(excludedRSWords)}
                    console.log(form)
                    const res = await reverseSearch(form);
                    console.log(res)
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
            </ReverseSearchForm>
          )}
        </ModalBody>
      </SearchModalWindow>
    </>
  );
}
