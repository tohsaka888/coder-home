/*
 * @Author: tohsaka888
 * @Date: 2022-09-29 17:00:01
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 17:09:14
 * @Description: ActivityActivityCard
 */

import { Email, Username } from "./index.style";
import { Divider, Typography } from "antd";
import React from "react";
import { ActivityName, Prefix, Time } from "./index.style";
import { Image as AntImage } from "antd";
import { Flex } from "styles/index.style";
import UserAvatar from "components/common/UserAvatar";

type Props = {
  activity: Activity.Activity;
};

function ActivityCard({ activity }: Props) {
  return (
    <>
      <ActivityName>{activity.name}</ActivityName>
      <Flex alignItems="center">
        <UserAvatar username={activity.author} r={"38px"} />
        <Username style={{ fontSize: "16px", marginLeft: "16px" }}>
          {activity.author}
        </Username>
      </Flex>
      <Typography style={{ marginLeft: "50px", marginTop: "8px" }}>
        <Typography.Paragraph
          ellipsis={{ rows: 5, expandable: true, symbol: "展开" }}
        >
          {activity.intro}
        </Typography.Paragraph>
      </Typography>

      <div style={{ marginLeft: "50px", marginTop: "8px" }}>
        <AntImage.PreviewGroup>
          {activity.images.map((image, index) => {
            return (
              <AntImage
                src={image.url}
                key={index}
                width={280}
                style={{ marginRight: "8px" }}
              />
            );
          })}
        </AntImage.PreviewGroup>
      </div>

      <Flex
        style={{
          flexDirection: "column",
          alignItems: "flex-end",
          marginTop: "16px",
        }}
      >
        <Time>首次发布于: {activity.createdTime}</Time>
        <Time>最后更新于: {activity.updatedTime}</Time>
      </Flex>
      <Divider />
    </>
  );
}

export default ActivityCard;
