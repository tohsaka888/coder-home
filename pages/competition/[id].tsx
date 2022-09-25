/*
 * @Author: tohsaka888
 * @Date: 2022-09-23 11:43:11
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-23 15:35:08
 * @Description: 比赛详情页
 */

import { Layout, Menu } from "antd";
import CustomHead from "components/common/CustomHead";
import Loading from "components/common/Loading";
import Navbar from "components/common/Navbar";
import Detail from "components/Competition/Detail";
import useGetCompetitionList from "hooks/services/useGetCompetitionList";
import { useRouter } from "next/router";
import React from "react";
import { BsFillMapFill } from "react-icons/bs";

function Competition() {
  const { list } = useGetCompetitionList();
  const router = useRouter();

  return (
    <>
      <CustomHead />
      <Navbar />
      <Layout style={{ height: "calc(100vh - 65px)" }}>
        <Layout.Sider theme="light" style={{ height: "100%" }}>
          {list.length === 0 ? (
            <Loading />
          ) : (
            <Menu
              defaultSelectedKeys={[router.query.id as string]}
              items={list.map((item) => ({
                label: item.name,
                key: item.id,
                icon: <BsFillMapFill color={"#1890ff"} />,
              }))}
              onSelect={(info) => {
                router.push("/competition/" + info.key);
              }}
            />
          )}
        </Layout.Sider>
        <Layout.Content>
          <Detail />
        </Layout.Content>
      </Layout>
    </>
  );
}

export default Competition;
