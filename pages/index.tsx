/*
 * @Author: tohsaka888
 * @Date: 2022-09-16 13:40:07
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-23 14:00:40
 * @Description: HomePage
 */
import { Loader } from "@react-three/drei";
import CustomHead from "components/common/CustomHead";
import Navbar from "components/common/Navbar";
import { Typing } from "react-typing-effects";
import LiveBackground from "components/LiveBackground";
import { BackgroundContainer } from "components/LiveBackground/index.style";
import { competitionUrl } from "config/baseUrl";
import type { GetServerSideProps, NextPage } from "next";
import { SWRConfig } from "swr";
import "antd/dist/reset.css";

const Home: NextPage<{ fallback: Record<string, Response> }> = ({
  fallback,
}) => {
  return (
    <SWRConfig value={{ fallback }}>
      <CustomHead />
      <Navbar />
      <div className="bg" />
      <div style={{ position: "fixed", top: "25%", left: "10%" }}>
        <div style={{ fontSize: "48px", color: "#1890ff" }}>
          <span style={{ color: "#cecece", marginRight: "24px" }}>
            常州工学院
          </span>
          程序员之家
        </div>
        <div style={{ marginTop: "24px" }}>
          <Typing
            interval={100}
            existTime={800}
            textStyle={{
              fontSize: "24px",
              color: "#cecece",
              fontStyle: "italic",
            }}
            symbolStyle={{ marginLeft: "8px" }}
          >
            the home of coder in czu.
          </Typing>
        </div>
      </div>
      <BackgroundContainer>
        <LiveBackground />
      </BackgroundContainer>
      <div className="layer" />
      <Loader />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(`${competitionUrl}/api/brief`);
    const data = await res.json();
    return {
      props: {
        fallback: {
          [`${competitionUrl}/api/brief`]: data,
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default Home;
