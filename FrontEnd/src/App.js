import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; // 라우터
import './App.css';
import GlobalStyle from "./GlobalStyle"; // 전역으로 CSS를 적용시킵니다.
import main from './pages/Main/main.js'; // main 불러오기
import MyPage from './pages/MyPage/MyPage.js'; // mypage 불러오기
import Survey from './pages/Auth/Survey.js'; // 설문 불러오기

function App () {
    return(
      <>
        <GlobalStyle/>
            <BrowserRouter>
              <Switch>
                <Route path="/main" component={main}/>
                <Route path="/mypage" component={MyPage}/>
                <Route path="/survey" component={Survey}/>
              </Switch>
            </BrowserRouter>
      </>
    )
}

export default App;

//npm install slick-carousel
//npm install react-slick
//npm install --save styled-components
//npm install --save styled-reset 
//npm install @material-ui/core
//npm install @material-ui/icons
//npm install react-star-rating-component --save

//npm install @mui/material @mui/styled-engine-sc styled-components 매터리어UI 스타일드컴포넌트
//npm install @mui/material @emotion/react @emotion/styled 매터리얼 UI
//npm install @mui/icons-material  매터리얼 ui svg