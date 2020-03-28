import useSWR from "swr";
import showdown from "showdown";
import { GithubIssue, getOpenIssues } from "./GithubService";

export interface Recipe {
  id: number;
  name: string;
  tags: string[];
  detailsHtml: string;
  issueLink: string;
  issue: GithubIssue;
}

const converter = new showdown.Converter({ metadata: true });

function issueToRecipe(issue: GithubIssue): Recipe {
  return {
    id: issue.id,
    name: issue.title,
    tags: issue.labels.map(l => l.name),
    detailsHtml: converter.makeHtml(issue.body),
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
