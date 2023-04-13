import styled from "styled-components";

export const DetailLayout = styled.div`
  margin: 16px auto;
  width: 50vw;
  background-color: aliceblue;
  padding: 16px 24px;
  border-radius: 16px;
  box-shadow: 0px 0px 10px 5px #efefef;
`;

export const QuestionTitle = styled.div<{ isCorrect?: boolean }>`
  font-size: 18px;
  font-weight: bold;
  margin: 3px 0px;
  color: ${({ isCorrect }) => {
    if (isCorrect === undefined) {
      return "#000";
    } else if (isCorrect === true) {
      return "green";
    } else if (isCorrect === false) {
      return "red";
    }
  }};
`;

export const QuestionContainer = styled.div`
  margin: 16px 0px;
`;
