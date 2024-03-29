/*
 * @Author: tohsaka888
 * @Date: 2022-09-26 16:54:41
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-26 17:10:02
 * @Description: Banner
 */

import React from "react";
import { PartContainer } from "./index.style";
import { Carousel } from "antd";
import useGetCompetitionDetail from "hooks/services/useGetCompetitionDetail";
import Image from "next/image";

function Banner() {
  const { competition } = useGetCompetitionDetail();
  return (
    <PartContainer
      style={{
        padding: "8px",
        margin: "8px",
        paddingBottom: "0px",
        flex: 0,
      }}
    >
      <div style={{ width: "500px" }}>
        <Carousel autoplay style={{ width: "500px" }}>
          {competition?.banners.map((banner) => {
            return (
              <Image
                alt={"none"}
                src={banner.url || ""}
                key={banner.uid}
                width={500}
                height={300}
              />
            );
          })}
        </Carousel>
      </div>
    </PartContainer>
  );
}

export default Banner;
