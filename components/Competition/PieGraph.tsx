/*
 * @Author: tohsaka888
 * @Date: 2022-09-28 16:58:06
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 13:39:32
 * @Description: 饼图
 */

import React, { useMemo } from "react";
import { Pie, getCanvasPattern, PieConfig } from "@ant-design/plots";
import useGetCompetitionDetail from "hooks/services/useGetCompetitionDetail";

function PieGraph() {
  const { competition } = useGetCompetitionDetail();

  const data = useMemo(() => {
    return competition
      ? competition.awardSetting.map((award) => ({
          type: award.award,
          value: award.limit,
        }))
      : [];
  }, [competition]);

  const PATTERN_MAP = {
    一等奖: {
      type: "dot",
    },
    二等奖: {
      type: "line",
    },
    三等奖: {
      type: "square",
    },
    优秀奖: {
      type: "line",
      cfg: {
        spacing: 6,
        lineWidth: 2,
        rotation: 90,
      },
    },
  };

  const pattern = (
    { type }: { type: "一等奖" | "二等奖" | "三等奖" | "优秀奖" },
    color: string
  ) =>
    // @ts-ignore
    getCanvasPattern({
      ...PATTERN_MAP[type],
      cfg: {
        backgroundColor: color,
      },
    });

  const config: PieConfig = {
    data,
    angleField: "value",
    colorField: "type",
    color: ["gold", "silver", "#B5A642", "#1890ff"],
    radius: 0.8,
    label: {
      type: "outer",
      offset: 10,
      labelLine: {
        style: {},
      },
      content: "{name} {value}人",
    },
    pieStyle: {
      lineWidth: 1,
    },
    // 给legend增加贴图
    // legend: {
    //   // @ts-ignore
    //   marker: (text: any, index, item) => {
    //     // @ts-ignore
    //     const color = item.style.fill;
    //     return {
    //       style: {
    //         fill: pattern(
    //           {
    //             type: text,
    //           },
    //           color
    //         ),
    //         r: 8,
    //       },
    //     };
    //   },
    // },
    legend: false,
    // @ts-ignore
    pattern,
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return <Pie {...config} />;
}

export default PieGraph;
