/*
 * @Author: tohsaka888
 * @Date: 2022-09-19 09:24:54
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 16:18:41
 * @Description: Navbar
 */

import React, { CSSProperties, useMemo, useState } from "react";
import { Button, Layout, Menu, message } from "antd";
import { useRouter } from "next/router";
import {
  BsGithub,
  BsTrophyFill,
  BsTwitch,
  BsPersonCircle,
  BsList,
  BsSafe,
  BsFile,
} from "react-icons/bs";
import { ItemType } from "antd/es/menu/hooks/useItems";
import useGetCompetitionList from "hooks/services/useGetCompetitionList";
import { Flex } from "styles/index.style";
import Logo from "./Logo";
import { LoginModalShowContext } from "context";
import dynamic from "next/dynamic";
import LoginPanel from "./LoginPanel";
import useLoginStatus from "hooks/services/useLoginStatus";
import UserAvatar from "../UserAvatar";
import useToken from "hooks/useToken";
import { useSWRConfig } from "swr";
import { loginUrl } from "config/baseUrl";
import RegisterPanel from "./RegisterPanel";
import { HomePage } from "typings";
const LoginModal = dynamic(() => import("./LoginModal"), { ssr: false });

function Navbar() {
  const { Header } = Layout;
  const { list } = useGetCompetitionList();
  const router = useRouter();
  const [modal, setModal] = useState<HomePage.ModalProps>({
    type: "login",
    visible: false,
  });
  const { loginStatus } = useLoginStatus();
  const { removeToken } = useToken();
  const { mutate } = useSWRConfig();

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
        icon: <BsTrophyFill style={{ marginLeft: "16px" }} />,
        label: (
          <span style={{ marginLeft: "18px", marginRight: "16px" }}>比赛</span>
        ),
        key: "competition",
      },
      {
        icon: <BsTwitch size={15} style={{ marginLeft: "16px" }} />,
        label: (
          <span style={{ marginLeft: "18px", marginRight: "16px" }}>活动</span>
        ),
        key: "activity",
      },
      {
        icon: <BsSafe size={15} style={{ marginLeft: "16px" }} />,
        label: (
          <span style={{ marginLeft: "18px", marginRight: "16px" }}>
            每日一题
          </span>
        ),
        key: "daily",
      },
      {
        icon: <BsList size={15} style={{ marginLeft: "16px" }} />,
        label: (
          <span style={{ marginLeft: "18px", marginRight: "16px" }}>题库</span>
        ),
        key: "list",
      },
      {
        icon: <BsFile size={15} style={{ marginLeft: "16px" }} />,
        label: (
          <span style={{ marginLeft: "18px", marginRight: "16px" }}>PDF</span>
        ),
        key: "pdf",
      },
    ];
  }, []);

  return (
    <LoginModalShowContext.Provider value={{ modal, setModal }}>
      <Header
        style={{
          ...style,
          borderBottom: pathname === "/" ? "none" : "1px solid #dfdfdf",
        }}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          style={{ height: "100%", padding: "0px 20px" }}
        >
          <Flex alignItems="center">
            <Logo />
            <Menu
              theme={pathname === "/" ? "dark" : "light"}
              style={{ background: "transparent", border: "none" }}
              items={items}
              defaultSelectedKeys={[pathname.split("/")[1]]}
              mode={"horizontal"}
              onSelect={(info) => {
                if (info.key === "competition") {
                  if (list.length !== 0) {
                    router.push(`/competition/${list[0].id}`);
                  }
                } else if (info.key === "activity") {
                  router.push(`/activity`);
                } else if (info.key === "list") {
                  router.push("/list");
                } else if (info.key === "pdf") {
                  router.push("/pdf");
                } else {
                  if (loginStatus) {
                    router.push(`/daily/${loginStatus?.username}`);
                  } else {
                    message.error({ key: "login", content: "请先登录" });
                  }
                }
              }}
            />
          </Flex>
          <Flex alignItems="center">
            <BsGithub
              size={25}
              style={{ marginRight: "16px", cursor: "pointer", color: "#fff" }}
              onClick={() =>
                router.push("https://github.com/tohsaka888/coder-home")
              }
            />
            {!loginStatus ? (
              <>
                <BsPersonCircle
                  size={26}
                  style={{
                    marginRight: "16px",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                  onClick={() => {
                    setModal({
                      type: "register",
                      visible: true,
                    });
                  }}
                />
                <Button
                  type="primary"
                  shape={"round"}
                  style={{ width: "80px" }}
                  onClick={() => {
                    setModal({
                      type: "login",
                      visible: true,
                    });
                  }}
                >
                  登录
                </Button>
              </>
            ) : (
              <>
                <UserAvatar username={loginStatus.username} />
                <Button
                  danger
                  type="primary"
                  shape={"round"}
                  style={{ width: "100px", marginLeft: "16px" }}
                  onClick={() => {
                    removeToken();
                    mutate(`${loginUrl}/api/login/status`);
                  }}
                >
                  退出登录
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Header>
      <LoginModal width={600} title={modal.type}>
        {modal.type === "login" ? <LoginPanel /> : <RegisterPanel />}
      </LoginModal>
    </LoginModalShowContext.Provider>
  );
}

export default Navbar;
