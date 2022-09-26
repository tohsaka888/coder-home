/*
 * @Author: tohsaka888
 * @Date: 2022-09-26 08:23:52
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-26 10:57:19
 * @Description: 登录相关接口
 */
import { message } from "antd";
import { loginUrl } from "config/baseUrl";
import useToken from "hooks/useToken";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useState } from "react";
import { useSWRConfig } from "swr";

type LoginProps =
  | ({ type: "username" } & { username: string; password: string })
  | ({ type: "email" } & { email: string; password: string });

type LoginResponseData =
  | { success: true; canLogin: boolean; token: string }
  | { success: false; error: string };

function useLoginOrRegister() {
  const { mutate } = useSWRConfig();
  const { push } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { dispatchToken } = useToken();
  const login = useCallback(
    async (props: LoginProps) => {
      setLoading(true);
      if (props.type === "username") {
        if (!props.username || !props.password) {
          message.error("用户名或者密码不得为空");
          setLoading(false);
          return;
        }
      }
      try {
        const res = await fetch(
          `${loginUrl}/api/login/${
            props.type === "username" ? "username" : "email"
          }`,
          {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              props.type === "username"
                ? { username: props.username, password: props.password }
                : { email: props.email, password: props.password }
            ),
          }
        );
        const data: LoginResponseData = await res.json();
        if (data.success) {
          dispatchToken(data.token);
          mutate(`${loginUrl}/api/login/status`);
          message.success("登录成功");
        } else {
          message.error(data.error);
          push("/error");
        }
        setLoading(false);
      } catch (error) {
        const errorMsg = (error as Error).message;
        message.error(errorMsg);
        setLoading(false);
        push("/error");
      }
    },
    [mutate, push]
  );

  const register = useCallback(() => {}, []);

  const forget = useCallback(() => {}, []);

  return { login, register, forget, loading };
}

export default useLoginOrRegister;
