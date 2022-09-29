/*
 * @Author: tohsaka888
 * @Date: 2022-09-29 15:19:47
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 15:56:50
 * @Description: 获奖者表格
 */

import { Form, Row, Col, Input, Table, Modal, Select } from "antd";
import { ColumnsType } from "antd/lib/table";
import useGetCompetitionDetail from "hooks/services/useGetCompetitionDetail";
import React, { useMemo, useState } from "react";
import {
  BsFillPersonFill,
  BsFillEnvelopeFill,
  BsGeoAltFill,
  BsTrophyFill,
} from "react-icons/bs";
import { Flex } from "styles/index.style";

type Props = {
  visible: boolean;
  onCancel?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onOk?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

function AwardTableModal({ visible, onCancel, onOk }: Props) {
  const { competition } = useGetCompetitionDetail();

  const [params, setParams] = useState<Competition.Winner>({
    username: "",
    email: "",
    _id: "",
    award: "",
  });

  const dataSource = useMemo(() => {
    return competition
      ? competition.winners.filter(
          (participant) =>
            participant._id.includes(params._id) &&
            participant.username.includes(params.username) &&
            participant.email.includes(params.email) &&
            participant.award.includes(params.award)
        )
      : [];
  }, [competition, params._id, params.award, params.email, params.username]);

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
      {
        title: "获得奖项",
        dataIndex: "award",
        key: "award",
        render(text, record) {
          return (
            <Flex alignItems="center">
              <BsTrophyFill style={{ marginRight: "8px" }} />
              {text}
            </Flex>
          );
        },
      },
    ];
  }, []);

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      title={"获奖名单"}
      width={"75vw"}
      onOk={onOk}
    >
      <Form
        style={{ fontWeight: "normal", marginTop: "8px" }}
        labelCol={{ span: "5" }}
        wrapperCol={{ span: "21" }}
      >
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
          <Col span={8}>
            <Form.Item label={"奖项"} style={{ margin: "8px" }}>
              <Select
                value={params.award || undefined}
                placeholder="奖项筛选"
                options={[
                  {
                    label: "全部",
                    value: "",
                  },
                  {
                    label: "一等奖",
                    value: "一等奖",
                  },
                  {
                    label: "二等奖",
                    value: "二等奖",
                  },
                  {
                    label: "三等奖",
                    value: "三等奖",
                  },
                  {
                    label: "优秀奖",
                    value: "优秀奖",
                  },
                ]}
                onChange={(value) => {
                  setParams({ ...params, award: value });
                }}
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
    </Modal>
  );
}

export default AwardTableModal;
