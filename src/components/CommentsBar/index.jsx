import colors from "../../constants/colors";
import styled from "styled-components";
import useGetComments from "../../services/hooks/api/comments/useGetComments";
import { useEffect, useState } from "react";
import forms from "../../helpers/forms";
import usePostComment from "../../services/hooks/api/comments/usePostComment";

export default function CommentsBar({ wordId, logged }) {
  const { getCommentsData, getCommentsLoading, getCommentsError, getComments } =
    useGetComments();
  const { postCommentLoading, postCommentError, postComment } =
    usePostComment();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function getCommentsByWord() {
      try {
        const data = await getComments(wordId);
        setComments(data);
      } catch (err) {
        console.log(err);
      }
    }
    getCommentsByWord();
  }, [wordId, postCommentLoading]);

  return (
    <Comments>
      <div className="comments-container">
        {comments.map((c) => (
          <Comment>
            <h1>{c.usuarios.nome}</h1>
            <h2>@{c.usuarios.userName}</h2>
            <p>
              {" "}
              {">"} {c.comentario}
            </p>
          </Comment>
        ))}
      </div>

      {typeof logged == "string" ? (
        <>
          {" "}
          <NewComment
            onSubmit={(e) =>
              forms.sendFormWithoutState(e, postComment, newComment)
            }
          >
            <input
              name="comentario"
              onChange={(e) =>
                forms.handleForm(
                  e,
                  { comentario: newComment, palavraId: wordId },
                  setNewComment
                )
              }
              type="text"
              placeholder="Comente aqui..."
            />
            <button type="submit">Comentar</button>
          </NewComment>
        </>
      ) : (
        <LoginWarning>Faça Login Para Comentar</LoginWarning>
      )}
    </Comments>
  );
}

const Comments = styled.div`
  background-color: ${colors.mediumGrey};
  height: 65%;
  width: 25%;
  border-radius: 1vw;
  margin-left: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  > .comments-container {
    height: 80%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
  }
  @media (max-width: 600px) {
    height: fit-content;
    width: 80%;
    margin-left: 10%;
  }
`;

const Comment = styled.div`
  padding: 2vw;
  padding-bottom: 0;
  box-sizing: border-box;

  > h1 {
    font-size: 1.5vw;
    font-weight: 700;
  }
  > h2 {
    font-size: 1vw;
    color: ${colors.darkGrey};
    cursor: pointer;
  }
  > p {
    margin-top: 0.5vw;
    font-size: 1.1vw;
  }
  @media (max-width: 600px) {
    padding: 4vw;
    > h1 {
      font-size: 4vw;
      margin-top: 2vw;
    }
    > h2 {
      font-size: 3.2vw;
      margin-top: 0.5vw;
    }
    > p {
      margin-top: 2vw;
      font-size: 3vw;
    }
  }
`;

const NewComment = styled.form`
  padding: 2vw;
  display: flex;
  height: 10%;
  position: absolute;
  bottom: 0;
  ::placeholder {
    color: ${colors.darkGrey};
  }
  > input {
    all: unset;
    width: 70%;
    border-radius: 0.5vw 0 0 0.5vw;
    height: 90%;
    padding: 0.5vw;
    box-sizing: border-box;
    border: 2px solid ${colors.darkGrey};
    font-size: 1vw;
    color: black;
    background-color: white;
  }
  > button {
    all: unset;
    cursor: pointer;
    width: 30%;
    background-color: ${colors.darkGrey};
    border-radius: 0 0.5vw 0.5vw 0;
    height: 90%;
    font-size: 1vw;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
  }
  @media (max-width: 600px) {
    height: 20%;

    width: 94%;

    > input {
      font-size: 3vw;
      padding: 1.5vw;
    }
    > button {
      font-size: 3vw;
    }
  }
`;

const LoginWarning = styled.div`
  background-color: ${colors.darkGrey};
  color: ${colors.lightGrey};
width: 100%;
height: 20%;
display: flex;
justify-content: center;
align-items: center;
font-weight: 700;
`;