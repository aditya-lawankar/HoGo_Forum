// import './App.css';
import Homepage from './Pages/Homepage';
import { Route, Router, Switch } from 'react-router-dom';
import Chatpage from './Pages/Chatpage';
import Directory from './components/Directories/Directories';
import Landing from './components/Landing/landing';
function App() {
  return (
    <div className="App">
      {/* <Router>
        <Switch> */}
      <Route path="/" component={Landing} exact />
      <Route path="/login" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />
      <Route path="/directories" component={Directory} />
      {/* </Switch>
      </Router> */}
    </div>
  );
}

export default App;
