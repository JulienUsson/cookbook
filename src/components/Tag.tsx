import React from "react";
import { RecipeTag } from "../services/RecipeService";
import { Chip, ChipProps, useTheme } from "@material-ui/core";

interface Props extends RecipeTag, Omit<ChipProps, "label" | "color"> {}

export default function Tag({ name, color, ...props }: Props) {
  const theme = useTheme();
  return (
    <Chip
      label={name}
      style={{
        backgroundColor: color,
        color: theme.palette.getContrastText(color)
      }}
      variant="outlined"
      {...props}
    />
  );
}
