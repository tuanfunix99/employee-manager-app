
import ListEmployee from "./components/Employee/ListEmployee";
import CreateEmployee from "./components/Employee/CreateEmployee";
import UpdateEmployee from "./components/Employee/UpdateEmployee";
import Header from "./components/Nav/Header";
import Footer from "./components/Nav/Footer";

import { Switch, Route } from "react-router-dom";

import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={ListEmployee} />
        <Route path="/create" exact component={CreateEmployee} />
        <Route path="/update/:id" exact component={UpdateEmployee} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
