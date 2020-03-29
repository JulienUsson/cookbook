import axios from "axios";

export interface GithubIssueLabel {
  name: string;
  color: string;
}

export interface GithubIssue {
  id: number;
  html_url: string;
  title: string;
  body: string;
  labels: GithubIssueLabel[];
}

const githubUser = process.env.REACT_APP_GITHUB_USER;
const githubRepository = process.env.REACT_APP_GITHUB_REPOSITORY;
const githubApi = axios.create({
  baseURL: "https://api.github.com/",
  timeout: 5000,
  validateStatus: status => status >= 200 && status < 400
});

export async function getOpenIssues(): Promise<GithubIssue[]> {
  const { data } = await githubApi.get<GithubIssue[]>(
    `/repos/${githubUser}/${githubRepository}/issues`,
    {
      params: {
        state: "open",
        sort: "created",
        direction: "asc"
      }
    }
  );
  return data;
}

export async function getLabels(): Promise<GithubIssueLabel[]> {
  const { data } = await githubApi.get<GithubIssueLabel[]>(
    `/repos/${githubUser}/${githubRepository}/labels`
  );
  return data;
}

export function getIssuesLink() {
  return `https://github.com/${githubUser}/${githubRepository}/issues`;
}
