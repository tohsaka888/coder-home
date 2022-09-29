/*
 * @Author: tohsaka888
 * @Date: 2022-09-28 12:59:55
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-28 13:28:55
 * @Description: 水波图
 */

import React, { useMemo } from "react";
import { Liquid, LiquidConfig } from "@ant-design/plots";
import useGetCompetitionDetail from "hooks/services/useGetCompetitionDetail";

function LiquidGraph() {
  const { competition } = useGetCompetitionDetail();

  const percent = useMemo(() => {
    return competition
      ? competition.participants.length / competition.info.limit
      : 0;
  }, [competition]);

  const theme = useMemo(() => {
    if (percent >= 0 && percent < 0.4) {
      return {
        stroke: "#1890ff",
        brandColor: "#0e8bff",
        color: "#1890ff",
      };
    } else if (percent >= 0.4 && percent < 0.7) {
      return {
        stroke: "#FFC100",
        brandColor: "#FAAD14",
        color: "#ffffff",
      };
    } else {
      return {
        stroke: "#ff2626",
        brandColor: "#fa1414",
        color: "#ffffff",
      };
    }
  }, [percent]);

  const config: LiquidConfig = {
    padding: [0],
    percent,
    outline: {
      border: 4,
      distance: 5,
      style: {
        stroke: theme.stroke,
        strokeOpacity: 0.65,
      },
    },
    wave: {
      length: 128,
    },
    statistic: {
      content: {
        style: {
          fontSize: "32px",
          fill: theme.color,
          opacity: 1,
          // @ts-ignore
          lineWidth: 2,
        },
        offsetY: 2,
      },
    },
    pattern: {
      type: "dot",
      cfg: {
        size: 30,
      },
    },
    theme: {
      styleSheet: {
        brandColor: theme.brandColor,
      },
    },
  };
  return <Liquid {...config} />;
}

export default LiquidGraph;
