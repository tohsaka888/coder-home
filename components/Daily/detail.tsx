import { baseUrl } from "config/baseUrl";
import { NextPage } from "next";
import React from "react";
import { Question } from "typings";
import { DetailLayout } from "./index.styled";
import QuestionPart from "./QuestionPart";

const Detail = ({ questions }: { questions: Question[] }) => {
  return (
    <DetailLayout>
      {questions.map((question, index) => (
        <QuestionPart question={question} key={question.id} index={index} />
      ))}
    </DetailLayout>
  );
};

export default Detail;
