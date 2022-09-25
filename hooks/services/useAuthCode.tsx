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
      push("/error");
    }

    if (data) {
      return data;
    }
  }, [data, error, push]);

  return { authcode, error };
}

export default useAuthCode;
