import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar.component";
import NotFound from "./pages/NotFound.component";
import Calendar from "./components/MyCalendar";
import List from "./components/List.component";
import { useState } from "react";

const App = () => {
  const [datesList, setDatesList] = useState([]);

  console.log(datesList);

  return (
    <div>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Calendar setDatesList={setDatesList} />
          </Route>
          <Route exact path="/:date">
            <List di={datesList.id} />
          </Route>
          {/* <Route exact path="/products" component={Products} />
          <Route exact path="/product/:id" component={ProductsDetail} /> */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
