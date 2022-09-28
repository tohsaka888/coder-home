/*
 * @Author: tohsaka888
 * @Date: 2022-09-23 15:12:56
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-27 08:37:39
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
          <PartContainer style={{ position: "sticky", top: "0px" }}>
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
        </Container>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Detail;
