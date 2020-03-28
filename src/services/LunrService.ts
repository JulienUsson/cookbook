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
    this.field("body");

    recipes.forEach(recipe => {
      this.add({
        id: recipe.id,
        name: recipe.name,
        body: recipe.issue.body
      });
    });
  });
}
