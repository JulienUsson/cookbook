import React, { useMemo } from "react";
import { useFindAllRecipes, RecipeTag } from "./services/RecipeService";
import { Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./screens/Home";
import RecipeDetails from "./screens/RecipeDetails";
import uniqBy from "lodash/uniqBy";

export default function App() {
  const [recipes, error] = useFindAllRecipes();

  const tags = useMemo(() => {
    if (!recipes) {
      return undefined;
    }
    const tags = recipes.reduce((acc, recipe) => {
      recipe.tags.forEach((t) => acc.push(t));
      return acc;
    }, [] as RecipeTag[]);
    return uniqBy(tags, "name");
  }, [recipes]);

  if (error) {
    return <Typography color="error">Erreur: Réessayer plus tard.</Typography>;
  }

  if (!recipes || !tags) {
    return <Typography>Chargement...</Typography>;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home recipes={recipes} tags={tags} />
        </Route>
        <Route exact path="/recettes/:id">
          <RecipeDetails recipes={recipes} tags={tags} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}
