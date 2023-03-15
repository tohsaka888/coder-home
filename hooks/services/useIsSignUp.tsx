/*
 * @Author: tohsaka888
 * @Date: 2022-09-26 16:18:27
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 14:14:33
 * @Description: 是否已经参加过比赛
 */

import { message } from "antd";
import { competitionUrl } from "config/baseUrl";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import useSWR from "swr";
import useLoginStatus from "./useLoginStatus";

type ResponseData =
  | { success: true; isSignUp: boolean }
  | { success: false; error: string };

function useIsSignUp() {
  const { loginStatus } = useLoginStatus();
  const { push, query } = useRouter();
  const url = `${competitionUrl}/api/competition/is-sign-up/${query.id}`;
  const getIsSignUp = useCallback(async (url: string, username: string) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({ username }),
    });
    const data: ResponseData = await res.json();
    return data;
  }, []);

  const { data, error, mutate } = useSWR(
    loginStatus?.username
      ? url
      : // loginStatus?.username,
        null,
    () => getIsSignUp(url, loginStatus?.username || "")
  );

  const isSignUp = useMemo(() => {
    if (error) {
      const errMsg = (error as Error).message;
      message.error(errMsg);
      push("/error/" + errMsg);
    }

    if (data) {
      if (data.success) {
        return data.isSignUp;
      } else {
        message.error(data.error);
        push("/error/" + data.error);
      }
    }
  }, [data, error, push]);

  return { isSignUp, mutate };
}

export default useIsSignUp;
