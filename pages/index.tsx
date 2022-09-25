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
import Slogan from "components/HomePage/Slogan";
import LiveBackground from "components/LiveBackground";
import { BackgroundContainer } from "components/LiveBackground/index.style";
import { competitionUrl } from "config/baseUrl";
import useGetCompetitionDetail from "hooks/services/useGetCompetitionDetail";
import useGetCompetitionList from "hooks/services/useGetCompetitionList";
import type { GetServerSideProps, NextPage } from "next";
import { SWRConfig } from "swr";
// <{ fallback: Record<string, Response> }>
// {
// fallback,
// }
const Home: NextPage = () => {
  return (
    // <SWRConfig value={{ fallback }}>
    <>
      <CustomHead />
      <Navbar />
      <div className="bg" />
      <Slogan
        title={"常州工学院 程序员之家"}
        locale={"zh"}
        style={{ color: "#fff", fontSize: "50px" }}
        highlightStyle={{ color: "#1890ff", fontSize: "50px" }}
        highlightLength={5}
        cursorStyle={{
          width: "38px",
          height: "8px",
        }}
      />
      <Slogan
        title={"The Home of Coder"}
        locale={"en"}
        style={{ color: "#fff", fontSize: "16px" }}
        cursorStyle={{ width: "16px", height: "5px" }}
      />
      <BackgroundContainer>
        <LiveBackground />
      </BackgroundContainer>
      <div className="layer" />
      <Loader />
    </>
    // </SWRConfig>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const res = await fetch(`${competitionUrl}/api/brief`);
//     const data = await res.json();
//     return {
//       props: {
//         fallback: {
//           [`${competitionUrl}/api/brief`]: data,
//         },
//       },
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       props: {},
//     };
//   }
// };

export default Home;
