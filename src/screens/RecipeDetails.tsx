import React, { useMemo } from "react";
import { Recipe, RecipeTag } from "../services/RecipeService";
import {
  Typography,
  IconButton,
  styled,
  Box,
  useTheme,
  useMediaQuery,
  Button
} from "@material-ui/core";
import Ingredients from "../components/Ingredients";
import EditIcon from "@material-ui/icons/Edit";
import { Redirect, useParams } from "react-router-dom";
import Tag from "../components/Tag";
import { Link } from "react-router-dom";
import BackIcon from "@material-ui/icons/ArrowBackIos";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("sm")]: {
    height: "100vh",
    flexDirection: "row"
  }
}));

const LeftPanel = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.only("xs")]: {
    margin: theme.spacing(0, 2)
  },
  [theme.breakpoints.up("sm")]: {
    width: 300,
    marginRight: theme.spacing(2)
  }
}));

const LeftPanelContent = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center"
  }
}));

const Body = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflowY: "auto",
  textAlign: "justify",
  padding: theme.spacing(2)
}));

const TitleContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row"
}));

const TagsContainer = styled("div")(({ theme }) => ({
  "& > *": {
    marginRight: theme.spacing(1)
  }
}));

interface Props {
  recipes: Recipe[];
  tags: RecipeTag[];
}

export default function RecipeDetails({ recipes }: Props) {
  const { id: recipeId } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));

  const recipe = useMemo(
    () => recipes.find(r => r.id.toString() === recipeId),
    [recipeId, recipes]
  );

  if (!recipe) {
    return <Redirect to="/" />;
  }

  return (
    <Root>
      {isMobile && (
        <Box p={2}>
          <BackToHome />
          <Title recipe={recipe} />
        </Box>
      )}
      <LeftPanel>
        {!isMobile && <BackToHome />}
        <LeftPanelContent>
          {recipe.duration && (
            <Typography variant="subtitle1">
              <Typography variant="h6" component="span">
                Durée :{" "}
              </Typography>
              {recipe.duration}
            </Typography>
          )}
          <Ingredients
            ingredients={recipe.ingredients}
            servings={recipe.servings}
          />
        </LeftPanelContent>
      </LeftPanel>

      <Body>
        {!isMobile && <Title recipe={recipe} />}
        <Typography dangerouslySetInnerHTML={{ __html: recipe.detailsHtml }} />
      </Body>
    </Root>
  );
}

function Title({ recipe }: { recipe: Recipe }) {
  return (
    <>
      <TitleContainer>
        <Typography variant="h2" noWrap>
          {recipe.name}
        </Typography>
        <Box flexGrow={1} />
        <div>
          <IconButton
            component="a"
            aria-label="edit"
            href={recipe.issueLink}
            target="_blank"
          >
            <EditIcon />
          </IconButton>
        </div>
      </TitleContainer>
      <TagsContainer>
        {recipe.tags.map(tag => (
          <Tag key={tag.name} {...tag} selected />
        ))}
      </TagsContainer>
    </>
  );
}

function BackToHome() {
  return (
    <Link to="/">
      <Button startIcon={<BackIcon />}>Retour</Button>
    </Link>
  );
}
