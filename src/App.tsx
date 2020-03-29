import React, { useMemo } from "react";
import { useFindAllRecipes, useFindAllTags } from "./services/RecipeService";
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
  const { data: recipes, error: recipesError } = useFindAllRecipes();
  const { data: tags, error: tagsError } = useFindAllTags();

  const index = useMemo(() => {
    if (!recipes) {
      return undefined;
    }
    return getIndexFromRecipes(recipes);
  }, [recipes]);

  if (!recipes || !tags) {
    return <Typography>loading</Typography>;
  }

  if (recipesError || tagsError) {
    return <Typography>error</Typography>;
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
