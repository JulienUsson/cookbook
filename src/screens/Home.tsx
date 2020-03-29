import React, { useState, useMemo } from "react";
import { Recipe, RecipeTag } from "../services/RecipeService";
import {
  Fab,
  Card,
  Typography,
  CardMedia,
  styled,
  Paper,
  Link as MuiLink,
  Box
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { getIssuesLink } from "../services/GithubService";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.jpg";
import Tag from "../components/Tag";
import Search from "../components/Search";
import { getIndexFromRecipes } from "../services/LunrService";

const Root = styled("div")({
  minHeight: "100vh"
});

const Hero = styled("div")({
  backgroundImage: `url(${heroImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "50vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingBottom: "10vh",
  flexDirection: "column"
});

const HeroTitle = styled(props => (
  <Typography align="center" variant="h2" {...props} />
))(({ theme }) => ({
  color: theme.palette.common.white,
  textShadow: "1px 1px #000",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.only("xs")]: {
    fontSize: "2rem"
  }
}));

const RecipesContainer = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(0, 4),
  transform: "translateY(-10vh)",
  display: "grid",
  padding: theme.spacing(2),
  gridColumnGap: theme.spacing(2),
  gridRowGap: theme.spacing(2),
  gridAutoRows: "max-content",
  [theme.breakpoints.only("xs")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
    margin: theme.spacing(0),
    padding: theme.spacing(1),
    boxShadow: "none"
  },
  [theme.breakpoints.only("sm")]: {
    gridTemplateColumns: "repeat(3, 1fr)"
  },
  [theme.breakpoints.only("md")]: {
    gridTemplateColumns: "repeat(4, 1fr)"
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(5, 1fr)"
  }
}));

const NoRecipesFound = styled(Paper)(({ theme }) => ({
  minHeight: "20vh",
  margin: theme.spacing(0, 4),
  transform: "translateY(-10vh)",
  padding: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
}));

const CustomCardMedia = styled(CardMedia)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  [theme.breakpoints.only("xs")]: {
    height: 200
  },
  [theme.breakpoints.only("sm")]: {
    height: 200
  },
  [theme.breakpoints.only("md")]: {
    height: 200
  },
  [theme.breakpoints.up("lg")]: {
    height: 300
  }
}));

const TagsContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(1, 0),
  "& > *": {
    margin: theme.spacing(0, 1)
  }
}));

const AddFab = styled(props => (
  <Fab component="a" color="primary" {...props} />
))(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(2)
}));

interface Props {
  recipes: Recipe[];
  tags: RecipeTag[];
}

export default function Home({ recipes: recipesProps, tags }: Props) {
  const [searchString, setSearchString] = useState("");
  const [selectedTags, setSelectedTags] = useState<RecipeTag[]>([]);

  const recipes = useMemo(() => {
    if (!searchString && selectedTags.length === 0) {
      return recipesProps;
    }
    let filteredByTagRecipes: Recipe[] = recipesProps;

    if (selectedTags.length > 0) {
      filteredByTagRecipes = filteredByTagRecipes.filter(r =>
        r.tags.some(t => selectedTags.some(st => st.name === t.name))
      );
    }
    if (searchString) {
      const index = getIndexFromRecipes(recipesProps);
      const results = index.search(searchString);
      return results.map(
        res =>
          filteredByTagRecipes.find(
            recette => recette.id.toString() === res.ref
          )!
      );
    } else {
      return filteredByTagRecipes;
    }
  }, [recipesProps, searchString, selectedTags]);

  return (
    <Root>
      <Hero>
        <HeroTitle>{process.env.REACT_APP_TITLE}</HeroTitle>
        <Search
          tags={tags}
          onSearchChange={setSearchString}
          onTagsChange={setSelectedTags}
        />
      </Hero>
      {recipes.length > 0 ? (
        <RecipesContainer>
          {recipes.map(recipe => (
            <Link key={recipe.id} to={`/recettes/${recipe.id}`}>
              <Card variant="outlined">
                <CustomCardMedia image={recipe.image} />
                <Box m={1}>
                  <Typography variant="h5">{recipe.name}</Typography>
                </Box>
                <TagsContainer>
                  {recipe.tags.map(tag => (
                    <Tag
                      key={tag.name}
                      {...tag}
                      selected={selectedTags.some(
                        selectedTag => selectedTag.name === tag.name
                      )}
                      size="small"
                    />
                  ))}
                </TagsContainer>
              </Card>
            </Link>
          ))}
        </RecipesContainer>
      ) : (
        <NoRecipesFound>
          <Typography>Aucune recette trouvée.</Typography>
        </NoRecipesFound>
      )}
      <Box mb={4}>
        <Typography variant="h6" align="center">
          Fait avec amour par{" "}
          <MuiLink href="https://github.com/JulienUsson/">Julien Usson</MuiLink>
        </Typography>
      </Box>
      <AddFab aria-label="add" href={getIssuesLink()} target="_blank">
        <AddIcon />
      </AddFab>
    </Root>
  );
}
