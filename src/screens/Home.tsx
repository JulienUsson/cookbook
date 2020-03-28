import React from "react";
import { Recipe } from "../services/RecipeService";
import RecipeDetails from "../components/RecipeDetails";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { getIssuesLink } from "../services/GithubService";

interface Props {
  recipes: Recipe[];
}

export default function Home({ recipes }: Props) {
  return (
    <div>
      {recipes.map(recipe => (
        <RecipeDetails key={recipe.id} recipe={recipe} />
      ))}
      <Fab
        component="a"
        color="primary"
        aria-label="add"
        href={getIssuesLink()}
        target="_blank"
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
