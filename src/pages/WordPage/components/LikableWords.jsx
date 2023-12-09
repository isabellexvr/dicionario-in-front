import styled from "styled-components";

export default function HighlightWords({ text, hashtable, navigate }) {
  const words = text?.split(/(\s+)/); 

  return (
    <p>
      {words?.map((word, index) => {
        if (!/\s+/.test(word)) {
          if (hashtable[word]) {
            return (
              <Highlight
                onClick={() => {
                  navigate(`/palavra/${word}`);
                }}
                key={index}
              >
                {word}
              </Highlight>
            );
          }
          return <span key={index}>{word}</span>;
        }
        return <span key={index}>{word}</span>;
      })}
    </p>
  );
}

export const Highlight = styled.a`
  text-decoration: underline;
  cursor: pointer;
  white-space: nowrap;
 // background-color: red;
`;
