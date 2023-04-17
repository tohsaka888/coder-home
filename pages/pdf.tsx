import React from "react";
import styled from "styled-components";
import { Image } from "antd";

const pdfArr = [
  {
    fileName: "Linux系统基础",
    url: "https://www.coder-home.top:8083/file/download/307691f68c7146cbbc75904595ef04b4",
  },
  {
    fileName: "基于可信预测值的协同过滤推荐算法_邓泓",
    url: "https://www.coder-home.top:8083/file/download/f33a71237d4e40ba9769dc84730e692b",
  },
  {
    fileName: "基于用户和项目的协同过滤算法的比较研究_罗洁",
    url: "https://www.coder-home.top:8083/file/download/eb39012fcf4a4a92ac21e425884b4749",
  },
  {
    fileName: "基于用户学习特征协同过滤算法的个性化学习推荐模型的研究与设计",
    url: "https://www.coder-home.top:8083/file/download/7474601dcde14836b28aad2ea49041d5",
  },
  {
    fileName: "融合协同过滤个性化模型的课程资源定制化推荐_杨冰清",
    url: "https://www.coder-home.top:8083/file/download/066c365169744f0199e958f3aa01dfc0",
  },
];

function PDF() {
  return (
    <PDFContainer>
      {pdfArr.map((item) => {
        return (
          <PDFPart key={item.fileName}>
            <Image
              width={250}
              src={"https://files.catbox.moe/vs86l8.png"}
              alt={"pdf"}
              height={320}
            />
            <PDFLink href={item.url}>{item.fileName}</PDFLink>
          </PDFPart>
        );
      })}
    </PDFContainer>
  );
}

const PDFContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PDFPart = styled.div`
  width: 280px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-basis: auto;
`;

const PDFLink = styled.a`
  color: #1890ff;
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  margin-top: 330px;
  font-size: 16px;
`;

export default PDF;
