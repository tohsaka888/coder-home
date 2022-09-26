/*
 * @Author: tohsaka888
 * @Date: 2022-09-26 13:38:21
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-26 15:46:39
 * @Description: 注册面板
 */

import { Button, Form, message } from "antd";
import NightInput from "components/common/NightInput";
import { baseUrl } from "config/baseUrl";
import { LoginModalShowContext } from "context";
import useAuthCode from "hooks/services/useAuthCode";
import useLoginOrRegister from "hooks/services/useLoginOrRegister";
import React, { useContext, useMemo, useState } from "react";
import { Flex } from "styles/index.style";
import { useSWRConfig } from "swr";

type Props = {
  email: string;
};

function NextPanel({ email }: Props) {
  const { authcode } = useAuthCode();
  const { mutate } = useSWRConfig();
  // 验证码
  const [code, setCode] = useState<string>("");
  const [form] = Form.useForm();
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const { loading, register, forget } = useLoginOrRegister();
  const { modal, setModal } = useContext(LoginModalShowContext)!;

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
      <Form
        style={{
          marginTop: "36px",
          marginLeft: "36px",
          marginRight: "36px",
        }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 19 }}
        requiredMark={"optional"}
        initialValues={{ email }}
        form={form}
      >
        <Form.Item
          label={"邮箱"}
          name={"email"}
          hasFeedback
          validateStatus="success"
          rules={[{ required: true, message: "邮箱不得为空" }]}
        >
          <NightInput disabled />
        </Form.Item>
        {modal.type === "register" && (
          <Form.Item
            label={"用户名"}
            name={"username"}
            hasFeedback
            validateStatus={username ? "success" : "validating"}
            rules={[{ required: true, message: "用户名不得为空" }]}
          >
            <NightInput
              placeholder={"请输入用户名"}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
        )}
        <Form.Item
          label={"密码"}
          name={"password"}
          hasFeedback
          validateStatus={password ? "success" : "validating"}
          rules={[{ required: true, message: "密码不得为空" }]}
        >
          <NightInput
            type={"password"}
            placeholder={"请输入密码"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label={"确认密码"}
          name={"password-confirm"}
          rules={[{ required: true, message: "密码不得为空" }]}
          hasFeedback
          validateStatus={
            newPassword
              ? password === newPassword
                ? "success"
                : "error"
              : "validating"
          }
        >
          <NightInput
            placeholder={"请输入密码"}
            type={"password"}
            onChange={(e) => setNewPassword(e.target.value)}
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
      <Flex justifyContent="center">
        <Button
          type={"primary"}
          loading={loading}
          style={{ width: "100%", margin: "16px 48px" }}
          size={"large"}
          onClick={async () => {
            await form.validateFields();
            if (modal.type === "register") {
              const result = await register(email, password, username);
              if (result) {
                message.success("注册成功");
              } else {
                message.error("注册失败");
              }
            } else {
              const result = await forget(email, password);
              if (result) {
                message.success("重置成功");
              } else {
                message.error("重置失败");
              }
            }
            setModal({ ...modal, visible: false });
          }}
        >
          {modal.type === "forget" ? "重置" : "注册"}
        </Button>
      </Flex>
    </>
  );
}

export default NextPanel;
