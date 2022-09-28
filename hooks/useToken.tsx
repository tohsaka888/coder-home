/*
 * @Author: tohsaka888
 * @Date: 2022-09-26 10:46:51
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-26 10:51:54
 * @Description: useToken
 */

import { TokenContext } from "context";
import React, { useCallback, useContext } from "react";

function useToken() {
  const { token, setToken } = useContext(TokenContext)!;

  const dispatchToken = useCallback((token: string): void => {
    localStorage.setItem("token", token);
    setToken(token);
  }, []);

  const removeToken = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
  }, []);

  return { token, dispatchToken, removeToken };
}

export default useToken;
