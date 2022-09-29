/*
 * @Author: tohsaka888
 * @Date: 2022-09-28 13:31:25
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-28 13:34:56
 * @Description: title
 */

import React from "react";
import { BsFillSignpost2Fill } from "react-icons/bs";
import { PartTitleContainer } from "./index.style";

type Props = {
  title: string;
};

function PartTitle({ title }: Props) {
  return (
    <PartTitleContainer>
      <BsFillSignpost2Fill style={{ marginRight: "8px" }} />
      {title}
    </PartTitleContainer>
  );
}

export default PartTitle;
