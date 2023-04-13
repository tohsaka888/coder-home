import { Form, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { NextPage } from "next";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { Question } from "typings";

const ListPage: NextPage<any> = (props) => {
  const list = useMemo(() => props.props.list || [], [props.props.list]);
  const [question, setQuestion] = useState<Question>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const columns = useMemo<ColumnsType<any>>(() => {
    return [
      {
        title: "题目名称",
        dataIndex: "question",
        key: "id",
        width: 300,
        ellipsis: true,
      },
      {
        title: "类别",
        dataIndex: "tag_type",
        render(val, record) {
          if (val === "front_end") {
            return "前端";
          } else if (val === "back_end") {
            return "后端";
          } else {
            return "运维";
          }
        },
        width: 80,
        ellipsis: true,
        filterMode: "menu",
        filters: [
          {
            text: "前端",
            value: "front_end",
          },
          {
            text: "后端",
            value: "back_end",
          },
          {
            text: "运维",
            value: "ops",
          },
        ],
        onFilter: (value, record) => record["tag_type"] === value,
      },
      {
        title: "选项A",
        dataIndex: ["answer", "A"],
        width: 200,
        ellipsis: true,
      },
      {
        title: "选项B",
        dataIndex: ["answer", "B"],
        width: 200,
        ellipsis: true,
      },
      {
        title: "选项C",
        dataIndex: ["answer", "C"],
        width: 200,
        ellipsis: true,
      },
      {
        title: "选项D",
        dataIndex: ["answer", "D"],
        width: 200,
        ellipsis: true,
      },
      {
        title: "操作",
        dataIndex: "operator",
        fixed: "right",
        render(val, record) {
          return (
            <span
              onClick={() => {
                setQuestion(record);
                setIsOpen(true);
              }}
              style={{ color: "#1890ff", cursor: "pointer" }}
            >
              查看
            </span>
          );
        },
      },
    ];
  }, []);

  return (
    <ListContainer>
      <Table
        dataSource={list}
        columns={columns}
        scroll={{ x: 1250 }}
        pagination={{
          showPrevNextJumpers: true,
          showQuickJumper: true,
          showSizeChanger: true,
        }}
      />
      <Modal
        title={"问题查看"}
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
      >
        <Form style={{ marginTop: "24px" }}>
          <Form.Item label={"问题详情"} key={"question"}>
            {question?.question}
          </Form.Item>
          <Form.Item label={"类型"} key={"type"}>
            {question?.tag_type === "front_end" && "前端"}
            {question?.tag_type === "back_end" && "后端"}
            {question?.tag_type === "ops" && "运维"}
          </Form.Item>
          <Form.Item label={"答案A"} key={"A"}>
            {question?.answer.A}
          </Form.Item>
          <Form.Item label={"答案B"} key={"B"}>
            {question?.answer.B}
          </Form.Item>
          <Form.Item label={"答案C"} key={"C"}>
            {question?.answer.C}
          </Form.Item>
          <Form.Item label={"答案D"} key={"D"}>
            {question?.answer.D}
          </Form.Item>
          {/* <Form.Item label={"正确答案"} key={"correct"}>
            {question?.correctAnswer}
          </Form.Item> */}
        </Form>
      </Modal>
    </ListContainer>
  );
};

ListPage.getInitialProps = async () => {
  const res = await fetch(`https://www.coder-home.top:8080/questions/all`);
  const data = await res.json();
  return {
    props: {
      list: data as Question[],
    },
  };
};

const ListContainer = styled.div`
  margin: 16px 15vw;
  border: 1px solid #dfdfdf;
  padding: 8px;
  background-color: #f9f9f9;
`;

export default ListPage;
