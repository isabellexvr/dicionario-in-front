import styled from "styled-components";
import colors from "../../../constants/colors";
import { useState } from "react";

export default function Input({
  setSelectedLetter,
  setShownWords,
  allWords,
  children,
  placeholder,
}) {
  function handleInput(data) {
    const newArr = allWords.filter((w) => w.includes(data));
    setShownWords(newArr);
  }
  const [searchInput, setSearchInput] = useState("");
  function handleSearchInput(e) {
    if (e.target.value == "") {
      setShownWords(allWords);
    } else {
      setSearchInput(e.target.value);
    }
  }
  return (
    <InputContainer>
      <div className="input">
        <label
          onClick={() => {
            handleInput(searchInput);
          }}
        >
          {children}
        </label>
        <SearchInput placeholder={placeholder} onChange={handleSearchInput} />
      </div>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  width: 85%;
  margin-top: 1.3vw;
  > .input {
    position: relative;
    > label {
      position: absolute;
      right: 1vw;
      top: 50%;
      transform: translate(-50%, -50%);
      color: ${colors.darkGrey};
      font-size: 1.5vw;
      cursor: pointer;
    }
  }
`;

const SearchInput = styled.input`
  all: unset;
  background-color: ${colors.lightGrey};
  color: ${colors.darkGrey};
  padding: 1.5vw;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3vw;
  border-radius: 0.6vw;
  font-size: 1.2vw;
`;
