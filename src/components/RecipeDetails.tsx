import React from "react";
import { Recipe } from "../services/RecipeService";

interface Props {
  recipe: Recipe;
}

export default function RecipeDetails({ recipe }: Props) {
  return (
    <div>
      <div>{recipe.name}</div>
      <div dangerouslySetInnerHTML={{ __html: recipe.detailsHtml }} />
    </div>
  );
}
