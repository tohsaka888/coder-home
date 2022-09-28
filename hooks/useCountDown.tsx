/*
 * @Author: tohsaka888
 * @Date: 2022-09-26 14:06:32
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-26 14:21:45
 * @Description: 倒计时
 */

import React, { useCallback, useEffect, useRef, useState } from "react";

function useCountDown() {
  const [count, setCount] = useState<number>(0);
  const intervalRef = useRef<number>(-1);
  const [run, setRun] = useState<boolean>(false);

  useEffect(() => {
    if (run) {
      intervalRef.current = window.setInterval(() => {
        setCount((c) => c - 1);
      }, 1000);
    }
  }, [run]);

  useEffect(() => {
    if (run) {
      if (count < 1) {
        window.clearInterval(intervalRef.current);
        setRun(false);
      }
    }
  }, [count]);

  const countDown = useCallback((seconds: number) => {
    setCount(seconds);
    setRun(true);
  }, []);

  return { count, isRunning: run, countDown };
}

export default useCountDown;
