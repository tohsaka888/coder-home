/*
 * @Author: tohsaka888
 * @Date: 2022-09-27 08:32:25
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-28 11:48:44
 * @Description: 比赛信息
 */

import { Col, Row } from "antd";
import AnimatedCard from "components/common/AnimatedCard";
import UserAvatar from "components/common/UserAvatar";
import useGetCompetitionDetail from "hooks/services/useGetCompetitionDetail";
import React from "react";
import {
  BsFillAlarmFill,
  BsFillPeopleFill,
  BsHouseDoorFill,
  BsStopwatchFill,
} from "react-icons/bs";
import { Flex } from "styles/index.style";
import { PartContainer } from "./index.style";

function BasicInfo() {
  const { competition } = useGetCompetitionDetail();
  return (
    <PartContainer
      style={{
        padding: "8px",
        margin: "8px",
        marginLeft: "0px",
      }}
    >
      {competition && (
        <Flex justifyContent="space-between" style={{ padding: "8px" }}>
          <Flex>
            <UserAvatar username={competition.creator.username} r={"38px"} />
            <Flex flexDirection="column" style={{ marginLeft: "8px" }}>
              <div>{competition.creator.username}</div>
              <div style={{ fontSize: "9px", color: "#1890ff" }}>
                {"<" + competition.creator.email + ">"}
              </div>
            </Flex>
          </Flex>
          <Flex flexDirection="column">
            <div>
              创建于:
              <span
                style={{
                  color: "#1890ff",
                  marginLeft: "8px",
                  fontWeight: "normal",
                }}
              >
                {competition.createdTime}
              </span>
            </div>
            <div>
              更新于:
              <span
                style={{
                  color: "#1890ff",
                  marginLeft: "8px",
                  fontWeight: "normal",
                }}
              >
                {competition.updatedTime}
              </span>
            </div>
          </Flex>
        </Flex>
      )}
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ marginTop: "8px", padding: "8px" }}
      >
        <Col span={8}>
          <AnimatedCard
            title={"开始报名时间"}
            content={
              <Flex alignItems="center">
                <BsFillAlarmFill style={{ marginRight: "8px" }} />
                {competition?.info.signUpStart}
              </Flex>
            }
          />
        </Col>
        <Col span={8}>
          <AnimatedCard
            title={"结束报名时间"}
            content={
              <Flex alignItems="center">
                <BsFillAlarmFill style={{ marginRight: "8px" }} />
                {competition?.info.signUpEnd}
              </Flex>
            }
          />
        </Col>
        <Col span={8}>
          <AnimatedCard
            title={"比赛时间"}
            content={
              <Flex alignItems="center">
                <BsFillAlarmFill style={{ marginRight: "8px" }} />
                {competition?.info.time}
              </Flex>
            }
          />
        </Col>
        <Col span={8} style={{ marginTop: "24px" }}>
          <AnimatedCard
            title={"比赛地点"}
            content={
              <Flex alignItems="center">
                <BsHouseDoorFill style={{ marginRight: "8px" }} />
                {competition?.info.place}
              </Flex>
            }
          />
        </Col>
        <Col span={8} style={{ marginTop: "24px" }}>
          <AnimatedCard
            title={"限报人数"}
            content={
              <Flex alignItems="center">
                <BsFillPeopleFill style={{ marginRight: "8px" }} size={20} />
                {competition?.info.limit}人
              </Flex>
            }
          />
        </Col>
        <Col span={8} style={{ marginTop: "24px" }}>
          <AnimatedCard
            title={"比赛时长"}
            content={
              <Flex alignItems="center">
                <BsStopwatchFill style={{ marginRight: "8px" }} />
                {competition?.info.duration}
              </Flex>
            }
          />
        </Col>
      </Row>
    </PartContainer>
  );
}

export default BasicInfo;
