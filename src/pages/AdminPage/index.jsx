import styled from "styled-components";
import { useEffect, useState } from "react";
import Background from "../../constants/Background";
import useGetWordById from "../../services/hooks/api/words/useGetWordById";
import useSearch from "../../services/hooks/api/words/useSearch";
import AdminSearchInput from "./components/AdminSearchInput";
import useGetWords from "../../services/hooks/api/words/useGetWords.js";
import colors from "../../constants/colors";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { ColumnsToName } from "../WordPage/helpers";
import { RiEditFill } from "react-icons/ri";
import useDeleteWord from "../../services/hooks/api/words/useDeleteWord";
// input pra pesquisar palavra
// começar pela primeira palavra?
// filtrar por palavras
// criar nova palavra => modal

export default function AdminPage({ showSidebar, setShowSidebar }) {
  const { getWords, getWordsLoading, getWordsError } = useGetWords();

  const [wordInfo, setWordInfo] = useState({});
  const [words, setWords] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [info, setInfo] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columnToEdit, setColumnToEdit] = useState(null);

  const { getWordById, getWordByIdLoading, getWordByIdError } =
    useGetWordById();

  const { deleteWordLoading, deleteWordError, deleteWord } = useDeleteWord();
  const { search, searchLoading, searchError } = useSearch();

  useEffect(() => {
    async function getApiWordInfo() {
      try {
        const data = await getWordById(1);
        setWordInfo(data);
        setColumns(Object.keys(data).map((i) => ColumnsToName[i]));
        setInfo(Object.values(data));
      } catch (err) {
        console.log(err);
      }
    }

    async function getApiWords() {
      try {
        const data = await getWords();
        setWords(data);
      } catch (err) {
        console.log(err);
      }
    }
    console.log(wordInfo);

    if (!wordInfo.Verbete) {
      getApiWordInfo();
    }

    if (words.length <= 0) {
      getApiWords();
    }
  }, []);
  /* 
  {
    "C_digo": null,
    "Verbete": "aba",
    "verbeteIngles": null,
    "num": null,
    "indice": null,
    "cabeca_simb": null,
    "rubrica": null,
    "grupo": null,
    "classeGram": "s",
    "genero_num": "f",
    "volp": null,
    "fontes": null,
    "remissivaComplementar": null,
    "remissivaImperativa": null,
    "definicao": "(1) Qualquer prolongamento de telhado além da prumada externa; beiral. \n(2) peça de madeira usada no arremate da junção entre a parede e o teto de madeira\n(3) peça saliente em obras de alvenaria, carpintaria, serralheria, cantaria etc.",
    "f_rmula": null,
    "topicoIluminacaoNatural": null,
    "locucao_expressoes": "v. aba corrida\n",
    "etimologiaBruto": null,
    "ortoepia": null,
    "plural": null,
    "sinonimosVariantes": "beiral",
    "antonimos": null,
    "achega": null,
    "exemplo": null,
    "abonacao_citacoes_adagios": null,
    "outrasLinguas": null,
    "fig": null,
    "comentariosExtraBrutos": null,
    "comentariosExtraEditados": null,
    "obsrcc": null,
    "voceSabia": null,
    "id": 1
} */

  return (
    <Background>
      {getWordByIdLoading ? (
        <PageHeader showSidebar={showSidebar}>Carregando...</PageHeader>
      ) : (
        <>
          <PageHeader showSidebar={showSidebar}>
            <AdminSearchInput
              search={search}
              setWordInfo={setWordInfo}
              words={words}
              showSearchBar={showSearchBar}
              setShowSearchBar={setShowSearchBar}
            ></AdminSearchInput>
            <NewWordButton>
              Nova Palavra <FaPlus />
            </NewWordButton>
          </PageHeader>
          <Columns>
            <h1>{wordInfo.Verbete}</h1>
            {columns.map((c, i) => (
              <Column key={i}>
                <h1>{c}</h1>

                {columnToEdit == i ? (
                  <EditContainer>
                    <textarea
                      onChange={(e) => {
                        const newInfo = [...info];
                        newInfo[i] = e.target.value;
                        setInfo(newInfo);
                      }}
                      type="text"
                      value={info[i]}
                    />
                    <div className="buttons">
                      <button>Confirmar</button>
                      <button onClick={() => setColumnToEdit(null)} >Cancelar</button>
                    </div>
                  </EditContainer>
                ) : (
                  <>
                    <h2>{info[i]}</h2>
                    <div className="icon">
                      <RiEditFill
                        onClick={() => {
                          setColumnToEdit(i);
                        }}
                      />
                    </div>
                  </>
                )}

                {/*  */}
              </Column>
            ))}
          </Columns>
          <></>
        </>
      )}
    </Background>
  );
}

const EditContainer = styled.div`
  width: 86%;
  display: flex;
  justify-content: space-between;
  height: 100%;
  
>.buttons{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-left: 1px solid ${colors.darkGrey};
  box-sizing: border-box;
 >button:first-child{
  border: 1px solid ${colors.darkGrey};
  background-color: none;
  box-sizing: border-box;
 }
 >button:last-child{
  background-color: red;
  color: ${colors.lightGrey};
 }
 >button{
   all: unset;
   font-size: 1vw;
   font-weight: 600;
   border-radius: 0.2vw;
   display: flex;
   width: 90%;
   justify-content: center;
   align-items: center;
   cursor: pointer;
   height: 40%;
   align-items: center;

 }

 width: 14%;

}
> textarea {
    all: unset;
    background-color: white;
    width: 82%;
    height: 5vw;
    font-size: 1vw;
    padding: 0.5vw;
    box-sizing: border-box;
    border-radius: 0.5vw;
  }
`

const PageHeader = styled.div`
  position: absolute;
  top: 6vw;
  background-color: ${colors.darkGrey};
  opacity: 0.85;
  padding-top: 1vw;
  padding-bottom: 1vw;
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  color: ${colors.lightGrey};
`;

const NewWordButton = styled.button`
  all: unset;
  cursor: pointer;
  background-color: ${colors.lightGrey};
  color: ${colors.darkGrey};
  font-weight: 600;
  height: 80%;
  padding: 1vw;
  border-radius: 0.5vw;
  font-size: 1.2vw;
`;

const Columns = styled.div`
  margin-top: 8vw;
  width: 70%;
  color: ${colors.darkGrey};

  > h1 {
    font-size: 3vw;
    font-weight: 700;
    margin-bottom: 1.4vw;
  }
`;

const Column = styled.div`
  display: flex;
  border: 1px solid ${colors.darkGrey};
  margin-bottom: 0.3vw;
  height: fit-content;
  padding-top: 0.7vw;
  padding-bottom: 0.7vw;
  > .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
    > svg {
      cursor: pointer;
      font-size: 2vw;
    }
  }
  > h1 {
    display: flex;
    align-items: center;
    //justify-content: center;
    width: 40%;
    margin-right: 1vw;
    padding-left: 1vw;
    border-right: 1px solid ${colors.darkGrey};

    font-weight: 600;

    box-sizing: border-box;
  }
  > h2 {
    width: 70%;
    border-right: 1px solid ${colors.darkGrey};
    margin-right: 1vw;
    padding: 1vw;
  }

`;
