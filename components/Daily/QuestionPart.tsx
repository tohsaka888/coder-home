import { message, Radio, Space } from "antd";
import React, { useState } from "react";
import { Question, SubmitQuestion } from "typings";
import { QuestionContainer, QuestionTitle } from "./index.styled";
import { useAnswerList } from "context/AnswerListContext";

function QuestionPart({
  question,
  index,
  isCorrect,
}: {
  question: Question;
  index: number;
  isCorrect?: boolean;
}) {
  const { setAnswerList } = useAnswerList();
  return (
    <QuestionContainer>
      <QuestionTitle isCorrect={isCorrect}>
        {index + 1 + ". " + question.question}
      </QuestionTitle>
      <Radio.Group
        onChange={(e) => {
          setAnswerList((list: SubmitQuestion[]) => {
            const isExist = list.some((item) => item.id === question.id);
            if (isExist) {
              return list.map((item) => {
                if (item.id === question.id) {
                  return { ...item, answer: e.target.value };
                } else {
                  return item;
                }
              });
            } else {
              return [...list, { id: question.id, answer: e.target.value }];
            }
          });
        }}
      >
        <Space direction="vertical">
          <Radio value={"A"}>{question.answer.A}</Radio>
          <Radio value={"B"}>{question.answer.B}</Radio>
          <Radio value={"C"}>{question.answer.C}</Radio>
          <Radio value={"D"}>{question.answer.D}</Radio>
        </Space>
      </Radio.Group>
    </QuestionContainer>
  );
}

export default QuestionPart;
