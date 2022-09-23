/*
 * @Author: tohsaka888
 * @Date: 2022-09-23 16:00:39
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-23 16:01:42
 * @Description: context
 */

import React, { createContext } from "react";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoginModalShowContext = createContext<Props | null>(null)
