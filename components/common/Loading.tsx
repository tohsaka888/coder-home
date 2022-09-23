/*
 * @Author: tohsaka888
 * @Date: 2022-09-23 14:53:04
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-23 14:57:48
 * @Description: Loading
 */

import { Spin } from 'antd'
import React from 'react'
import { Flex } from 'styles/index.style'



function Loading() {
  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      style={{ width: '100%', height: '100%' }}
    >
      <Spin size={'large'} tip={'加载中...'} />
    </Flex>
  )
}

export default Loading
