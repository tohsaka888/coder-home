/*
 * @Author: tohsaka888
 * @Date: 2022-09-16 13:40:07
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-26 10:44:46
 * @Description: 请填写简介
 */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { TokenContext } from "context";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  return (
    <SWRConfig>
      <TokenContext.Provider value={{ token, setToken }}>
        <Component {...pageProps} />
      </TokenContext.Provider>
    </SWRConfig>
  );
}

export default MyApp;
