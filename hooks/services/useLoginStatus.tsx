import { message } from "antd";
import { loginUrl } from "config/baseUrl";
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
  const getLoginStatus = useCallback(async (url: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ token }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: ResponseData = await res.json();
    return data;
  }, []);

  const { data, error } = useSWR(
    `${loginUrl}/api/login/status`,
    getLoginStatus
  );

  const loginStatus = useMemo(() => {
    if (error) {
      message.error(error.message);
      push("/error");
    }

    if (data) {
      if (data.success) {
        return {
          username: data.result.username,
          email: data.result.email,
        };
      } else {
        message.error(data.error);
        push("/error");
      }
    }
  }, [data, error, push]);

  return { data, error, loginStatus };
}

export default useLoginStatus;
