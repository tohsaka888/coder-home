import { Form, Button, message } from "antd";
import NightInput from "components/common/NightInput";
import useLoginOrRegister from "hooks/services/useLoginOrRegister";
import React, { useContext, useMemo, useState } from "react";
import { Flex } from "styles/index.style";
import { LoginModalShowContext } from "context";
import { NightFormContainer } from "../index.style";
import useCountDown from "hooks/useCountDown";
import NextPanel from "./NextPanel";

function RegisterPanel() {
  const { sendEmail, verifyEmail, loading } = useLoginOrRegister();
  // 邮箱
  const [email, setEmail] = useState<string>("");
  // 邮箱验证码
  const [emailCode, setEmailCode] = useState<string>("");
  const [goNext, setGoNext] = useState<boolean | undefined>(false);
  const { count, isRunning, countDown } = useCountDown();
  const [form] = Form.useForm();

  const emailStatus = useMemo(() => {
    if (email) {
      if (email.includes("@")) {
        return "success";
      } else {
        return "error";
      }
    } else {
      return "validating";
    }
  }, [email]);

  return (
    <>
      <NightFormContainer>
        {goNext ? (
          <>
            <NextPanel email={email} />
          </>
        ) : (
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
              form={form}
            >
              <Form.Item
                label={"邮箱"}
                name={"email"}
                hasFeedback
                rules={[{ required: true, message: "邮箱不得为空" }]}
                validateStatus={emailStatus}
              >
                <NightInput
                  key={"email"}
                  placeholder={"请输入邮箱"}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                label={"验证码"}
                name={"emailCode"}
                hasFeedback
                rules={[{ required: true, message: "邮箱验证码不得为空" }]}
                validateStatus={emailCode ? "success" : "validating"}
              >
                <Flex alignItems="center" justifyContent="space-between">
                  <NightInput
                    key={"emailCode"}
                    placeholder={"请输入验证码"}
                    onChange={(e) => {
                      setEmailCode(e.target.value);
                    }}
                  />
                  <Button
                    type={"link"}
                    onClick={async () => {
                      if (!isRunning) {
                        await form.validateFields(["email"]);
                        sendEmail(email);
                        countDown(60);
                      }
                    }}
                  >
                    {isRunning ? count + "s后重试" : "获取验证码"}
                  </Button>
                </Flex>
              </Form.Item>
            </Form>
            <Flex justifyContent="center">
              <Button
                type={"primary"}
                loading={loading}
                style={{ width: "100%", margin: "16px 48px" }}
                size={"large"}
                onClick={async () => {
                  await form.validateFields();
                  const goNext = await verifyEmail(email, emailCode);
                  if (!goNext) {
                    message.error({
                      key: "verify_error",
                      content: "验证码错误",
                    });
                  }
                  setGoNext(goNext);
                  // setModal((model) => ({ ...model, visible: false }));
                }}
              >
                验证
              </Button>
            </Flex>
          </>
        )}
      </NightFormContainer>
    </>
  );
}

export default RegisterPanel;
