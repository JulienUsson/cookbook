import React, { useState, useMemo } from "react";
import { Typography, IconButton, styled } from "@material-ui/core";
import { RecipeIngredient } from "../services/RecipeService";
import PlusIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";
import isNaN from "lodash/isNaN";

const ServingsSelector = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: 150
}));

const Unit = styled("span")({
  fontWeight: 500
});

interface Props {
  ingredients: RecipeIngredient[];
  servings: number;
}

function formatNumber(number: number): string {
  const str = number.toString();
  if (str.indexOf(".") !== -1) {
    return number.toFixed(2);
  }
  return str;
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
      <Typography variant="h6">Personnes :</Typography>
      <ServingsSelector>
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
        <Typography>{servings}</Typography>
        <IconButton aria-label="plus" onClick={() => setServings(servings + 1)}>
          <PlusIcon />
        </IconButton>
      </ServingsSelector>
      <Typography variant="h6">Ingrédients :</Typography>
      {ingredients.map((ingredient, index) => (
        <Typography key={index}>
          -{" "}
          {!isNaN(ingredient.quantity) && (
            <Unit>
              {formatNumber(ingredient.quantity)}
              {ingredient.unit}{" "}
            </Unit>
          )}
          {ingredient.name}
        </Typography>
      ))}
    </div>
  );
}
