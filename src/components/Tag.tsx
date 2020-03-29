import React from "react";
import { RecipeTag } from "../services/RecipeService";
import {
  Chip,
  ChipProps,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core";

interface Props
  extends Omit<RecipeTag, "color">,
    Omit<ChipProps, "label" | "color" | "variant"> {
  color?: string;
  selected?: boolean;
}

export default function Tag({ name, color, selected, ...props }: Props) {
  const theme = createMuiTheme({
    palette: { primary: { main: color || "#fff" } }
  });
  return (
    <ThemeProvider theme={theme}>
      <Chip
        variant={selected ? "default" : "outlined"}
        color="primary"
        label={name}
        {...props}
      />
    </ThemeProvider>
  );
}
