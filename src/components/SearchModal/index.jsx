import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import useSimpleSearch from "../../services/hooks/api/words/useSimpleSearch";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import useReverseSearch from "../../services/hooks/api/words/useReverseSearch";
import {
  CloseIcon,
  ModalBody,
  ModalHeader,
  SearchModalContainer,
  SearchModalWindow,
  ShowResultsIcon,
  Tab,
  TabsContainer,
} from "./styledComponents";
import ResultsBoxComponent from "./smallComponents/ResultsBox";
import ReverseSearchForm from "./smallComponents/ReverseSearchForm";
import SimpleSearchForm from "./smallComponents/SimpleSearchForm";

const SearchTypes = ["Pesquisa Simples", "Pesquisa Reversa"];

export default function SearchModal({ setShowSearchModal }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const [simpleSearchForm, setSimpleSearchForm] = useState({});

  const [excludedRSWords, setExcludedRSWords] = useState({});
  const [excludedRSWordInput, setExcludedRSWordInput] = useState("");
  const [includedRSWords, setIncludedRSWords] = useState({});
  const [includedRSWordInput, setIncludedRSWordInput] = useState("");

  const { simpleSearch, simpleSearchLoading, simpleSearchError } =
    useSimpleSearch();
  const {
    reverseSearchData,
    reverseSearchLoading,
    reverseSearchError,
    reverseSearch,
  } = useReverseSearch();

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowSearchModal(false);
    setSimpleSearchForm({})
    setExcludedRSWords({})
    setExcludedRSWordInput("")
    setIncludedRSWords({})
    setIncludedRSWordInput("")
  }

  return (
    <>
      <SearchModalContainer onClick={() => setShowSearchModal(false)} />

      <SearchModalWindow>
        <ResultsBoxComponent
          showResults={showResults}
          searchResults={searchResults}
          setShowSearchModal={setShowSearchModal}
          setShowResults={setShowResults}
          navigate={navigate}
        />

        <ShowResultsIcon
          onClick={() => setShowResults(!showResults)}
          areResultsHidden={showResults}
          data-tooltip-id="show-results"
          data-tooltip-content="Mostrar resultados"
          data-tooltip-place="right"
        />
        <Tooltip id="show-results" />

        <CloseIcon
          data-tooltip-id="close-icon"
          data-tooltip-content="Fechar pesquisa"
          data-tooltip-place="top"
          onClick={() => handleCloseModal()}
        />
        <Tooltip id="close-icon" />
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
            <SimpleSearchForm
              simpleSearch={simpleSearch}
              setSearchResults={setSearchResults}
              setShowResults={setShowResults}
              simpleSearchForm={simpleSearchForm}
              setSimpleSearchForm={setSimpleSearchForm}
            />
          ) : (
            <ReverseSearchForm
              reverseSearch={reverseSearch}
              setSearchResults={setSearchResults}
              setShowResults={setShowResults}
              excludedRSWords={excludedRSWords}
              setExcludedRSWords={setExcludedRSWords}
              excludedRSWordInput={excludedRSWordInput}
              setExcludedRSWordInput={setExcludedRSWordInput}
              includedRSWords={includedRSWords}
              setIncludedRSWords={setIncludedRSWords}
              includedRSWordInput={includedRSWordInput}
              setIncludedRSWordInput={setIncludedRSWordInput}
            />
          )}
        </ModalBody>
      </SearchModalWindow>
    </>
  );
}
