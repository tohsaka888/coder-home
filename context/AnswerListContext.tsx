import { createContext, useContext } from "react";
import { SubmitQuestion } from "typings";

type Props = {
  answerList: SubmitQuestion[];
  setAnswerList: Function;
};

export const AnswerListContext = createContext<Props>(null!);

export const useAnswerList = () => {
  return useContext(AnswerListContext);
};
