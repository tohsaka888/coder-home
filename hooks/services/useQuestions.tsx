import React from "react";
import useSWR from "swr";
import { Question } from "typings";

function useQuestions(userId: string) {
  return useSWR(`questions/${userId}`, async () => {
    const res = await fetch(
      `https://www.coder-home.top:8080/questions/userCF?userId=${userId}`
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
  });
}

export default useQuestions;
