import React from "react";
import { useFindAllRecipes } from "./services/RecipeService";
import { Typography } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./screens/Home";

export default function App() {
  const { data: recipes, error } = useFindAllRecipes();

  if (!recipes) {
    return <Typography>loading</Typography>;
  }

  if (error) {
    return <Typography>error</Typography>;
  }

  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home recipes={recipes} />
        </Route>
      </Switch>
    </Router>
  );
}
