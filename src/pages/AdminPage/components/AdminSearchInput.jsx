import styled from "styled-components";
import { FaMagnifyingGlass } from "react-icons/fa6";
import colors from "../../../constants/colors";
import { useState } from "react";
import { createPortal } from "react-dom";
import SearchBar from "../../../components/SearchBar";

export default function AdminSearchInput({
  search,
  setWordInfo,
  words,
  showSearchBar,
  setShowSearchBar,
}) {
  const searchBar = document.getElementById("search-bar");

  const [searchBarInfo, setSearchBarInfo] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <InputContainer>
        <label htmlFor="admin-search-input">
          <FaMagnifyingGlass
            onClick={async () => {
              setShowSearchBar(true);
              if (searchInput == "") {
                setSearchBarInfo({ empty: "Defina uma busca!" });
                return;
              }

              const arr = words
                .filter((w) => {
                  if (
                    w.Verbete.includes(searchInput) ||
                    w.definicao?.includes(searchInput)
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                })
                .slice(0, 5);

              setSearchBarInfo(arr);
            }}
          />
        </label>
        <Input
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            if (e.target.value == "") {
              setShowSearchBar(false);
              return;
            }

            setShowSearchBar(true);
            const arr = words
              .filter((w) => {
                if (
                  w.Verbete.includes(e.target.value) ||
                  w.definicao?.includes(e.target.value)
                ) {
                  return true;
                } else {
                  return false;
                }
              })
              .slice(0, 5);
            setSearchBarInfo(arr);
          }}
          id="admin-search-input"
        />
        {showSearchBar &&
          createPortal(
            <SearchBar
              searchInput={searchInput}
              searchBarInfo={searchBarInfo}
              setWordInfo={setWordInfo}
              setShowSearchBar={setShowSearchBar}
            ></SearchBar>,
            searchBar
          )}
      </InputContainer>
    </>
  );
}

const InputContainer = styled.div`
  font-family: "Roboto", sans-serif;
  position: relative;
  width: 40%;
  height: 40%;
  // background-color: yellow;
  > label {
    position: absolute;
    right: 1vw;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.6vw;
    color: ${colors.darkGrey};
    > svg {
      cursor: pointer;
    }
  }
`;

const Input = styled.input`
  all: unset;
  background-color: ${colors.lightGrey};
  border-radius: 1vw;
  height: 100%;
  width: 100%;
  padding: 1.2vw;
  box-sizing: border-box;
  font-size: 1.5vw;
  color: black;
`;
