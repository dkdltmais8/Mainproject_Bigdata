import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; // 라우터
import './App.css';
import GlobalStyle from "./GlobalStyle"; // 전역으로 CSS를 적용시킵니다.
import Main from './pages/Main/Main.js'; // main 불러오기
import MyPage from './pages/MyPage/MyPage.js'; // mypage 불러오기
import Survey from './pages/Auth/Survey.js'; // 설문 불러오기

function App () {
    return(
      <>
        <GlobalStyle/>
            <BrowserRouter>
              <Switch>
                <Route path="/main" component={Main}/>
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