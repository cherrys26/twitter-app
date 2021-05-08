import React, { useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import 'primereact/resources/themes/saga-purple/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import FirstStep from './components/Login/FirstStep';
import Header from './components/Login/Header';
import SecondStep from './components/Login/SecondStep';
import ThirdStep from './components/Login/ThirdStep';
import Sidebar from './components/Sidebar';
import Home from './components//sidebar-components/Home'
function App() {
  return (
    <div className="App">
      <Router>
        <PageSwitch />
      </Router>
    </div >
  );
}

function PageSwitch() {
  let location = useLocation();
  let background = location.state && location.state.background;

  const [user, setUser] = useState({});
  const [postTweet, setPostTweet] = useState({});

  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };

  const resetUser = () => {
    setUser({});
  };

  const TweetPost = () => {
    setPostTweet({})
  }


  return (
    <div>
      <Switch location={background || location}>
        <>
          <Header />
          <Switch>
            <Route component={Login} exact path="/" />
            <Route
              render={(props) => (
                <FirstStep {...props} user={user} updateUser={updateUser} />
              )}
              path="/signup1"
              exact={true}
            />
            <Route
              render={(props) => (
                <SecondStep {...props} user={user} updateUser={updateUser} />
              )}
              path="/signup2"
            />
            <Route
              render={(props) => (
                <ThirdStep
                  {...props}
                  user={user}
                  updateUser={updateUser}
                  resetUser={resetUser}
                />
              )}
              path="/signup3"
            />
            <Route render={(props) => (<Home {...props} postTweet={postTweet} TweetPost={TweetPost} />)} path="/home" component={Sidebar} />
            <Route path="/explore" component={Sidebar} />
            <Route path="/notifications" component={Sidebar} />
            <Route path="/messages" component={Sidebar} />
            <Route path="/:username" component={Sidebar} />
          </Switch>
        </>
      </Switch>

    </div >
  )
}

export default App;
