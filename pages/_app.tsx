/*
 * @Author: tohsaka888
 * @Date: 2022-09-16 13:40:07
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-23 11:49:47
 * @Description: 请填写简介
 */
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig>
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
