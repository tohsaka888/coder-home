/*
 * @Author: tohsaka888
 * @Date: 2022-09-26 08:23:52
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-26 11:33:14
 * @Description: 获取登录状态
 */
import { message } from "antd";
import { loginUrl } from "config/baseUrl";
import useToken from "hooks/useToken";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import useSWR from "swr";

type ResponseData =
  | {
      success: true;
      isLogin: boolean;
      result: { username: string; email: string; iat: number; exp: number };
    }
  | { success: false; error: string };

function useLoginStatus() {
  const { push } = useRouter();
  const { removeToken, token } = useToken();

  const getLoginStatus = useCallback(
    async (url: string) => {
      const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ token: token }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: ResponseData = await res.json();
      return data;
    },
    [token]
  );

  const { data, error } = useSWR(
    token ? `${loginUrl}/api/login/status` : null,
    getLoginStatus
  );

  const loginStatus = useMemo(() => {
    if (error) {
      message.error(error.message);
      removeToken();
      push("/error");
    }

    if (data) {
      if (data.success) {
        return {
          username: data.result.username,
          email: data.result.email,
        };
      } else {
        return;
      }
    }
  }, [data, error, push]);

  return { data, error, loginStatus };
}

export default useLoginStatus;
