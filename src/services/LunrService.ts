import lunr from "lunr";
import { Recipe } from "./RecipeService";
require("lunr-languages/lunr.stemmer.support")(lunr);
require("lunr-languages/lunr.fr")(lunr);

export function getIndexFromRecipes(recipes: Recipe[]) {
  return lunr(function() {
    //@ts-ignore
    this.use(lunr.fr);
    this.ref("id");
    this.field("name");
    this.field("detailsMarkdown");

    recipes.forEach(recipe => {
      this.add(recipe);
    });
  });
}
