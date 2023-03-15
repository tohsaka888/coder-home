import { message, Radio, Space } from "antd";
import React from "react";
import { Question } from "typings";
import { QuestionContainer, QuestionTitle } from "./index.styled";

function QuestionPart({
  question,
  index,
}: {
  question: Question;
  index: number;
}) {
  return (
    <QuestionContainer>
      <QuestionTitle>{index + 1 + ". " + question.question}</QuestionTitle>
      <Radio.Group
        onChange={(e) => {
          if (e.target.value === question.correctAnswer) {
            message.success({
              key: question.id,
              content: "答对啦！",
              duration: 0.5,
            });
          } else {
            message.error({
              key: question.id,
              content: "答错咯，再试试呢？",
              duration: 0.5,
            });
          }
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
