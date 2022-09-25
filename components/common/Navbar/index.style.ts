/*
 * @Author: tohsaka888
 * @Date: 2022-09-23 14:33:39
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-23 14:39:48
 * @Description: style
 */

import styled from "styled-components";

export const LogoContainer = styled.div`
  background: linear-gradient(30deg, #c850c0, #ffcc70);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.8rem;
  font-weight: bolder;
  letter-spacing: 0;
  font-style: italic;
  cursor: pointer;
  padding-right: 16px;
  font-family: "Times New Roman", Times, serif;
`;

export const NightFormContainer = styled.div`
  & label {
    color: #fff !important;
    font-size: 1rem;
  }

  & input {
    background-color: transparent !important;
    color: #fff !important;
  }

  & .ant-form-item-control-input {
    background-color: transparent !important;
    color: #fff !important;
  }

  & .ant-form-item {
    background-color: transparent !important;
    color: #fff !important;
  }

  & .ant-input-affix-wrapper {
    background-color: transparent !important;
    color: #fff !important;
  }
`;
