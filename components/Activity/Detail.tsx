/*
 * @Author: tohsaka888
 * @Date: 2022-09-29 16:25:49
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-30 08:37:27
 * @Description: 活动详情
 */

import { Spin } from "antd";
import Loading from "components/common/Loading";
import useActivity from "hooks/services/useActivity";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ActivityCard from "./ActivityCard";
import { Container, Target } from "./index.style";

function Detail() {
  const { list, length, loading, nextPage } = useActivity();

  return (
    <Container>
      <Target id={"target"}>
        {loading ? (
          <Loading />
        ) : (
          <InfiniteScroll
            dataLength={length}
            next={nextPage}
            hasMore={length === 5}
            scrollableTarget={"target"}
            endMessage={
              <p style={{ textAlign: "center", marginBottom: "16px" }}>
                <b>~~到底啦~~</b>
              </p>
            }
            loader={<Spin />}
          >
            {list.map((activity) => (
              <ActivityCard activity={activity} key={activity._id} />
            ))}
          </InfiniteScroll>
        )}
      </Target>
    </Container>
  );
}

export default Detail;
