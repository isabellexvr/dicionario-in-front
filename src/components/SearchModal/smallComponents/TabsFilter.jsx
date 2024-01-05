import styled from "styled-components";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import { Buttons } from "../styledComponents";
import useFilterByTabs from "../../../services/hooks/api/words/useFilterByTabs";

const animatedComponents = makeAnimated();

export default function TabsFilter({ setSearchResults, setShowResults }) {
  const { filterByTabsLoading, filterByTabsError, filterByTabs } =
    useFilterByTabs();

  const [optionsToInclude, setOptionsToInclude] = useState([
    { value: "Inglês", label: "Inglês" },
    { value: "Num", label: "Num" },
    { value: "Cabeça/Símbolo", label: "Cabeça/Símbolo" },
    { value: "Rubrica", label: "Rubrica" },
    { value: "Grupo", label: "Grupo" },
    { value: "Fórmula", label: "Fórmula" },
    { value: "Fontes", label: "Fontes" },
    { value: "Locução/Expressões", label: "Locução/Expressões" },
    { value: "Etimologia", label: "Etimologia" },
    { value: "Ortoépia", label: "Ortoépia" },
    { value: "Plural", label: "Plural" },
    { value: "Sinônimos/Variantes", label: "Sinônimos/Variantes" },
    { value: "Antônimos", label: "Antônimos" },
    { value: "Achega", label: "Achega" },
    { value: "Exemplo", label: "Exemplo" },
  ]);
  const [optionsToDelete, setOptionsToDelete] = useState([
    { value: "Inglês", label: "Inglês" },
    { value: "Num", label: "Num" },
    { value: "Cabeça/Símbolo", label: "Cabeça/Símbolo" },
    { value: "Rubrica", label: "Rubrica" },
    { value: "Grupo", label: "Grupo" },
    { value: "Fórmula", label: "Fórmula" },
    { value: "Fontes", label: "Fontes" },
    { value: "Locução/Expressões", label: "Locução/Expressões" },
    { value: "Etimologia", label: "Etimologia" },
    { value: "Ortoépia", label: "Ortoépia" },
    { value: "Plural", label: "Plural" },
    { value: "Sinônimos/Variantes", label: "Sinônimos/Variantes" },
    { value: "Antônimos", label: "Antônimos" },
    { value: "Achega", label: "Achega" },
    { value: "Exemplo", label: "Exemplo" },
  ]);

  const [selectedToInclude, setSelectedToInclude] = useState([]);
  const [selectedToDelete, setSelectedToDelete] = useState([]);

  async function handleFilter() {
    if (selectedToDelete.length <= 0 && selectedToInclude.length <= 0) {
      return;
    }

    const obj = {
      containingTabs: selectedToInclude,
      notContainingTabs: selectedToDelete,
    };
   // console.log(obj);

    try {
      const res = await filterByTabs(obj);
      setShowResults(true);
      setSearchResults(res.map((e) => e.Verbete));
      //console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Container>
      <h1>Abas para incluir na pesquisa:</h1>
      <Select
        name="containingTabs"
        options={optionsToInclude}
        isMulti
        components={animatedComponents}
        placeholder="Selecione abas para incluir"
        styles={{
          placeholder: (base) => ({
            ...base,
            fontSize: "0.85vw",
            fontWeight: 400,
          }),
        }}
        onChange={(choice) => {
          const choicesHash = choice.reduce((hash, c) => {
            hash[c.value] = true;
            return hash;
          }, {});
          const filtered = optionsToDelete.filter((o) => !choicesHash[o.value]);

          setOptionsToDelete(filtered);
          setSelectedToInclude(choice.map((e) => e.value));
        }}
      />
      <h1>Abas para excluir na pesquisa:</h1>
      <Select
        name="notContainingTabs"
        options={optionsToDelete}
        isMulti
        components={animatedComponents}
        placeholder="Selecione abas para excluir"
        styles={{
          placeholder: (base) => ({
            ...base,
            fontSize: "0.85vw",
            fontWeight: 400,
          }),
        }}
        onChange={(choice) => {
          const choicesHash = choice.reduce((hash, c) => {
            hash[c.value] = true;
            return hash;
          }, {});

          const filtered = optionsToInclude.filter(
            (o) => !choicesHash[o.value]
          );
          setOptionsToInclude(filtered);
          setSelectedToDelete(choice.map((e) => e.value));
        }}
      />
      <Buttons>
        <button onClick={() => handleFilter()} type="submit">
          Pesquisar
        </button>
        <button>Cancelar</button>
      </Buttons>
    </Container>
  );
}

const Container = styled.div`
  // background-color: red;
  width: 90%;
  height: 90%;
  //display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    margin-bottom: 2%;
  }
  > h1 {
    padding: 2%;
    font-size: 0.9vw;
    font-weight: 600;
  }
`;
