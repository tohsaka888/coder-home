/*
 * @Author: tohsaka888
 * @Date: 2022-09-26 13:09:25
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-26 13:14:38
 * @Description: error page
 */

import React from "react";
import { Result, Button } from "antd";
import CustomHead from "components/common/CustomHead";
import Navbar from "components/common/Navbar";
import { useRouter } from "next/router";

function ErrorPage() {
  const { query, push } = useRouter();
  return (
    <>
      <CustomHead />
      <Navbar />
      <Result
        status="500"
        title="呜呼,发生了错误"
        subTitle={query.message}
        extra={
          <Button type="primary" onClick={() => push("/")}>
            回到主页
          </Button>
        }
      />
    </>
  );
}

export default ErrorPage;
