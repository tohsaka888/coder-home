/*
 * @Author: tohsaka888
 * @Date: 2022-09-29 16:27:08
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-29 17:14:29
 * @Description: style
 */

import styled from "styled-components";

export const Container = styled.div`
  padding: 0px 18vw;
  background-color: #f9f9f9;
`;

export const Target = styled.div`
  padding: 16px;
  background-color: #fff;
  height: calc(100vh - 65px);
  overflow: scroll;
  overflow-x: hidden;
  /* box-shadow: 0px 0px 10px 5px #dfdfdf; */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset006pxrgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    box-shadow: inset rgba(0, 0, 0, 0.5);
  }

  & .ant-image {
    /* margin-right: 8px; */
    border: 1px solid #cecece;
  }
`;

export const ActivityName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Time = styled.div`
  color: #999999;
  font-size: 13px;
`;

export const Prefix = styled.a`
  margin-left: 12px;
  margin-right: 16px;
`;

export const Username = styled.div`
  font-weight: bold;
`;

export const Email = styled.a`
  font-weight: bold;
  text-decoration: none;
  font-size: 12px;
`;
