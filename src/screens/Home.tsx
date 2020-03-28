import React from "react";
import { Recipe } from "../services/RecipeService";
import {
  Fab,
  Card,
  CardContent,
  Typography,
  CardMedia,
  styled
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { getIssuesLink } from "../services/GithubService";
import { Link } from "react-router-dom";

const Container = styled("div")({
  position: "relative",
  height: "100%"
});

const CustomCardMedia = styled(CardMedia)({
  height: 300
});

const AddFab = styled(props => (
  <Fab component="a" color="primary" {...props} />
))(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(2),
  right: theme.spacing(2)
}));

interface Props {
  recipes: Recipe[];
}

export default function Home({ recipes }: Props) {
  return (
    <Container>
      {recipes.map(recipe => (
        <Link to={`/recettes/${recipe.id}`}>
          <Card>
            <CustomCardMedia image={recipe.image} />
            <CardContent>
              <Typography variant="body2" component="p">
                {recipe.name}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
      <AddFab aria-label="add" href={getIssuesLink()} target="_blank">
        <AddIcon />
      </AddFab>
    </Container>
  );
}
