import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { RecipeIngredient } from "../services/RecipeService";

interface Props {
  ingredients: RecipeIngredient[];
  servings: number;
}

export default function Ingredients({
  ingredients: ingredientsProp,
  servings: servingsProp
}: Props) {
  const [servings, setServings] = useState<number>(servingsProp);

  return (
    <div>
      <Typography>Personnes: {servings}</Typography>
      <Typography variant="h6">Ingrédients :</Typography>
      {ingredientsProp.map((ingredient, index) => (
        <Typography key={index}>
          {ingredient.quantity}
          {ingredient.unit} {ingredient.name}
        </Typography>
      ))}
    </div>
  );
}
