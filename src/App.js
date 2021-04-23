import './App.css';
import Login from './components/Login/Login';
import Signup from './components/Login/Signup';
import 'primereact/resources/themes/saga-purple/theme.css';
import 'primeicons/primeicons.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from './components/Sidebar';


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

  return (
    <div>
      <Switch location={background || location}>
        <Route exact path="/" children={<Login />} />
        <Route path="/signup" children={<Signup />} />
        <Route path="/" children={<Sidebar />} />
      </Switch>

    </div >
  )
}

export default App;
