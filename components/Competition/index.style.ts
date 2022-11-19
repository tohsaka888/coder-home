/*
 * @Author: tohsaka888
 * @Date: 2022-09-23 15:30:34
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 15:13:56
 * @Description: style
 */

import styled from "styled-components";

export const PartContainer = styled.div`
  background: #fff;
  padding: 8px;
  font-weight: bold;
`;

export const Container = styled.div`
  height: calc(100vh - 45px);
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px #cecece;
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 6px #cecece;
    background-color: #dfdfdf;
  }
`;

export const PartTitleContainer = styled.div`
  padding: 4px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #cecece;
  width: 100%;
`;
