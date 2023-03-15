/*
 * @Author: tohsaka888
 * @Date: 2022-09-26 10:42:01
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-26 12:53:33
 * @Description: context
 */

import React, { createContext } from "react";
import { Context } from "typings";

export const LoginModalShowContext =
  createContext<Context.LoginModalProps | null>(null);
export const TokenContext = createContext<Context.TokenProps | null>(null);
