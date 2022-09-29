/*
 * @Author: tohsaka888
 * @Date: 2022-09-27 08:52:11
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 13:23:10
 * @Description: 动画卡片
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flex } from "styles/index.style";

type Props = {
  title: string;
  content: string | React.ReactNode;
};

function AnimatedCard({ title, content }: Props) {
  const [isHover, setIsHover] = useState<boolean>(false);
  return (
    <motion.div
      initial={{
        width: "100%",
        height: "90px",
        opacity: 0,
        border: "1px solid #dfdfdf",
        borderRadius: "8px",
        padding: "8px",
        marginRight: "8px",
        scale: 1,
      }}
      animate={{ opacity: 1 }}
      onHoverStart={() => {
        setIsHover(true);
      }}
      onHoverEnd={() => {
        setIsHover(false);
      }}
      whileHover={{
        scale: 1.01,
        background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
        boxShadow: `5px 5px 10px #e6e6e6,
        -5px -5px 10px #ffffff`,
        border: "none",
      }}
    >
      <div style={{ marginBottom: "4px" }}>{title}</div>

      {/* 下划线 */}
      <motion.div
        initial={{ width: "100%", height: "1px", background: "#cecece" }}
        animate={{
          background: isHover ? "tomato" : "#cecece",
          width: isHover ? ["0%", "100%"] : "100%",
        }}
      />

      <Flex
        alignItems="center"
        justifyContent="center"
        style={{ height: "75%" }}
      >
        <motion.div
          initial={{
            fontSize: "1rem",
          }}
          animate={{
            color: isHover ? "#1890ff" : "#000",
            fontSize: "1.1rem",
            fontWeight: isHover ? "bolder" : "normal",
          }}
          transition={{
            type: "spring",
            bounce: 0.5,
            duration: 2,
          }}
        >
          {content}
        </motion.div>
      </Flex>
    </motion.div>
  );
}

export default AnimatedCard;
