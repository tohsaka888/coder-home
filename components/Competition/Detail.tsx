/*
 * @Author: tohsaka888
 * @Date: 2022-09-23 15:12:56
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-23 15:53:52
 * @Description: 比赛详情
 */

import { Button, Tag } from 'antd'
import Loading from 'components/common/Loading'
import useGetCompetitionDetail from 'hooks/services/useGetCompetitionDetail'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { BsTagFill } from 'react-icons/bs'
import { Flex } from 'styles/index.style'
import { PartContainer } from './index.style'
import moment from 'moment'

function Detail() {
  const { query } = useRouter()
  const { competition } = useGetCompetitionDetail((query.id as string))

  const status = useMemo(() => {
    if (competition) {
      if (moment(competition.info.signUpStart).isAfter(moment(moment.now()))) {
        return '未开始'
      } else if (moment(moment.now()).isAfter(moment(competition.info.signUpEnd))) {
        return '已结束'
      } else {
        return '进行中'
      }
    } else {
      return '已结束'
    }
  }, [competition])

  return (
    <>
      {competition
        ? (
          <>
            <PartContainer>
              <Flex alignItems='center' justifyContent='space-between'>
                <Flex alignItems='center'>
                  <BsTagFill style={{ marginRight: '8px' }} size={20} />
                  <div style={{ fontSize: '1.3rem', marginRight: '8px' }}>{competition.name}</div>
                  <Tag color="#f50" style={{ fontWeight: 'normal' }}>{competition.info.way}</Tag>
                  <Tag color="#2db7f5" style={{ fontWeight: 'normal' }}>{status}</Tag>
                </Flex>
                <Flex>
                  <Button shape={'round'} style={{ marginRight: '8px' }}>获奖名单</Button>
                  <Button type='primary' shape={'round'}>报名比赛</Button>
                </Flex>
              </Flex>
            </PartContainer>
          </>
        )
        : <Loading />
      }
    </>
  )
}

export default Detail
