/*
 * @Author: tohsaka888
 * @Date: 2022-09-28 17:19:13
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 16:06:31
 * @Description: 柱状图
 */

import useGetCompetitionDetail from "hooks/services/useGetCompetitionDetail";
import React, { useMemo } from "react";
import { Bar, getCanvasPattern, BarConfig } from "@ant-design/plots";

function UnMemoBarGraph() {
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

  const config: BarConfig = {
    data,
    xField: "value",
    yField: "type",
    conversionTag: {},
    // 可不设置
    seriesField: "type",
    legend: false,
    // @ts-ignore
    pattern,
  };
  return <Bar {...config} />;
}

const BarGraph = React.memo(UnMemoBarGraph);

export default BarGraph;
