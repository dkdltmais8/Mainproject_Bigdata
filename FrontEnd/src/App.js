import './App.css';
// 추가 부분
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect, } from 'react-router-dom';

import Signup from './pages/Auth/Signup';
import Signin from './pages/Auth/Signin';
import Movietimain from './pages/MovieTi/Movietimain';
import Movietipage1 from './pages/MovieTi/Movietipage1';
import Movietipage2 from './pages/MovieTi/Movietipage2';
import Movietipage3 from './pages/MovieTi/Movietipage3';
import Movietipage4 from './pages/MovieTi/Movietipage4';
import Movietipage5 from './pages/MovieTi/Movietipage5';
import Movietipage6 from './pages/MovieTi/Movietipage6';
import Movietipage7 from './pages/MovieTi/Movietipage7';
import Movietipage8 from './pages/MovieTi/Movietipage8';
import Movietipage9 from './pages/MovieTi/Movietipage9';
import Movietipage10 from './pages/MovieTi/Movietipage10';
import Movietipage11 from './pages/MovieTi/Movietipage11';
import Movietipage12 from './pages/MovieTi/Movietipage12';
import Movietiresult from './pages/MovieTi/Movietiresult';


function App() {

  //pageId로 임시 지정
  // const [pageId, setPageId] = useState([]);

  return (
    <BrowserRouter>
      <div style={{height:'100vh', backgroundColor:''}} >
        <Switch >
          {/* <Route exact path="/" component={} /> */}
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/movie/movieti" component={Movietimain} />
          <Route exact path="/movie/movieti/1" component={Movietipage1} />
          <Route exact path="/movie/movieti/2" component={Movietipage2} />
          <Route exact path="/movie/movieti/3" component={Movietipage3} />
          <Route exact path="/movie/movieti/4" component={Movietipage4} />
          <Route exact path="/movie/movieti/5" component={Movietipage5} />
          <Route exact path="/movie/movieti/6" component={Movietipage6} />
          <Route exact path="/movie/movieti/7" component={Movietipage7} />
          <Route exact path="/movie/movieti/8" component={Movietipage8} />
          <Route exact path="/movie/movieti/9" component={Movietipage9} />
          <Route exact path="/movie/movieti/10" component={Movietipage10} />
          <Route exact path="/movie/movieti/11" component={Movietipage11} />
          <Route exact path="/movie/movieti/12" component={Movietipage12} />
          <Route exact path="/movie/movieti/result" component={Movietiresult} />
          {/* <RestrictedRoute restricted={true} path="/" component={} exact/> */}

          {/* route외의 주소는 NotFound로 빠지도록 */}
          <Redirect to="/notfound" />
        </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
