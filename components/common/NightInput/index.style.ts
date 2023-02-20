import styled from "styled-components";

export const NightInputContainer = styled.div`
  & * {
    /* border: none; */
  }
  & .ant-input {
    /* background-color: transparent !important; */
    color: #000 !important;
  }

  & .ant-input:focus {
    box-shadow: none;
  }
`;
