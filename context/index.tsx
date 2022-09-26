/*
 * @Author: tohsaka888
 * @Date: 2022-09-26 10:42:01
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-26 10:43:03
 * @Description: context
 */

import React, { createContext } from "react";

type Props = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const TokenContext = createContext<Props | null>(null);
