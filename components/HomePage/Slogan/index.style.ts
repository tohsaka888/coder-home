/*
 * @Author: tohsaka888
 * @Date: 2022-09-16 17:05:00
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-19 09:21:48
 * @Description: 请填写简介
 */

import styled from "styled-components";

export const SloganContainer = styled.div<{ locale: 'zh' | 'en' }>`
  position: fixed;
  top: ${({ locale }) => locale === 'zh' ? '30vh' : 'calc(30vh + 5rem)'};
  left: 3vw;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

export const Text = styled.div`
  background: -webkit-linear-gradient(315deg,#fc3f00,#00fcf5);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`
