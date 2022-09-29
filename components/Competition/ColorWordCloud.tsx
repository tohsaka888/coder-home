/*
 * @Author: tohsaka888
 * @Date: 2022-09-29 09:10:40
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 16:08:34
 * @Description: 彩色词云
 */

import { WordCloud } from "@ant-design/plots";
import useGetCompetitionDetail from "hooks/services/useGetCompetitionDetail";
import React, { useMemo } from "react";

function UnMemoColorWordCloud() {
  const { competition } = useGetCompetitionDetail();

  const data = useMemo(() => {
    return competition
      ? competition.participants.map((participant) => ({
          name: participant.username,
          value: +(Math.random() * 100).toFixed(0),
        }))
      : [];
  }, [competition]);

  const config = {
    data,
    wordField: "name",
    weightField: "value",
    colorField: "name",
    wordStyle: {
      fontFamily: "Verdana",
      fontSize: [8, 32] as [number, number],
      rotation: 0,
    },
    // 返回值设置成一个 [0, 1) 区间内的值，
    // 可以让每次渲染的位置相同（前提是每次的宽高一致）。
    random: () => 0.5,
    // 设置交互类型
    interactions: [
      {
        type: "element-active",
      },
    ],
    state: {
      active: {
        // 这里可以设置 active 时的样式
        style: {
          lineWidth: 3,
        },
      },
    },
  };

  return <WordCloud {...config} />;
}

const ColorWordCloud = React.memo(UnMemoColorWordCloud);

export default ColorWordCloud;
