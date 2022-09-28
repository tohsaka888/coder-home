/*
 * @Author: tohsaka888
 * @Date: 2022-09-26 10:04:52
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-26 11:37:12
 * @Description: UserAvatar
 */

import React from "react";
import { motion } from "framer-motion";
// import { Popover } from "antd";
import { AvatarContainer } from "./index.style";

type Props = {
  username: string;
  r?: string;
};

function UserAvatar({ username, r }: Props) {
  return (
    <AvatarContainer>
      {/* <Popover placement="bottom"> */}
      <motion.div
        initial={{
          width: r || "30px",
          height: r || "30px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1890ff",
          color: "#ffffff",
          fontWeight: "bolder",
          cursor: "pointer",
        }}
        whileHover={{
          width: "38px",
          height: "38px",
        }}
      >
        {username[0].toUpperCase()}
      </motion.div>
      {/* </Popover> */}
    </AvatarContainer>
  );
}

export default UserAvatar;
