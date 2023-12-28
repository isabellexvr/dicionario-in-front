import { ResultsBox, Results } from "../styledComponents";
import {
    MdKeyboardDoubleArrowRight,
  } from "react-icons/md";
  import { Tooltip } from "react-tooltip";

export default function ResultsBoxComponent({
    showResults, searchResults, setShowSearchModal, setShowResults, navigate
}){
    return(
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
              {searchResults.map((r, i) => (
                <li
                key={i}
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
    )
}