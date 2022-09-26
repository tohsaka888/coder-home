/*
 * @Author: tohsaka888
 * @Date: 2022-09-26 08:23:52
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-26 15:39:38
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

type GetEmailResponseData =
  | { success: true; code: string }
  | { success: false; error: string };

type VerifyEmailResponseData =
  | { success: true; canRegister: boolean }
  | { success: false; error: string };

type RegisterResponseData =
  | { success: true; isRegister: boolean }
  | { success: false; error: string };

type ForgetResponseData =
  | { success: true; isReset: boolean }
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
          push("/error/" + encodeURIComponent(data.error));
        }
        setLoading(false);
      } catch (error) {
        const errorMsg = (error as Error).message;
        message.error(errorMsg);
        setLoading(false);
        push("/error/" + encodeURIComponent(errorMsg));
      }
    },
    [mutate, push]
  );

  const sendEmail = useCallback(async (email: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${loginUrl}/api/authcode/get`, {
        mode: "cors",
        body: JSON.stringify({ email }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: GetEmailResponseData = await res.json();
      setLoading(false);
      if (data.success) {
        return data.code;
      } else {
        message.error(data.error);
        push("/error/" + encodeURIComponent(data.error));
      }
    } catch (error) {
      const errMsg = (error as Error).message;
      setLoading(false);
      message.error(errMsg);
      push("/error/" + encodeURIComponent(errMsg));
    }
  }, []);

  const verifyEmail = useCallback(async (email: string, code: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${loginUrl}/api/authcode/verify`, {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({ email, code }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: VerifyEmailResponseData = await res.json();
      setLoading(false);
      if (data.success) {
        return data.canRegister;
      } else {
        message.error(data.error);
        push("/error/" + encodeURIComponent(data.error));
      }
    } catch (error) {
      const errMsg = (error as Error).message;
      setLoading(false);
      message.error(errMsg);
      push("/error/" + encodeURIComponent(errMsg));
    }
  }, []);

  const register = useCallback(
    async (email: string, password: string, username: string) => {
      setLoading(true);
      try {
        const res = await fetch(`${loginUrl}/api/register`, {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({ email, password, username }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data: RegisterResponseData = await res.json();
        setLoading(false);
        if (data.success) {
          return data.isRegister;
        } else {
          message.error(data.error);
          push("/error/" + encodeURIComponent(data.error));
        }
      } catch (error) {
        const errMsg = (error as Error).message;
        setLoading(false);
        message.error(errMsg);
        push("/error/" + encodeURIComponent(errMsg));
      }
    },
    []
  );

  const forget = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${loginUrl}/api/forget`, {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: ForgetResponseData = await res.json();
      setLoading(false);
      if (data.success) {
        return data.isReset;
      } else {
        message.error(data.error);
        push("/error/" + encodeURIComponent(data.error));
      }
    } catch (error) {
      const errMsg = (error as Error).message;
      setLoading(false);
      message.error(errMsg);
      push("/error/" + encodeURIComponent(errMsg));
    }
  }, []);

  return { login, register, forget, loading, sendEmail, verifyEmail };
}

export default useLoginOrRegister;
