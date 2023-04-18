import { message } from "antd";
import Detail from "components/Daily/detail";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SWRConfig } from "swr";
import { Question } from "typings";

const Daily: NextPage<{ questions: Question[] }> = ({ questions }) => {
  const router = useRouter();
  useEffect(() => {
    if (questions.length === 0) {
      message.error("服务端错误");
      router.push("/error/500，服务端错误");
    }
  }, [questions.length, router]);
  return (
    <SWRConfig
      value={{
        fallback: {
          [`questions/${router.query.userId}`]: questions,
        },
      }}
    >
      <Detail />
    </SWRConfig>
  );
};

Daily.getInitialProps = async ({ query }) => {
  const res = await fetch(
    `https://www.coder-home.top:8080/questions/userCF?userId=${query.userId}`
  );
  const data = await res.json();
  if (data.status === 500) {
    return {
      questions: [],
    };
  } else {
    return {
      questions: data as Question[],
    };
  }
};

export default Daily;
