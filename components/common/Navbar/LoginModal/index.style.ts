/*
 * @Author: tohsaka888
 * @Date: 2022-09-23 16:24:48
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-23 17:17:08
 * @Description: style
 */

import styled from "styled-components";

export const Mask = styled.div`
  opacity: 0.7;
  background-color: rgba(255, 255, 255, 0.7);
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  z-index: 10;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  font-family: "Courier New", Courier, monospace;
  font-style: italic;
  font-weight: bolder;
  padding: 4px;
`;

export const ImageContainer = styled.div<{ top: number; left: number }>`
  position: absolute;
  left: ${({ left }) => left + "px"};
  top: ${({ top }) => top + "px"};
`;
