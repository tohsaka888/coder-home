/*
 * @Author: tohsaka888
 * @Date: 2022-09-23 13:19:11
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-26 13:11:58
 * @Description: 获取比赛列表
 */

import { message } from 'antd';
import { competitionUrl } from 'config/baseUrl'
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react'
import useSWR from 'swr';

type Response =
  | { success: true; list: { id: string; name: string }[] }
  | { success: false; error: string }

function useGetCompetitionList() {

  const getCompetitionList = useCallback(async (url: string) => {
    const res = await fetch(url, {
      method: 'GET',
      mode: 'cors'
    })
    const data: Response = await res.json()
    return data
  }, [])

  const { data, error } = useSWR<Response>(`${competitionUrl}/api/brief`, getCompetitionList)

  const router = useRouter()

  const list = useMemo(() => {
    if (error) {
      message.error(error)
      return []
    }
    if (data) {
      if (data?.success) {
        return data.list
      } else {
        message.error(data?.error)
        return []
      }
    } else {
      return []
    }
  }, [data, error])

  if (error) {
    router.push('/error/' + error.message)
  }

  return { list, error, loading: !data && !error }
}

export default useGetCompetitionList
