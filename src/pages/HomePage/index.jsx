import React from "react";
import styled from "styled-components";
import colors from "../../constants/colors";
import Background from "../../constants/Background";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function HomePage({ showSidebar, setShowSidebar }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Background showSidebar={showSidebar}>
      <CarouselContainer responsive={responsive}>
        <Carousel responsive={responsive}>
          <div>
            <Word>Item 1</Word>
          </div>
          <div>
            <Word>Item 2</Word>
          </div>
          <div>
            <Word>Item 3</Word>
          </div>
          <div>
            <Word>Item 4</Word>
          </div>
        </Carousel>
      </CarouselContainer>
    </Background>
  );
}

const CarouselContainer = styled.div`
  width: 80%; /* Adjust this width based on your layout */
  margin: 0 auto;
`;

const Word = styled.h1`
  font-size: 3vw;
  background-color: ${colors.lightYellow};
  width: fit-content;
  padding: 1.3vw;
  border-radius: 1.5vw;
  color: ${colors.darkGrey};
  font-weight: 600;

  @media (max-width: 600px) {
    font-size: 13vw;
    width: 70%;
    margin-left: 10vw;
    border-radius: 5vw;
    padding: 4vw;
    line-height: 13vw;
    text-align: center;
  }
`;
