import React, { useState } from 'react';
import './App.css';
import Login from './components/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from './components/Sidebar';
import Home from './components/sidebar-components/Home'
import Profile from './components/sidebar-components/Profile'
import Signup from './components/Login/Signup';
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
  const [updateFollowing, setFollowing] = useState();
  const [deleteFollowing, setDeleteFollowing] = useState();

  const updateUser = (data) => {
    setUser((prevUser) => ({ ...prevUser, ...data }));
  };

  const resetUser = () => {
    setUser({});
  };

  const TweetPost = () => {
    setPostTweet({})
  }
  const updateFollow = () => {
    setFollowing()
  }
  const removeFollow = () => {
    setDeleteFollowing()
  }


  return (
    <div>
      <Switch location={background || location}>
        <>
          <Switch>
            <Route component={Login} exact path="/" />
            <Route
              render={(props) => (
                <Signup
                  {...props}
                  user={user}
                  updateUser={updateUser}
                  resetUser={resetUser}
                />
              )}
              path="/signup"
            />
            <Route render={(props) => (<Home {...props} postTweet={postTweet} TweetPost={TweetPost} />)} path="/home" component={Sidebar} />
            <Route path="/explore" component={Sidebar} />
            <Route path="/notifications" component={Sidebar} />
            <Route path="/messages" component={Sidebar} />
            <Route render={(props) => (<Profile {...props}
              updateFollowing={updateFollowing} updateFollow={updateFollow}
              {...props} deleteFollowing={deleteFollowing}
              removeFollow={removeFollow}
            />)} path="/:username" component={Sidebar} />
            <Route exact path="/:username" component={Sidebar} />
            <Route exact path="/:username/:id" component={Sidebar} />
            <Route path="/:username/followers" component={Sidebar} />
            <Route path="/:username/following" component={Sidebar} />
          </Switch>
        </>
      </Switch>

    </div >
  )
}

export default App;
