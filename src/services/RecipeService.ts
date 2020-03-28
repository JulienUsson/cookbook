import useSWR from "swr";
import showdown from "showdown";
import { GithubIssue, getOpenIssues } from "./GithubService";
import yaml from "js-yaml";

export interface RecipeIngredient {
  quantity: number;
  unit?: string;
  name: string;
}

export interface Recipe {
  id: number;
  name: string;
  image?: string;
  tags: string[];
  duration?: string;
  servings: number;
  ingredients: RecipeIngredient[];
  detailsHtml: string;
  issueLink: string;
  issue: GithubIssue;
}

export interface RecipeMetadata {
  image?: string;
  durée?: string;
  personnes?: number;
  ingrédients?: string[];
}

function strToIngredient(ingredient: string): RecipeIngredient | undefined {
  const regex = /^([0-9.]*)(\w*) (.*)$/gi;
  const args = regex.exec(ingredient);
  if (!args) {
    return undefined;
  }
  return {
    quantity: Number.parseFloat(args[1]),
    unit: args[2] || undefined,
    name: args[3]
  };
}

function issueToRecipe(issue: GithubIssue): Recipe {
  const converter = new showdown.Converter({ metadata: true });
  const detailsHtml = converter.makeHtml(issue.body);
  const rawMetadata = converter.getMetadata(true) as string;
  const metadata = yaml.safeLoad(rawMetadata) as RecipeMetadata;
  return {
    id: issue.id,
    name: issue.title,
    image: metadata.image,
    tags: issue.labels.map(l => l.name),
    duration: metadata.durée,
    servings: metadata.personnes || 1,
    ingredients: (metadata.ingrédients || [])
      .map(strToIngredient)
      .filter(x => x) as RecipeIngredient[],
    detailsHtml,
    issueLink: issue.html_url,
    issue
  };
}

export async function getRecipes(): Promise<Recipe[]> {
  const issues = await getOpenIssues();
  return issues.map(issueToRecipe);
}

export function useFindAllRecipes() {
  return useSWR("recipes", getRecipes);
}
