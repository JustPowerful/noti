import { BrowserRouter, Switch, Route } from "react-router-dom";

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login";

// Components
import Navbar from "./components/main/Navbar.tsx";
import Dashboard from "./pages/Dashboard.tsx";

// npm install --save-dev @types/node @types/react @types/react-dom @types/jest @types/react-router-dom

function Routes() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Routes;
