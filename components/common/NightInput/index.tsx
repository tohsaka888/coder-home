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
      {/* <motion.div
        initial={{
          height: "2px",
          background: "transparent",
          marginTop: "2px",
        }}
        animate={{
          background: isFocus ? "#1890ff" : "transparent",
          width: [isFocus ? "0%" : "100%", "100%"],
          height: "2px",
        }}
        transition={{
          duration: isFocus ? 2 : 0,
          repeat: isFocus ? Infinity : undefined,
          // repeatType: isFocus ? "reverse" : undefined,
        }}
      /> */}
    </NightInputContainer>
  );
}

export default NightInput;
