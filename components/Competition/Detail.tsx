/*
 * @Author: tohsaka888
 * @Date: 2022-09-23 15:12:56
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 13:11:45
 * @Description: 比赛详情
 */

import { Button, Tag } from "antd";
import Loading from "components/common/Loading";
import useGetCompetitionDetail from "hooks/services/useGetCompetitionDetail";
import React, { useMemo } from "react";
import { BsTagFill } from "react-icons/bs";
import { Flex } from "styles/index.style";
import { Container, PartContainer } from "./index.style";
import moment from "moment";
import useIsSignUp from "hooks/services/useIsSignUp";
import Banner from "./Banner";
import BasicInfo from "./BasicInfo";
import LiquidGraph from "./LiquidGraph";
import PartTitle from "./PartTitle";
import PieGraph from "./PieGraph";
import BarGraph from "./BarGraph";
import ColorWordCloud from "./ColorWordCloud";
import ParticipantTable from "./ParticipantTable";

function Detail() {
  const { competition } = useGetCompetitionDetail();
  const { isSignUp } = useIsSignUp();

  const status = useMemo(() => {
    if (competition) {
      if (moment(competition.info.signUpStart).isAfter(moment(moment.now()))) {
        return "未开始";
      } else if (
        moment(moment.now()).isAfter(moment(competition.info.signUpEnd))
      ) {
        return "已结束";
      } else {
        return "进行中";
      }
    } else {
      return "已结束";
    }
  }, [competition]);

  return (
    <>
      {competition ? (
        <Container>
          <PartContainer
            style={{
              position: "sticky",
              top: "0px",
              zIndex: 999,
              boxShadow: "0px 0px 10px 2px #dfdfdf",
            }}
          >
            <Flex alignItems="center" justifyContent="space-between">
              <Flex alignItems="center">
                <BsTagFill style={{ marginRight: "8px" }} size={20} />
                <div style={{ fontSize: "1.3rem", marginRight: "8px" }}>
                  {competition.name}
                </div>
                <Tag color="#f50" style={{ fontWeight: "normal" }}>
                  {competition.info.way}
                </Tag>
                <Tag color="#2db7f5" style={{ fontWeight: "normal" }}>
                  {status}
                </Tag>
                <Tag color="#87d068" style={{ fontWeight: "normal" }}>
                  {isSignUp ? "已报名" : "未报名"}
                </Tag>
              </Flex>
              <Flex>
                <Button shape={"round"} style={{ marginRight: "8px" }}>
                  获奖名单
                </Button>
                <Button
                  type="primary"
                  shape={"round"}
                  disabled={status !== "进行中"}
                  danger={isSignUp}
                >
                  {isSignUp ? "取消报名" : "报名比赛"}
                </Button>
              </Flex>
            </Flex>
          </PartContainer>

          <Flex>
            <Banner />
            <BasicInfo />
          </Flex>

          <Flex>
            <PartContainer
              style={{
                padding: "8px",
                margin: "8px",
                width: "300px",
                height: "330px",
                marginTop: "0px",
                display: "block",
              }}
            >
              <PartTitle title={"当前报名人数占比"} />
              <div style={{ width: "100%", height: "300px" }}>
                <LiquidGraph />
              </div>
            </PartContainer>
            <PartContainer
              style={{
                padding: "8px",
                marginRight: "8px",
                marginBottom: "8px",
                flex: 1,
                height: "330px",
              }}
            >
              <PartTitle title={"奖项设置"} />
              <Flex>
                <div style={{ height: "300px", width: "480px" }}>
                  <PieGraph />
                </div>
                <div
                  style={{
                    flex: 1,
                    height: "300px",
                    padding: "8px 0px 12px 8px",
                  }}
                >
                  <div style={{ width: "100%", height: "100%" }}>
                    <BarGraph />
                  </div>
                </div>
              </Flex>
            </PartContainer>
          </Flex>

          <Flex>
            <PartContainer style={{ margin: "0px 8px 8px 8px" }}>
              <PartTitle title={"报名用户词云"} />
              <div style={{ width: "500px", height: "340px" }}>
                <ColorWordCloud />
              </div>
            </PartContainer>
            <PartContainer style={{ margin: "0px 8px 8px 0px", flex: 1 }}>
              <PartTitle title={"报名用户表格"} />
              <ParticipantTable />
            </PartContainer>
          </Flex>
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Detail;
