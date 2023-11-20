import styled from "styled-components";
import { useEffect, useState } from "react";
import Background from "../../constants/Background";
import useGetWordById from "../../services/hooks/api/words/useGetWordById";
import useSearch from "../../services/hooks/api/words/useSearch";
import AdminSearchInput from "./components/AdminSearchInput";
import useGetWords from "../../services/hooks/api/words/useGetWords.js";
import colors from "../../constants/colors";
import { FaPlus, FaTrash, FaCheck } from "react-icons/fa6";
import { ColumnsToName, NameToColumns } from "../WordPage/helpers";
import { RiEditFill } from "react-icons/ri";
import useDeleteWord from "../../services/hooks/api/words/useDeleteWord";
import { MdCancel } from "react-icons/md";
import useEditWord from "../../services/hooks/api/words/useEditWord";
import { jwtDecode } from "jwt-decode";
import useUserInfo from "../../contexts/hooks/useUserInfo";
import { Navigate } from "react-router-dom";

// input pra pesquisar palavra
// começar pela primeira palavra?
// filtrar por palavras
// criar nova palavra => modal

export default function AdminPage({ showSidebar, setShowSidebar }) {
  const { getWords, getWordsLoading, getWordsError } = useGetWords();
  const { userInfo } = useUserInfo();

  const [wordInfo, setWordInfo] = useState({});
  const [words, setWords] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [info, setInfo] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columnToEdit, setColumnToEdit] = useState(null);
  const [selectedWord, setSelectedWord] = useState(1)

  const { getWordById, getWordByIdLoading, getWordByIdError } =
    useGetWordById();

  const { deleteWordLoading, deleteWordError, deleteWord } = useDeleteWord();
  const { editWordLoading, editWordError, editWord } = useEditWord();
  const { search, searchLoading, searchError } = useSearch();

  async function handleEditWord(column, index) {
    const newWordInfo = { ...wordInfo, [NameToColumns[column]]: info[index] };
    delete newWordInfo.id;

    try {
      const res = await editWord(wordInfo.id, newWordInfo);
      setColumnToEdit(null);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const decoded = jwtDecode(userInfo);
    if (decoded.isAdmin) {
      async function getApiWordInfo() {
        try {
          const data = await getWordById(selectedWord);
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
      getApiWordInfo();

      if (words.length <= 0) {
        getApiWords();
      }
    } else {
      return <Navigate to="/login" />;
    }
  }, [selectedWord]);

  if (info.length > 0) {
    const o = {};
    info.forEach((e) => {});
  }

  return (
    <PageBackground showSidebar={showSidebar} >
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
              setSelectedWord={setSelectedWord}

            ></AdminSearchInput>
            <NewWordButton>
              Nova Palavra <FaPlus />
            </NewWordButton>
          </PageHeader>
          <Columns>
            <div className="column-header">
              <h1>{wordInfo.Verbete}</h1>
              <div
                className="delete"
                onClick={() => {
                  if (
                    confirm(
                      "Você tem certeza que quer deletar essa palavra?\n\nESSA AÇÃO EXCLUIRÁ A PALAVRA E TODO O SEU CONTEÚDO DO BANCO DE DADOS"
                    )
                  ) {
                  } else {
                  }
                }}
              >
                <FaTrash />
                <h1>Deletar Palavra</h1>
              </div>
            </div>

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
                      <button onClick={() => handleEditWord(c, i)}>
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            confirm("Tem certeza que quer cancelar a edição?")
                          ) {
                            setColumnToEdit(null);
                          } else {
                          }
                        }}
                      >
                        <MdCancel />
                      </button>
                    </div>
                  </EditContainer>
                ) : (
                  <>
                    <h2>{info[i]}</h2>
                    <EditIcon isEditable={columnToEdit !== null} >
                      <RiEditFill
                        onClick={() => {
                          setColumnToEdit(i);
                        }}
                      />
                    </EditIcon>
                  </>
                )}

                {/*  */}
              </Column>
            ))}
          </Columns>
          <></>
        </>
      )}
    </PageBackground>
  );
}

const EditContainer = styled.div`
  width: 86%;
  display: flex;
  justify-content: space-between;
  height: 90%;

  > .buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-left: 1px solid ${colors.darkGrey};
    box-sizing: border-box;
    > button:first-child {
      border: 1px solid ${colors.darkGrey};
      background-color: none;
      box-sizing: border-box;
    }
    > button:last-child {
      background-color: red;
      color: ${colors.lightGrey};
    }
    > button {
      all: unset;
      font-size: 1vw;
      font-weight: 600;
      border-radius: 0.2vw;
      display: flex;
      width: 60%;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      height: 40%;
      > svg {
        font-size: 1.4vw;
      }
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
`;

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
  > .column-header {
    display: flex;
    width: 100%;
    // background-color: red;
    justify-content: space-between;
    align-items: center;

    > h1 {
      font-size: 3vw;
      font-weight: 700;
      margin-bottom: 1.4vw;
    }
    > .delete {
      display: flex;
      flex-direction: column;
      width: 10%;
      cursor: pointer;

      align-items: center;
      > svg {
        font-size: 1.5vw;
        //margin-right: 1.7vw;
        color: red;
      }
      > h1 {
        width: 100%;
        font-size: 1vw;
        font-weight: 600;
        text-align: center;
      }
    }
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

const EditIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  pointer-events: ${p => p.isEditable ? "none" : "initial"};
  > svg {
    cursor: pointer;
    font-size: 2vw;
  }
`;

const PageBackground = styled.div`
    padding-left: ${(p) => (p.showSidebar ? "20vw" : "5vw")};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 8vw;
    background-color: ${colors.lightGrey};
    font-family: "Roboto", sans-serif;


`