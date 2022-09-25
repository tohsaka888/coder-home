import { Form, Button } from "antd";
import NightInput from "components/common/NightInput";
import { baseUrl } from "config/baseUrl";
import useAuthCode from "hooks/services/useAuthCode";
import useLoginOrRegister from "hooks/services/useLoginOrRegister";
import useLoginStatus from "hooks/services/useLoginStatus";
import authcode from "pages/api/authcode";
import React, { useContext, useMemo, useState } from "react";
import { Flex } from "styles/index.style";
import { mutate, useSWRConfig } from "swr";
import { LoginModalShowContext } from "../context";
import { NightFormContainer } from "../index.style";

function LoginPanel() {
  const { login } = useLoginOrRegister();
  const { loginStatus } = useLoginStatus();
  const { authcode } = useAuthCode();
  const { mutate } = useSWRConfig();
  const [account, setAccount] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });
  const [code, setCode] = useState<string>("");
  const { setVisible } = useContext(LoginModalShowContext)!;

  const codeStatus = useMemo(() => {
    if (authcode) {
      if (code) {
        if (code.toLocaleLowerCase() === authcode.text.toLocaleLowerCase()) {
          return "success";
        } else {
          return "error";
        }
      } else {
        return "validating";
      }
    } else {
      return "validating";
    }
  }, [authcode, code]);
  return (
    <>
      <NightFormContainer>
        <Form
          style={{
            marginTop: "36px",
            marginLeft: "36px",
            marginRight: "36px",
          }}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          requiredMark={"optional"}
        >
          <Form.Item
            label={"用户名"}
            name={"username"}
            hasFeedback
            rules={[{ required: true, message: "用户名不得为空" }]}
            validateStatus={account.username ? "success" : "validating"}
          >
            <NightInput
              key={"username"}
              placeholder={"请输入用户名"}
              onChange={(e) => {
                setAccount({ ...account, username: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item
            label={"密码"}
            name={"password"}
            rules={[{ required: true, message: "密码不得为空" }]}
            hasFeedback
            validateStatus={account.password ? "success" : "validating"}
          >
            <NightInput
              key={"password"}
              placeholder={"请输入密码"}
              type={"password"}
              onChange={(e) => {
                setAccount({ ...account, password: e.target.value });
              }}
            />
          </Form.Item>
          {authcode && (
            <Form.Item
              label={"验证码"}
              name={"code"}
              rules={[{ required: true, message: "验证码不得为空" }]}
              hasFeedback
              validateStatus={codeStatus}
            >
              <Flex
                flex={1}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <NightInput
                  key={"code"}
                  placeholder={"请输入验证码"}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                />
                <div
                  dangerouslySetInnerHTML={{ __html: authcode.data }}
                  style={{ cursor: "pointer", width: "100px" }}
                  onClick={() => {
                    mutate(`${baseUrl}/api/authcode`);
                  }}
                />
              </Flex>
            </Form.Item>
          )}
        </Form>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          style={{ margin: "0px 36px" }}
        >
          <Button type="link" size={"large"}>
            邮箱登录
          </Button>
          <Button type="link" size={"large"}>
            找回密码
          </Button>
        </Flex>
        <Flex justifyContent="center">
          <Button
            type={"primary"}
            style={{ width: "100%", margin: "16px 48px" }}
            size={"large"}
            onClick={async () => {
              await login({ ...account, type: "username" });
              setVisible(false);
            }}
          >
            登录
          </Button>
        </Flex>
      </NightFormContainer>
    </>
  );
}

export default LoginPanel;
