/*
 * @Author: tohsaka888
 * @Date: 2022-09-16 14:54:13
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-16 17:12:13
 * @Description: 请填写简介
 */

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { SloganContainer, Text } from './index.style';

type Props = {
  title: string;
  locale: 'zh' | 'en'
}

function Slogan({ title, locale }: Props) {
  const delayRef = useRef<number>(0)
  return (
    <SloganContainer>
      {title.split('').map((c, i) => {
        let duration = Math.random() + (locale === 'zh' ? 0.5 : 0)
        delayRef.current += duration
        return (
          <motion.div
            key={i}
            animate={{
              display: ['none', 'block']
            }}
            transition={{
              duration,
              delay: delayRef.current
            }}
            initial={{ fontSize: '3rem', color: '#fff' }}
          >
            {c != ' '
              ? (
                i < 5
                  ? <Text>{c}</Text>
                  : c
              )
              : <span>&nbsp;</span>}
          </motion.div>
        )
      })}
      <motion.div
        initial={{ width: '5px', background: 'tomato', fontWeight: 'bolder', marginLeft: '8px', height: (locale === 'zh' ? '50px' : '25px'), marginTop: locale === 'zh' ? '4px' : '0px' }}
        animate={{
          opacity: [0, 1],
        }}
        transition={{
          type: "spring",
          repeat: Infinity,
          repeatType: 'loop',
          duration: 0.7
        }}
      />
    </SloganContainer>
  )
}

export default Slogan