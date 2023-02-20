import { Input, InputProps } from "antd";
import React, { useState } from "react";
import { NightInputContainer } from "./index.style";
import { motion } from "framer-motion";

function NightInput(props: InputProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <NightInputContainer>
      <Input
        {...props}
        autoComplete={"off"}
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
      />
      <motion.div
        initial={{
          height: "1px",
          background: "transparent",
          borderRadius: "5px",
          border: '1px solid #1890ff',
          // borderBottom: '1px solid #1890ff'
        }}
        animate={{
          background: isFocus ? "#1890ff" : "transparent",
          width: [isFocus ? "0%" : "100%", "100%"],
          height: "2px",
        }}
        transition={{
          duration: isFocus ? 1 : 0,
          repeat: isFocus ? Infinity : undefined,
          repeatType: isFocus ? "reverse" : undefined,
        }}
      />
    </NightInputContainer>
  );
}

export default NightInput;
