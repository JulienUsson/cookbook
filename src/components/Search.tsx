import React from "react";
import { RecipeTag, Recipe } from "../services/RecipeService";
import Tag from "./Tag";
import { styled } from "@material-ui/core";

const Root = styled("div")({
  display: "flex",
  flexDirection: "column"
});

const TagsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  "& > *": {
    margin: theme.spacing(1, 1)
  }
}));

interface Props {
  recipes: Recipe[];
  tags: RecipeTag[];
}

export default function Search({ recipes, tags }: Props) {
  function handleTagClick(tag: RecipeTag) {}

  return (
    <Root>
      <TagsContainer>
        {tags.map(tag => (
          <Tag {...tag} onClick={() => handleTagClick(tag)} />
        ))}
      </TagsContainer>
    </Root>
  );
}
