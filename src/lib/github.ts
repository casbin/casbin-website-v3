import { App, Octokit } from 'octokit';
import {
  blockFeedback,
  BlockFeedback,
  pageFeedback,
  type ActionResponse,
  type PageFeedback,
} from '@/components/feedback/schema';

export const repo = 'casbin-website-v3';
export const owner = 'casbin';
export const DocsCategory = 'Docs Feedback';

let instance: Octokit | undefined;

async function getOctokit(): Promise<Octokit | null> {
  if (instance) return instance;
  const appId = process.env.GITHUB_APP_ID;
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY;

  if (!appId || !privateKey) {
    console.warn('GitHub App credentials not configured - feedback will not be posted to GitHub');
    return null;
  }

  const app = new App({
    appId,
    privateKey,
  });

  const { data } = await app.octokit.request('GET /repos/{owner}/{repo}/installation', {
    owner,
    repo,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  instance = await app.getInstallationOctokit(data.id);
  return instance;
}

interface RepositoryInfo {
  id: string;
  discussionCategories: {
    nodes: {
      id: string;
      name: string;
    }[];
  };
}

let cachedDestination: RepositoryInfo | undefined;
async function getFeedbackDestination(): Promise<RepositoryInfo | null> {
  if (cachedDestination) return cachedDestination;
  const octokit = await getOctokit();
  if (!octokit) return null;

  try {
    const result = await octokit.graphql(
      `
      query ($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          id
          discussionCategories(first: 25) {
            nodes { id name }
          }
        }
      }
    `,
      { owner, repo },
    ) as { repository: RepositoryInfo };
  
    return (cachedDestination = result.repository);
  } catch (e) {
    console.warn('Failed to fetch GitHub Discussion categories:', e);
    return null;
  }
}

export async function onPageFeedbackAction(feedback: PageFeedback): Promise<ActionResponse> {
  'use server';
  feedback = pageFeedback.parse(feedback);
  return createDiscussionThread(
    feedback.url,
    `[${feedback.opinion}] ${feedback.message}\n\n> Forwarded from user feedback.`,
  );
}

export async function onBlockFeedbackAction(feedback: BlockFeedback): Promise<ActionResponse> {
  'use server';
  feedback = blockFeedback.parse(feedback);
  return createDiscussionThread(
    feedback.url,
    `> ${feedback.blockBody ?? feedback.blockId}\n\n${feedback.message}\n\n> Forwarded from user feedback.`,
  );
}

async function createDiscussionThread(pageId: string, body: string): Promise<ActionResponse> {
  const octokit = await getOctokit();
  if (!octokit) {
    return { githubUrl: undefined };
  }
  
  const destination = await getFeedbackDestination();
  if (!destination) {
    return { githubUrl: undefined };
  }
  const category = destination.discussionCategories.nodes.find(
    (category) => category.name === DocsCategory,
  );

  if (!category) {
    console.warn(`GitHub Discussion category "${DocsCategory}" not found - feedback will not be posted`);
    return { githubUrl: undefined };
  }

  const title = `Feedback for ${pageId}`;
  
  const searchQuery = `
    query ($query: String!, $first: Int!) {
      search(type: DISCUSSION, query: $query, first: $first) {
        nodes {
          ... on Discussion { id, url }
        }
      }
    }
  `;

  try {
    const searchVariables = {
      query: `${title} in:title repo:${owner}/${repo} author:@me`,
      first: 1,
    };

    const {
      search: {
        nodes: [discussion],
      },
    }: {
      search: {
        nodes: { id: string; url: string }[];
      };
    } = await octokit.graphql(searchQuery, searchVariables);

    if (discussion && discussion.id && discussion.url) {
      const addCommentMutation = `
        mutation ($input: AddDiscussionCommentInput!) {
          addDiscussionComment(input: $input) {
            comment { id, url }
          }
        }
      `;

      const addCommentVariables = {
        input: {
          body,
          discussionId: discussion.id,
        },
      };

      const result: {
        addDiscussionComment: {
          comment: { id: string; url: string };
        };
      } = await octokit.graphql(addCommentMutation, addCommentVariables);

      if (
        result &&
        result.addDiscussionComment &&
        result.addDiscussionComment.comment &&
        result.addDiscussionComment.comment.url
      ) {
        return {
          githubUrl: result.addDiscussionComment.comment.url,
        };
      }

      console.warn('GitHub addDiscussionComment response missing expected fields');
      return { githubUrl: undefined };
    } else {
      const createDiscussionMutation = `
        mutation ($input: CreateDiscussionInput!) {
          createDiscussion(input: $input) {
            discussion { id, url }
          }
        }
      `;

      const createDiscussionVariables = {
        input: {
          repositoryId: destination.id,
          categoryId: category.id,
          body,
          title,
        },
      };

      const result: {
        createDiscussion: {
          discussion: { id: string; url: string };
        };
      } = await octokit.graphql(createDiscussionMutation, createDiscussionVariables);

      if (
        result &&
        result.createDiscussion &&
        result.createDiscussion.discussion &&
        result.createDiscussion.discussion.url
      ) {
        return {
          githubUrl: result.createDiscussion.discussion.url,
        };
      }

      console.warn('GitHub createDiscussion response missing expected fields');
      return { githubUrl: undefined };
    }
  } catch (error: unknown) {
    const err = error as any;

    if (err && typeof err === 'object') {
      const status = err.status as number | undefined;
      if (status === 403 || status === 429) {
        console.warn(
          'GitHub API rate limit encountered while creating feedback discussion or comment',
        );
      } else {
        console.error(
          'Error while calling GitHub GraphQL API for feedback discussion',
          err,
        );
      }
    } else {
      console.error(
        'Unknown error while calling GitHub GraphQL API for feedback discussion',
        err,
      );
    }

    return { githubUrl: undefined };
  }
}
