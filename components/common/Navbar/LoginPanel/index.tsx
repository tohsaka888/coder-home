import { Form, Button } from "antd";
import NightInput from "components/common/NightInput";
import { baseUrl } from "config/baseUrl";
import useAuthCode from "hooks/services/useAuthCode";
import useLoginOrRegister from "hooks/services/useLoginOrRegister";
import React, { useContext, useMemo, useState } from "react";
import { Flex } from "styles/index.style";
import { useSWRConfig } from "swr";
import { LoginModalShowContext } from "context";
import { NightFormContainer } from "../index.style";

type AccountProps =
  | ({ type: "username" } & { username: string; password: string })
  | ({ type: "email" } & { email: string; password: string });

function LoginPanel() {
  const { login, loading } = useLoginOrRegister();
  const { authcode } = useAuthCode();
  const { mutate } = useSWRConfig();
  const [account, setAccount] = useState<AccountProps>({
    type: "username",
    username: "",
    password: "",
  });
  const [code, setCode] = useState<string>("");
  const { setModal } = useContext(LoginModalShowContext)!;
  const [form] = Form.useForm();

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
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          requiredMark={"optional"}
        >
          <Form.Item
            label={account.type === "username" ? "用户名" : "邮箱"}
            name={account.type}
            hasFeedback
            rules={[{ required: true, message: "用户名不得为空" }]}
            validateStatus={
              account.type === "username"
                ? account.username
                  ? "success"
                  : "validating"
                : account.email
                ? "success"
                : "validating"
            }
          >
            <NightInput
              key={account.type}
              placeholder={
                account.type === "username" ? "请输入用户名" : "请输入邮箱"
              }
              onChange={(e) => {
                if (account.type === "username") {
                  setAccount({ ...account, username: e.target.value });
                } else {
                  setAccount({ ...account, email: e.target.value });
                }
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
                  style={{
                    cursor: "pointer",
                    width: "100px",
                    boxShadow: "0px 0px 10px 1px #1890ff",
                    borderRadius: '10px'
                  }}
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
          <Button
            type="link"
            size={"large"}
            onClick={() => {
              if (account.type === "username") {
                setAccount({ type: "email", email: "", password: "" });
              } else {
                setAccount({ type: "username", password: "", username: "" });
              }
            }}
          >
            {account.type === "username" ? "邮箱登录" : "用户名登录"}
          </Button>
          <Button
            type="link"
            size={"large"}
            onClick={() => {
              setModal({ type: "forget", visible: true });
            }}
          >
            找回密码
          </Button>
        </Flex>
        <Flex justifyContent="center">
          <Button
            type={"primary"}
            loading={loading}
            style={{ width: "100%", margin: "16px 48px" }}
            size={"large"}
            onClick={async () => {
              await form.validateFields();
              await login({ ...account });
              setModal((model: any) => ({ ...model, visible: false }));
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
