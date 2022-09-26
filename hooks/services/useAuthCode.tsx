/*
 * @Author: tohsaka888
 * @Date: 2022-09-26 08:23:52
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-26 13:10:56
 * @Description: 获取验证码
 */
import { message } from "antd";
import { baseUrl } from "config/baseUrl";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import useSWR from "swr";

type ResponseData = { text: string; data: string };

function useAuthCode() {
  const { push } = useRouter();
  const getAuthCode = useCallback(async (url: string) => {
    const res = await fetch(url);
    const data: ResponseData = await res.json();
    return data;
  }, []);

  const { data, error } = useSWR<ResponseData>(
    `${baseUrl}/api/authcode`,
    getAuthCode
  );

  const authcode = useMemo(() => {
    if (error) {
      message.error(error.message);
      push("/error/" + error.message);
    }

    if (data) {
      return data;
    }
  }, [data, error, push]);

  return { authcode, error };
}

export default useAuthCode;
