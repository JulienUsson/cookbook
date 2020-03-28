import React, { useMemo } from "react";
import { useFindAllRecipes } from "./services/RecipeService";
import { Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./screens/Home";
import { getIndexFromRecipes } from "./services/LunrService";
import RecipeDetails from "./screens/RecipeDetails";

export default function App() {
  const { data: recipes, error } = useFindAllRecipes();
  const index = useMemo(() => {
    if (!recipes) {
      return undefined;
    }
    return getIndexFromRecipes(recipes);
  }, [recipes]);

  if (!recipes) {
    return <Typography>loading</Typography>;
  }

  if (error) {
    return <Typography>error</Typography>;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home recipes={recipes} />
        </Route>
        <Route exact path="/recettes/:id">
          <RecipeDetails recipes={recipes} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
