import React from "react";
import { Recipe } from "../services/RecipeService";
import { Typography, Card, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

interface Props {
  recipe: Recipe;
}

export default function RecipeDetails({ recipe }: Props) {
  return (
    <Card>
      <Typography variant="h2">{recipe.name}</Typography>

      <IconButton
        component="a"
        aria-label="edit"
        href={recipe.issueLink}
        target="_blank"
      >
        <EditIcon />
      </IconButton>
      {recipe.duration && <Typography>Durée: {recipe.duration}</Typography>}
      <Typography>Personnes: {recipe.servings}</Typography>
      <div>
        <Typography variant="h6">Ingrédients :</Typography>
        {recipe.ingredients.map((ingredient, index) => (
          <Typography key={index}>
            {ingredient.quantity}
            {ingredient.unit} {ingredient.name}
          </Typography>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: recipe.detailsHtml }} />
    </Card>
  );
}
