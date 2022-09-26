/*
 * @Author: tohsaka888
 * @Date: 2022-09-23 13:19:33
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-26 13:11:27
 * @Description: 请填写简介
 */

import { message } from "antd";
import { competitionUrl } from "config/baseUrl";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import useSWR from "swr";

type Response =
  | { success: true; competition: Competition.Competition }
  | { success: false; error: string };

function useGetCompetitionDetail() {
  const router = useRouter();
  const { id } = router.query;

  const getCompetitionDetail = useCallback(async (url: string) => {
    const res = await fetch(url, {
      mode: "cors",
    });
    const data = await res.json();
    return data;
  }, []);

  const { data, error } = useSWR<Response>(
    id ? `${competitionUrl}/api/competition/${id}` : null,
    getCompetitionDetail
  );

  const competition = useMemo(() => {
    if (error) {
      message.error(error.message);
      router.push("/error/" + error.message);
      return;
    }
    if (data) {
      if (data.success) {
        return data.competition;
      } else {
        message.error(data.error);
        router.push("/error/" + data.error);
        return;
      }
    }
  }, [data, error, router]);

  return { competition, error, loading: !data && !error };
}

export default useGetCompetitionDetail;
