// 전역으로 css를 적용시킬수있습니다.
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Helvetica", "Arial", sans-serif;
    line-height: 1.5;
    justify-content:center;
    background-color: #1C1212;
    color: white;
  }

  button{
    background-color: #7D54BD;
    color: white;
  }
`;

export default GlobalStyle;

