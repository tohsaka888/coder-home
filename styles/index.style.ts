/*
 * @Author: tohsaka888
 * @Date: 2022-09-23 14:21:10
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-09-23 14:29:32
 * @Description: 组件样式
 */

import styled from "styled-components";

type FlexProps = {
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  flex?: number;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  flex-direction: ${({ flexDirection }) => flexDirection};
  flex: ${({ flex }) => flex};
`
