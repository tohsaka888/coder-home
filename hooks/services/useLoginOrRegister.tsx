import { message } from "antd";
import { loginUrl } from "config/baseUrl";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
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
  const login = useCallback(
    async (props: LoginProps) => {
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
          localStorage.setItem("token", data.token);
          mutate(`${loginUrl}/api/login/status`);
          message.success("登录成功");
        } else {
          message.error(data.error);
          push("/error");
        }
      } catch (error) {
        const errorMsg = (error as Error).message;
        message.error(errorMsg);
        push("/error");
      }
    },
    [mutate, push]
  );

  const register = useCallback(() => {}, []);

  const forget = useCallback(() => {}, []);

  return { login, register, forget };
}

export default useLoginOrRegister;
