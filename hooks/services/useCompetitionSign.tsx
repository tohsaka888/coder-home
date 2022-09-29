/*
 * @Author: tohsaka888
 * @Date: 2022-09-29 13:46:36
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 14:54:02
 * @Description: 比赛报名相关接口
 */

import { message } from "antd";
import { competitionUrl } from "config/baseUrl";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useSWRConfig } from "swr";
import useLoginStatus from "./useLoginStatus";

function useCompetitionSign() {
  const { query, push } = useRouter();
  const { loginStatus } = useLoginStatus();
  const [loading, setLoading] = useState<boolean>(false);
  const { mutate } = useSWRConfig();

  const signUp = useCallback(async (): Promise<void> => {
    setLoading(true);
    if (loginStatus) {
      try {
        const res = await fetch(
          `${competitionUrl}/api/competition/signup/${query.id}`,
          {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: loginStatus.username }),
          }
        );
        const data = await res.json();
        setLoading(false);
        mutate(`${competitionUrl}/api/competition/${query.id}`);
        if (data.success) {
          message.success("报名成功");
        } else {
          message.error("报名失败");
        }
      } catch (error) {
        setLoading(false);
        const errMsg = (error as Error).message;
        message.error(errMsg);
        push("/error/" + errMsg);
      }
    } else {
      setLoading(false);
      message.warning({
        content: "请先登录",
        key: "login_first",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus, query.id]);

  const reject = useCallback(async (): Promise<void> => {
    setLoading(true);
    if (loginStatus) {
      try {
        const res = await fetch(
          `${competitionUrl}/api/competition/rejection/${query.id}`,
          {
            mode: "cors",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: loginStatus.username }),
          }
        );
        const data = await res.json();
        setLoading(false);
        mutate(`${competitionUrl}/api/competition/${query.id}`);
        if (data.success) {
          message.success("取消报名成功");
        } else {
          message.error("取消报名失败");
        }
      } catch (error) {
        setLoading(false);
        const errMsg = (error as Error).message;
        message.error(errMsg);
        push("/error/" + errMsg);
      }
    } else {
      setLoading(false);
      message.warning({
        content: "请先登录",
        key: "login_first",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginStatus, query.id]);

  return { signUp, reject, loading };
}

export default useCompetitionSign;
