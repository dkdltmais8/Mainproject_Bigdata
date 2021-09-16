import { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main/Main.js';
import MyPage from './pages/MyPage/MyPage.js';
import Survey from './pages/Auth/Survey.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state={

    }
  }
  render() {
    return(
      <div className='App'>
        <BrowserRouter>
          <Route path="/main" component={Main}/>
          <Route path="/mypage" component={MyPage}/>
          <Route path="/survey" component={Survey}/>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
