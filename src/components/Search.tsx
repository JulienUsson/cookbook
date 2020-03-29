import React, { useState } from "react";
import { RecipeTag } from "../services/RecipeService";
import Tag from "./Tag";
import { styled, TextField } from "@material-ui/core";

const TagsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  margin: theme.spacing(2, 0),
  "& > *": {
    margin: 4
  }
}));

interface Props {
  tags: RecipeTag[];
  onTagsChange?: (tags: RecipeTag[]) => void;
  onSearchChange?: (searchStringselectedTags: string) => void;
}

export default function Search({ tags, onTagsChange, onSearchChange }: Props) {
  const [selectedTags, setSelectedTags] = useState<RecipeTag[]>([]);

  function handleTagSelected(tag: RecipeTag) {
    let newSelectedTags;
    if (selectedTags.includes(tag)) {
      newSelectedTags = selectedTags.filter(t => t.name !== tag.name);
    } else {
      newSelectedTags = [...selectedTags, tag];
    }

    setSelectedTags(newSelectedTags);
    onTagsChange?.(newSelectedTags);
  }

  return (
    <>
      <TextField
        label="Rechercher une recette"
        variant="outlined"
        onChange={e => onSearchChange?.(e.target.value)}
      />

      <TagsContainer>
        {tags.map(tag => {
          const isSelected = selectedTags.includes(tag);
          return (
            <Tag
              key={tag.name}
              name={tag.name}
              color={isSelected ? tag.color : undefined}
              selected={isSelected}
              onClick={() => handleTagSelected(tag)}
            />
          );
        })}
      </TagsContainer>
    </>
  );
}
