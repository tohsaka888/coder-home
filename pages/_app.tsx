/*
 * @Author: tohsaka888
 * @Date: 2022-09-16 13:40:07
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 12:45:20
 * @Description: 请填写简介
 */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { TokenContext } from "context";
import { useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";

function MyApp({ Component, pageProps }: AppProps) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  return (
    <SWRConfig>
      <ConfigProvider locale={zhCN}>
        <TokenContext.Provider value={{ token, setToken }}>
          <Component {...pageProps} />
        </TokenContext.Provider>
      </ConfigProvider>
    </SWRConfig>
  );
}

export default MyApp;
