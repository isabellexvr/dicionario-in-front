import forms from "../../../helpers/forms";
import { useState } from "react";
import { SearchForm } from "../styledComponents";
import { TbBracketsContainStart, TbBracketsContainEnd } from "react-icons/tb";

export default function SimpleSearchForm({ simpleSearch, setSearchResults, setShowResults, simpleSearchForm, setSimpleSearchForm }) {


  return (
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
  );
}
