import React, { useState, useMemo } from "react";
import { Typography, IconButton } from "@material-ui/core";
import { RecipeIngredient } from "../services/RecipeService";
import PlusIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";

interface Props {
  ingredients: RecipeIngredient[];
  servings: number;
}

export default function Ingredients({
  ingredients: ingredientsProp,
  servings: servingsProp
}: Props) {
  const [servings, setServings] = useState<number>(servingsProp);
  const ingredients = useMemo(
    () =>
      ingredientsProp.map(i => ({
        ...i,
        quantity: (i.quantity * servings) / servingsProp
      })),
    [ingredientsProp, servings, servingsProp]
  );

  return (
    <div>
      <IconButton
        aria-label="minus"
        onClick={() => {
          if (servings > 1) {
            setServings(servings - 1);
          }
        }}
      >
        <MinusIcon />
      </IconButton>
      <Typography>Personnes: {servings}</Typography>
      <IconButton aria-label="plus" onClick={() => setServings(servings + 1)}>
        <PlusIcon />
      </IconButton>
      <Typography variant="h6">Ingrédients :</Typography>
      {ingredients.map((ingredient, index) => (
        <Typography key={index}>
          {ingredient.quantity}
          {ingredient.unit} {ingredient.name}
        </Typography>
      ))}
    </div>
  );
}
