/*
 * @Author: tohsaka888
 * @Date: 2022-09-29 11:17:33
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 15:20:20
 * @Description: 参加者表格
 */

import { Col, Form, Input, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import useGetCompetitionDetail from "hooks/services/useGetCompetitionDetail";
import React, { useMemo, useState } from "react";
import {
  BsFillEnvelopeFill,
  BsFillPersonFill,
  BsGeoAltFill,
} from "react-icons/bs";
import { Flex } from "styles/index.style";

function ParticipantTable() {
  const { competition } = useGetCompetitionDetail();

  const [params, setParams] = useState<Competition.Participant>({
    username: "",
    email: "",
    _id: "",
  });

  const dataSource = useMemo(() => {
    return competition
      ? competition.participants.filter(
          (participant) =>
            participant._id.includes(params._id) &&
            participant.username.includes(params.username) &&
            participant.email.includes(params.email)
        )
      : [];
  }, [competition, params._id, params.email, params.username]);

  const columns: ColumnsType<Competition.Participant> = useMemo(() => {
    return [
      {
        title: "用户名",
        dataIndex: "username",
        key: "username",
        render(text, record) {
          return (
            <Flex alignItems="center">
              <BsFillPersonFill style={{ marginRight: "8px" }} />
              {text}
            </Flex>
          );
        },
      },
      {
        title: "邮箱",
        dataIndex: "email",
        key: "email",
        render(text, record) {
          return (
            <Flex alignItems="center">
              <BsFillEnvelopeFill style={{ marginRight: "8px" }} />
              {text}
            </Flex>
          );
        },
      },
      {
        title: "用户Id",
        dataIndex: "_id",
        key: "_id",
        render(text, record) {
          return (
            <Flex alignItems="center">
              <BsGeoAltFill style={{ marginRight: "8px" }} />
              {text}
            </Flex>
          );
        },
      },
    ];
  }, []);

  return (
    <>
      <Form size="small" style={{ fontWeight: "normal", marginTop: "8px" }}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label={"用户名"} style={{ margin: "8px" }}>
              <Input
                placeholder="用户名筛选"
                onChange={(e) =>
                  setParams({ ...params, username: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={"邮箱"} style={{ margin: "8px" }}>
              <Input
                placeholder="邮箱筛选"
                onChange={(e) =>
                  setParams({ ...params, email: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={"id"} style={{ margin: "8px" }}>
              <Input
                placeholder="id筛选"
                onChange={(e) => setParams({ ...params, _id: e.target.value })}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        size="small"
        rowKey={"_id"}
        style={{ fontWeight: "normal", height: "250px", marginTop: "8px" }}
        pagination={{
          pageSize: 5,
          showPrevNextJumpers: true,
          // showSizeChanger: true,
          // showLessItems: true,
          showQuickJumper: true,
        }}
      />
    </>
  );
}

export default ParticipantTable;
