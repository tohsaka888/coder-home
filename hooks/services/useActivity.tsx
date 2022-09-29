/*
 * @Author: tohsaka888
 * @Date: 2022-09-29 16:31:41
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 17:05:42
 * @Description: 活动列表
 */

import { message } from "antd";
import { activityUrl } from "config/baseUrl";
import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState } from "react";
import useSWR from "swr";

type ResponseData =
  | { success: true; list: Activity.Activity[] }
  | { success: false; error: string };

function useActivity() {
  const [list, setList] = useState<Activity.Activity[]>([]);
  const { push } = useRouter();

  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
  }>({ page: 1, limit: 10 });

  const getActivityList = useCallback(
    async (url: string) => {
      const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pagination),
      });
      const data: ResponseData = await res.json();
      return data;
    },
    [pagination]
  );

  const { mutate, data, error } = useSWR<ResponseData>(
    `${activityUrl}/api/list`,
    getActivityList,
    {
      onSuccess(data) {
        if (data.success) {
          setList([...list, ...data.list]);
        } else {
          message.error(data.error);
          push("/error/" + data.error);
        }
      },
      onError(err, key, config) {
        message.error(err.message);
        push("/error/" + decodeURIComponent(err.message));
      },
    }
  );

  const nextPage = useCallback(() => {
    setPagination((pagination) => ({
      ...pagination,
      page: pagination.page + 1,
    }));
    mutate();
  }, [mutate]);

  const length = useMemo(() => {
    if (data) {
      if (data.success) {
        return data.list.length;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }, [data]);

  return { list, nextPage, loading: !data && !error, length };
}

export default useActivity;
