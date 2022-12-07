import './App.css';
import Nav from './component/NavigationBar'
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Home from "./pages/Home"
import Edit from "./pages/Edit"
import Login from "./pages/Login"
function App() {
  return (
    <div className="App">
        <Nav/>
        <BrowserRouter>
        <main>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/edit/:id" component={Edit} exact/>
            <Route path="/login" component={Login} exact/>
          </Switch>
        </main>
        </BrowserRouter>
    </div>
  );
}

export default App;
