/*
 * @Author: tohsaka888
 * @Date: 2022-09-23 13:19:33
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-23 15:19:47
 * @Description: 请填写简介
 */

import { message } from 'antd'
import { competitionUrl } from 'config/baseUrl'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo } from 'react'
import useSWR from 'swr'

type Response =
  | { success: true, competition: Competition.Competition }
  | { success: false, error: string }

function useGetCompetitionDetail(id: string) {

  const router = useRouter()

  const getCompetitionDetail = useCallback(async (url: string) => {
    const res = await fetch(url, {
      mode: 'cors'
    })
    const data = await res.json()
    return data
  }, [])

  const { data, error } = useSWR<Response>(`${competitionUrl}/api/competition/${id}`, getCompetitionDetail)

  const competition = useMemo(() => {
    if (error) {
      message.error(error.message)
      router.push('/error')
      return
    }
    if (data) {
      if (data.success) {
        return data.competition
      } else {
        message.error(data.error)
        router.push('/error')
        return
      }
    }
  }, [data, error, router])

  return { competition, error, loading: !data && !error }
}

export default useGetCompetitionDetail