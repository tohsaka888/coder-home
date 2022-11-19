/*
 * @Author: tohsaka888
 * @Date: 2022-09-16 14:54:13
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-19 09:22:44
 * @Description: 请填写简介
 */

import React, { CSSProperties, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { SloganContainer, Text } from "./index.style";

type Props = {
  title: string;
  locale: "zh" | "en";
  style: CSSProperties;
  highlightStyle?: CSSProperties;
  cursorStyle: CSSProperties;
  highlightLength?: number;
};

function Slogan({
  title,
  locale,
  style,
  highlightStyle,
  highlightLength,
  cursorStyle,
}: Props) {
  const delayRef = useRef<number>(0);

  const isHighlight = useCallback(
    (index: number) => {
      if (highlightLength) {
        if (index < highlightLength) {
          return highlightStyle;
        } else {
          return style;
        }
      } else {
        return style;
      }
    },
    [highlightLength, highlightStyle, style]
  );
  return (
    <SloganContainer locale={locale}>
      {title.split("").map((c, i) => {
        let duration = 0.5;
        delayRef.current += duration;
        return (
          <motion.div
            key={i}
            animate={{
              display: ["none", "block"],
            }}
            transition={{
              duration,
              delay: delayRef.current,
            }}
          >
            {c != " " ? (
              <span style={isHighlight(i)}>{c}</span>
            ) : (
              <span style={isHighlight(i)}>&nbsp;</span>
            )}
          </motion.div>
        );
      })}
      <motion.div
        initial={{
          background: "tomato",
          fontWeight: "bolder",
          marginLeft: "8px",
        }}
        animate={{
          opacity: [0, 1],
        }}
        style={cursorStyle}
        transition={{
          type: "spring",
          repeat: Infinity,
          repeatType: "loop",
          duration: 0.7,
        }}
      />
    </SloganContainer>
  );
}

export default Slogan;
