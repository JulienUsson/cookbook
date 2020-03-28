import React, { useMemo } from "react";
import { Recipe } from "../services/RecipeService";
import { Card, Typography, IconButton } from "@material-ui/core";
import Ingredients from "../components/Ingredients";
import EditIcon from "@material-ui/icons/Edit";
import { Redirect, useParams } from "react-router-dom";

interface Props {
  recipes: Recipe[];
}

export default function RecipeDetails({ recipes }: Props) {
  const { id: recipeId } = useParams();
  const recipe = useMemo(
    () => recipes.find(r => r.id.toString() === recipeId),
    [recipeId, recipes]
  );

  if (!recipe) {
    return <Redirect to="/" />;
  }

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
      <Ingredients
        ingredients={recipe.ingredients}
        servings={recipe.servings}
      />
      <div dangerouslySetInnerHTML={{ __html: recipe.detailsHtml }} />
    </Card>
  );
}
