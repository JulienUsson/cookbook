import React, { useMemo } from "react";
import { Recipe, RecipeTag } from "../services/RecipeService";
import {
  Typography,
  IconButton,
  styled,
  Box,
  useTheme,
  useMediaQuery,
  Button,
  Theme,
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
  backgroundColor: "#FFFBFB",
  [theme.breakpoints.up("md")]: {
    height: "100vh",
    flexDirection: "row",
  },
}));

const LeftPanel = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(1),
    overflowY: "auto",
    backgroundColor: "#5D3352 ",
    color: theme.palette.common.white,
    "& *": {
      color: theme.palette.common.white,
    },
    boxShadow: theme.shadows[4],
    minWidth: 300,
    maxWidth: 300,
    marginRight: theme.spacing(2),
  },
}));

const LeftPanelContent = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    backgroundColor: "#5D3352",
    color: theme.palette.common.white,
    "& *": {
      color: theme.palette.common.white,
    },
    boxShadow: theme.shadows[4],
    padding: theme.spacing(2),
  },
  [theme.breakpoints.up("md")]: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(0, 4, 0, 2),
  },
}));

const Body = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflowY: "auto",
  textAlign: "justify",
  padding: theme.spacing(2),
}));

const TitleContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
}));

type ImageProps = { src: string };
const Image = styled(({ src, ...props }: ImageProps) => <div {...props} />)(
  ({ theme, src }: ImageProps & { theme: Theme }) => ({
    [theme.breakpoints.up("md")]: {
      height: 150,
    },
    height: 300,
    width: "100%",
    backgroundImage: `url(${src})`,
    backgroundPosition: "center",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  })
);

const TagsContainer = styled("div")(({ theme }) => ({
  "& > *": {
    marginRight: theme.spacing(1),
  },
}));

interface Props {
  recipes: Recipe[];
  tags: RecipeTag[];
}

export default function RecipeDetails({ recipes }: Props) {
  const { id: recipeId } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const recipe = useMemo(
    () => recipes.find((r) => r.id.toString() === recipeId),
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
          {!isMobile && (
            <Box display="flex" justifyContent="center" py={1}>
              {recipe.image && <Image src={recipe.image} />}
            </Box>
          )}
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

        {isMobile ? (
          <Box display="flex" justifyContent="center" py={1}>
            {recipe.image && <Image src={recipe.image} />}
          </Box>
        ) : (
          <Box pt={4} />
        )}

        <Typography dangerouslySetInnerHTML={{ __html: recipe.detailsHtml }} />

        {recipe.comments.length > 0 && (
          <Box pt={4}>
            {recipe.comments.map((comment) => (
              <Box pt={2} key={comment.body}>
                <Typography>
                  <Typography component="span" variant="h6">
                    {comment.user} :
                  </Typography>{" "}
                  {comment.body}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Body>
    </Root>
  );
}

function Title({ recipe }: { recipe: Recipe }) {
  return (
    <>
      <TitleContainer>
        <Typography variant="h2" align="left">
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
        {recipe.tags.map((tag) => (
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
