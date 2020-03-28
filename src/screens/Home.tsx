import React from "react";
import { Recipe } from "../services/RecipeService";
import RecipeDetails from "../components/RecipeDetails";

interface Props {
  recipes: Recipe[];
}

export default function Home({ recipes }: Props) {
  return (
    <div>
      {recipes.map(recipe => (
        <RecipeDetails recipe={recipe} />
      ))}
    </div>
  );
}
