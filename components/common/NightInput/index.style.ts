import styled from "styled-components";

export const NightInputContainer = styled.div`
  & * {
    border: none;
  }
  & .ant-input {
    background-color: transparent !important;
    color: #fff;
  }

  & .ant-input:focus {
    box-shadow: none;
  }
`;
