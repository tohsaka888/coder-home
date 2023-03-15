/*
 * @Author: tohsaka888
 * @Date: 2022-09-29 16:14:49
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 17:04:46
 * @Description: 活动页
 */

import { Layout } from "antd";
import Detail from "components/Activity/Detail";
import CustomHead from "components/common/CustomHead";
import Navbar from "components/common/Navbar";
import React from "react";

function ActivityPage() {
  return (
    <>
      <CustomHead />
      {/* <Navbar /> */}
      <Layout.Content>
        <Detail />
      </Layout.Content>
    </>
  );
}

export default ActivityPage;
