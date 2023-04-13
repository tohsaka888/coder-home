import Detail from "components/Daily/detail";
import { baseUrl } from "config/baseUrl";
import { NextPage } from "next";
import React from "react";
import { Question } from "typings";

const Daily: NextPage<{ questions: Question[] }> = ({ questions }) => {
  return <Detail questions={questions} />;
};

Daily.getInitialProps = async ({query}) => {
  console.log(query);
  const res = await fetch(`https://www.coder-home.top:8080/questions/userCF?userId=1`);
  const data = await res.json();
  return {
    questions: data as Question[],
  };
};

export default Daily;
