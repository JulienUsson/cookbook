import axios from "axios";

interface StoredItem<T> {
  etag: string;
  items: T;
}

export interface GithubComment {
  issueId: number;
  issue_url: string;
  body: string;
  user: {
    login: string;
  };
}

export interface GithubIssueLabel {
  name: string;
  color: string;
}

export interface GithubIssue {
  id: number;
  html_url: string;
  title: string;
  body: string;
  number: number;
  labels: GithubIssueLabel[];
}

const githubUser = process.env.REACT_APP_GITHUB_USER;
const githubRepository = process.env.REACT_APP_GITHUB_REPOSITORY;
const githubApi = axios.create({
  baseURL: "https://api.github.com/",
  timeout: 5000,
  validateStatus: (status) => status >= 200 && status < 400,
});

function getIssueIdFromIssueUrl(issueUrl: string): number {
  const regex = /https:\/\/api.github.com\/repos\/.*\/.*\/issues\/([0-9]+)/;
  const issueId = Number.parseInt(regex.exec(issueUrl)![1]);
  return issueId;
}

export async function getComments(): Promise<GithubComment[]> {
  const localStorageContent = localStorage.getItem("comments");
  let storedIssues = undefined;
  if (localStorageContent) {
    storedIssues = JSON.parse(localStorageContent) as StoredItem<
      GithubComment[]
    >;
  }

  try {
    const { status, data, headers } = await githubApi.get<GithubComment[]>(
      `/repos/${githubUser}/${githubRepository}/issues/comments`,
      {
        headers: {
          "If-None-Match": storedIssues?.etag,
        },
      }
    );

    if (status === 304) {
      return storedIssues!.items;
    }
    const newStoredIssues: StoredItem<GithubComment[]> = {
      etag: headers["etag"],
      items: data.map((c) => ({
        ...c,
        issueId: getIssueIdFromIssueUrl(c.issue_url),
      })),
    };
    localStorage.setItem("comments", JSON.stringify(newStoredIssues));
    return newStoredIssues.items;
  } catch (e) {
    if (storedIssues) {
      return storedIssues.items;
    }
    throw e;
  }
}

export async function getOpenIssues(): Promise<GithubIssue[]> {
  const localStorageContent = localStorage.getItem("issues");
  let storedIssues = undefined;
  if (localStorageContent) {
    storedIssues = JSON.parse(localStorageContent) as StoredItem<GithubIssue[]>;
  }

  try {
    const { status, data, headers } = await githubApi.get<GithubIssue[]>(
      `/repos/${githubUser}/${githubRepository}/issues`,
      {
        headers: {
          "If-None-Match": storedIssues?.etag,
        },
        params: {
          state: "open",
          sort: "created",
          direction: "desc",
        },
      }
    );

    if (status === 304) {
      return storedIssues!.items;
    }
    const newStoredIssues: StoredItem<GithubIssue[]> = {
      etag: headers["etag"],
      items: data,
    };
    localStorage.setItem("issues", JSON.stringify(newStoredIssues));
    return data;
  } catch (e) {
    if (storedIssues) {
      return storedIssues.items;
    }
    throw e;
  }
}

export function getIssuesLink() {
  return `https://github.com/${githubUser}/${githubRepository}/issues`;
}
