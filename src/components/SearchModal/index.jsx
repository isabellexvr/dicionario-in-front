import styled from "styled-components";
import colors from "../../constants/colors";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { TbBracketsContainStart, TbBracketsContainEnd } from "react-icons/tb";
import forms from "../../helpers/forms";
import useSearch from "../../services/hooks/api/words/useSearch";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";

const SearchTypes = ["Pesquisa Simples", "Pesquisa Reversa"];

export default function SearchModal({ setShowSearchModal }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [form, setForm] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const { search, searchLoading, searchError } = useSearch();
  const navigate = useNavigate();

  return (
    <SearchModalContainer>
      <SearchModalWindow>
        <ResultsBox areResultsHidden={showResults}>
          <div className="header">
            <h1>Resultados</h1>
            <MdKeyboardDoubleArrowRight
              onClick={() => setShowResults(!showResults)}
              data-tooltip-id="hide-results"
              data-tooltip-content="Esconder resultados"
              data-tooltip-place="left"
            />
            <Tooltip id="hide-results" />
          </div>

          <Results>
            {searchResults.length > 0 ? (
              <ul>
                {searchResults.map((r) => (
                  <li
                    onClick={() => {
                      navigate(`palavra/${r}`);
                      setShowSearchModal(false);
                    }}
                  >
                    {r}
                  </li>
                ))}
              </ul>
            ) : (
              <span>Faça uma pesquisa para ver os resultados...</span>
            )}
          </Results>
        </ResultsBox>
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
                forms.sendFormWithQuery(e, search, setSearchResults, form, "")
              }
            >
              <div className="input">
                <label htmlFor="startsWith">Iniciado por:</label>
                <label htmlFor="startsWith" className="icon-label">
                  <TbBracketsContainStart />
                </label>
                <input
                  onChange={(e) => forms.handleForm(e, form, setForm)}
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
                  onChange={(e) => forms.handleForm(e, form, setForm)}
                  id="endsWith"
                  name="endsWith"
                ></input>
              </div>
              <div className="buttons">
                <button
                  onClick={() => {
                    console.log(searchResults);
                    setShowResults(true);
                  }}
                  type="submit"
                >
                  Pesquisar
                </button>
                <button
                  onClick={() => {
                    setForm({});
                    setShowSearchModal(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </SearchForm>
          ) : (
            <></>
          )}
        </ModalBody>
      </SearchModalWindow>
    </SearchModalContainer>
  );
}

const ShowResultsIcon = styled(MdKeyboardDoubleArrowLeft)`
  left: 0.5vw;
  top: 0.5vw;
  position: absolute;
  color: ${colors.lightGrey};
  font-size: 2vw;
  cursor: pointer;
  display: ${(p) => (p.areResultsHidden ? "none" : "initial")};
`;

const Results = styled.div`
  width: 90%;
  height: 80%;
  background-color: white;
  border: 2px solid ${colors.mediumGrey};
  border-radius: 1vw;
  padding: 1vw;
  box-sizing: border-box;
  font-size: 0.9vw;
  overflow-y: scroll;
  > ul {
    > li {
      cursor: pointer;
      text-decoration: underline;
      margin-bottom: 2px;
    }
  }
`;

const ResultsBox = styled.div`
  position: absolute;
  width: 15vw;
  height: 28vw;
  background-color: ${colors.lightGrey};
  left: -15vw;
  top: -2px;
  z-index: 1;
  border-radius: 1vw 0 0 1vw;
  border: 2px solid ${colors.lightGrey};
  box-sizing: border-box;
  display: flex;
  display: ${(p) => (p.areResultsHidden ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  > .header {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    color: ${colors.darkGrey};
    > svg {
      font-size: 2vw;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
    > h1 {
      margin-bottom: 1vw;

      font-weight: 700;
      font-size: 1.75vw;
    }
  }
`;

const CloseIcon = styled(IoMdCloseCircle)`
  position: absolute;
  right: 1vw;
  top: 1vw;
  font-size: 2vw;
  color: red;
  cursor: pointer;
`;

const SearchModalContainer = styled.div`
  font-family: "Roboto", sans-serif;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  //cursor: pointer;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 5;
`;

const SearchModalWindow = styled.div`
  position: fixed;
  background-color: ${colors.darkGrey};
  border: 2px solid ${colors.mediumGrey};
  border-radius: 0 1vw 1vw 0;
  padding: 2vw;
  box-sizing: border-box;
  width: 37vw;
  height: 28vw;
  top: 50%; /* Set the top position to 50% of the viewport */
  left: 50%; /* Set the left position to 50% of the viewport */
  transform: translate(-40%, -50%);
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10;
`;

const ModalHeader = styled.div`
  height: 17%;
  width: 60%;
  //background-color: yellow;
  > svg {
    color: ${colors.yellow};
  }
  color: ${colors.lightGrey};
  font-weight: 700;
  text-align: center;
  font-size: 3vw;
  display: flex;
  margin-bottom: 1vw;
  align-items: center;
  justify-content: space-evenly;
`;

const TabsContainer = styled.div`
  display: flex;
  width: 95%;
  height: 8%;
  //background-color: ${colors.mediumGrey};
  //margin-bottom: 1vw;
`;

const Tab = styled.div`
  background-color: white;
  color: ${colors.darkGrey};
  opacity: ${(p) => (p.isSelected ? "1" : "0.5")};
  cursor: pointer;
  font-size: 1vw;
  font-weight: 600;
  display: flex;
  align-items: center;
  padding-left: 0.7vw;
  padding-right: 0.7vw;
  border-radius: 0.3vw 0.3vw 0 0;
  margin-right: 0.5vw;
`;

const ModalBody = styled.div`
  width: 95%;
  height: 70%;
  background-color: white;
  border-radius: 0 0.5vw 0.5vw 0.5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchForm = styled.form`
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > p {
    width: 83%;
    //text-align: center;
    margin-top: 0.5vw;
    margin-bottom: 0.5vw;
    font-size: 0.95vw;
    //font-weight: 600;
  }
  > .input {
    width: 95%;

    display: flex;
    align-items: center;

    position: relative;

    > input {
      all: unset;
      background-color: white;
      border: 1px solid ${colors.mediumGrey};
      padding: 1vw;
      box-sizing: border-box;
      margin-left: 2vw;
      border-radius: 0.5vw;
      width: 77%;
    }
    > label {
      font-weight: 600;
      font-size: 0.95vw;
      width: 32%;
    }
    > .icon-label {
      position: absolute;
      right: 1vw;
      top: 1vw;
      font-size: 1.6vw;
      color: ${colors.darkGrey};
      width: fit-content;
    }
  }
  > .buttons {
    width: 50%;
    margin-top: 1vw;
    font-weight: 600;
    display: flex;
    justify-content: space-evenly;
    height: 17%;
    font-size: 1vw;
    > button:first-child {
      background-color: ${colors.darkGrey};
      color: white;
      border: none;
    }
    > button {
      all: unset;
      padding: 0.6vw;
      border-radius: 0.2vw;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: white;
      border: 1px solid ${colors.mediumGrey};
      box-sizing: border-box;
    }
  }
`;
