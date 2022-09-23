/*
 * @Author: tohsaka888
 * @Date: 2022-09-23 14:32:52
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-23 14:40:50
 * @Description: Logo
 */

import { useRouter } from 'next/router'
import React from 'react'
import { Flex } from 'styles/index.style'
import { LogoContainer } from './index.style'

function Logo() {
  const router = useRouter()
  return (
    <Flex onClick={() => {
      router.push('/')
    }}>
      <LogoContainer>
        Coder
      </LogoContainer>
    </Flex>
  )
}

export default Logo 
