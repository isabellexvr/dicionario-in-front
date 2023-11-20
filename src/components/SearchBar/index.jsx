import styled from "styled-components";
import { FaArrowRight, FaArrowUp } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import colors from "../../constants/colors";

export default function SearchBar({
  searchInput,
  searchBarInfo,
  setWordInfo,
  setShowSearchBar,setSelectedWord
}) {
  function getSubstring(string, substring) {
    if (string == undefined) return "";
    const startIndex = string.indexOf(substring);
    const endIndex = startIndex + substring.length;

    if (startIndex !== -1) {
      const result =
        string.substring(startIndex - 5, startIndex) +
        string +
        string.substring(endIndex, endIndex + 5);
      return result;
    }
    return "";
  }

  return (
    <SearchBarContainer>
      <CloseContainer
        onClick={() => {
          setShowSearchBar(false);
        }}
      >
        <div className="close">
          <FaArrowUp />
        </div>
      </CloseContainer>
      {searchBarInfo.empty ? (
        <Word>{searchBarInfo.empty}</Word>
      ) : (
        <>
          {searchBarInfo.map((w,i) => (
            <Word>
              <Verbete onClick={() => {
                setSelectedWord(w.id)
              }} >
                <FaArrowRight />
                {w.Verbete}
              </Verbete>

              <Definicao>
                <GoDotFill />
                ...{getSubstring(w.definicao, searchInput)}...
              </Definicao>
            </Word>
          ))}
        </>
      )}
    </SearchBarContainer>
  );
}

const CloseContainer = styled.div`
  cursor: pointer;
  width: 100%;

  margin-bottom: 2vw;

  .close {
    padding-top: 0.5vw;
    padding-bottom: 0.5vw;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    > svg {
      color: grey;
    }
  }
  :hover {
    background-color: lightgray;
    > svg {
      color: white;
    }
  }
`;

const SearchBarContainer = styled.div`
  background-color: white;
  font-family: "Roboto", sans-serif;
  width: 40%;
  height: fit-content;
  position: absolute;
  top: 12.5vw;
  left: 36.5%;
  transform: translateX(-50%);
  padding: 2vw;
  box-sizing: border-box;
`;

const Word = styled.div`
  color: ${colors.darkGrey};
  margin-bottom: 2vw;
`;

const Definicao = styled.div`
  font-size: 1vw;

  > svg {
    margin-right: 1vw;
  }
`;

const Verbete = styled.div`
cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.5vw;
  font-weight: 600;
  margin-bottom: 0.5vw;
  > svg {
    margin-right: 1vw;
  }
`;
