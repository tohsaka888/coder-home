/*
 * @Author: tohsaka888
 * @Date: 2022-09-19 09:24:54
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-26 08:33:58
 * @Description: Navbar
 */

import React, { CSSProperties, useMemo, useState } from "react";
import { Button, Form, Layout, Menu } from "antd";
import { useRouter } from "next/router";
import { BsGithub, BsTrophyFill, BsTwitch } from "react-icons/bs";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import useGetCompetitionList from "hooks/services/useGetCompetitionList";
import { Flex } from "styles/index.style";
import Logo from "./Logo";
import { LoginModalShowContext } from "./context";
import dynamic from "next/dynamic";
import NightInput from "../NightInput";
import { NightFormContainer } from "./index.style";
import useLoginOrRegister from "hooks/services/useLoginOrRegister";
import useLoginStatus from "hooks/services/useLoginStatus";
import useAuthCode from "hooks/services/useAuthCode";
import { useSWRConfig } from "swr";
import { baseUrl } from "config/baseUrl";
import LoginPanel from "./LoginPanel";
const LoginModal = dynamic(() => import("./LoginModal"), { ssr: false });

function Navbar() {
  const { Header } = Layout;
  const { list } = useGetCompetitionList();
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);

  const pathname = router.pathname;

  const style: CSSProperties = useMemo(() => {
    return pathname === "/"
      ? {
          color: "#fff",
          background: "transparent",
          position: "fixed",
          top: "0px",
          width: "100vw",
          zIndex: 999,
        }
      : {
          background: undefined,
        };
  }, [pathname]);

  const items: ItemType[] = useMemo(() => {
    return [
      {
        icon: <BsTrophyFill />,
        label: <span style={{ marginLeft: "18px" }}>比赛</span>,
        key: "competition",
      },
      {
        icon: <BsTwitch size={15} />,
        label: <span style={{ marginLeft: "18px" }}>活动</span>,
        key: "activity",
      },
    ];
  }, []);

  return (
    <LoginModalShowContext.Provider value={{ visible, setVisible }}>
      <Header style={style}>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Logo />
            <Menu
              theme="dark"
              style={{ background: "transparent" }}
              items={items}
              defaultSelectedKeys={[pathname.split("/")[1]]}
              mode={"horizontal"}
              onSelect={(info) => {
                if (info.key === "competition") {
                  if (list.length !== 0) {
                    router.push(`/competition/632134dcf5dfb3655d9e6db4`);
                  }
                }
              }}
            />
          </Flex>
          <Flex alignItems="center">
            <BsGithub
              size={25}
              style={{ marginRight: "16px", cursor: "pointer" }}
              onClick={() =>
                router.push("https://github.com/tohsaka888/coder-home")
              }
            />
            <Button
              type="primary"
              shape={"round"}
              style={{ width: "80px" }}
              onClick={() => {
                setVisible(true);
              }}
            >
              登录
            </Button>
          </Flex>
        </Flex>
      </Header>
      {/* <LoginModal width={600} height={390} title={"Login"}>
        <LoginPanel />
      </LoginModal> */}
    </LoginModalShowContext.Provider>
  );
}

export default Navbar;
