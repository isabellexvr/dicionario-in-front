import styled from "styled-components";
import colors from "../../../constants/colors";
import { useState } from "react";

export default function Input({
  setShownWords,
  allWords,
  children,
  placeholder,
  search,
  searchLoading,
}) {
  async function handleInput() {
    try {
      const res = await search(searchInput);
      const arr = res.map((e) => e.Verbete);
     // console.log(arr);
      setShownWords(arr);
    } catch (err) {
      console.log(err);
    }
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
        <button
          type="submit"
          onClick={() => {
            handleInput(searchInput);
          }}
        >
          {children}
        </button>
        <SearchInput
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleInput(searchInput);
            }
          }}
          placeholder={placeholder}
          onChange={handleSearchInput}
        />
      </div>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  width: 92%;
  margin-top: 1.3vw;
  > .input {
    position: relative;
    > button {
      all: unset;
      position: absolute;
      right: 1vw;
      top: 50%;
      transform: translate(-50%, -50%);
      color: ${colors.darkGrey};
      font-size: 1.5vw;
      cursor: pointer;
    }
  }
  ::placeholder {
    font-size: 1vw;
  }
  @media (max-width: 600px) {
    > .input {
      > button {
        font-size: 7vw;
        top: 55%;
      }
    }
    ::placeholder{
      font-size: 3.7vw;
    }
  }
`;

const SearchInput = styled.input`
  all: unset;
  background-color: white;
  border: 2px solid ${colors.mediumGrey};
  box-sizing: border-box;
  color: ${colors.darkGrey};
  padding: 1.5vw;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2vw;
  border-radius: 0.6vw;
  font-size: 1vw;

  @media (max-width: 600px) {
    height: 15vw;
    font-size: 5vw;
    padding: 4vw;

    border-radius: 3vw;
  }
`;
