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
  CloseIcon,
  ModalBody,
  ModalHeader,
  SearchForm,
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

  const { simpleSearch, simpleSearchLoading, simpleSearchError } =
    useSimpleSearch();
  const {
    reverseSearchData,
    reverseSearchLoading,
    reverseSearchError,
    reverseSearch,
  } = useReverseSearch();

  const navigate = useNavigate();

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
            <SimpleSearchForm simpleSearch={simpleSearch} setSearchResults={setSearchResults} setShowResults={setShowResults}/>
          ) : (
            <ReverseSearchForm reverseSearch={reverseSearch} setSearchResults={setSearchResults} setShowResults={setShowResults}/>
          )}
        </ModalBody>
      </SearchModalWindow>
    </>
  );
}
