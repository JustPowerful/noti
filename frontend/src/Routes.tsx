import { BrowserRouter, Switch, Route } from "react-router-dom";

// Pages
import Register from "./pages/Register";

// npm install --save-dev @types/node @types/react @types/react-dom @types/jest @types/react-router-dom

function Routes() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login"></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Routes;
