import { baseUrl } from "config/baseUrl";
import React, { useCallback, useMemo, useState } from "react";
import { CheckedResult, Question, SubmitQuestion } from "typings";
import { DetailLayout } from "./index.styled";
import QuestionPart from "./QuestionPart";
import { AnswerListContext } from "context/AnswerListContext";
import { Button, message } from "antd";
import { useRouter } from "next/router";
import useQuestions from "hooks/services/useQuestions";

const Detail = () => {
  const { query } = useRouter();
  const [answerList, setAnswerList] = useState<SubmitQuestion[]>([]);
  const [checkedResult, setCheckResult] = useState<CheckedResult[]>([]);
  const { data, mutate } = useQuestions(query.userId as string);
  const questions = useMemo(() => data?.questions || [], [data]);

  const checkAnswers = useCallback(async () => {
    const res = await fetch(`https://www.coder-home.top:8080/check`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        userId: query.userId,
        question: answerList,
      }),
    });
    const data = await res.json();
    setCheckResult(data.results);
    message.success({ key: "correct", content: "批改完成！" });
  }, [answerList, query.userId]);

  return (
    <AnswerListContext.Provider value={{ answerList, setAnswerList }}>
      <DetailLayout>
        {questions &&
          questions.map((question, index) => (
            <QuestionPart
              question={question}
              key={question.id}
              index={index}
              isCorrect={
                checkedResult.find((item) => item.id == question.id)?.isCorrect
              }
            />
          ))}
        <Button type="primary" htmlType="submit" onClick={checkAnswers}>
          提交
        </Button>
        <Button
          style={{ marginLeft: "16px" }}
          onClick={() => {
            mutate();
          }}
        >
          刷新题目
        </Button>
      </DetailLayout>
    </AnswerListContext.Provider>
  );
};

export default Detail;
