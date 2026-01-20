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
    const result = await octokit.graphql(`
    query {
      repository(owner: "${owner}", name: "${repo}") {
        id
        discussionCategories(first: 25) {
          nodes { id name }
        }
      }
    }
  `) as { repository: RepositoryInfo };
  
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
  
  // TODO: Add error handling for GitHub API responses
  // - Handle rate limiting (HTTP 403/429)
  // - Handle network timeouts
  // - Handle unexpected response formats
  // - Handle missing fields in response
  
  const {
    search: {
      nodes: [discussion],
    },
  }: {
    search: {
      nodes: { id: string; url: string }[];
    };
  } = await octokit.graphql(`
          query {
            search(type: DISCUSSION, query: ${JSON.stringify(`${title} in:title repo:${owner}/${repo} author:@me`)}, first: 1) {
              nodes {
                ... on Discussion { id, url }
              }
            }
          }`);

  if (discussion) {
    // TODO: Add try-catch for mutation errors
    // - Handle API rate limiting
    // - Handle authentication failures
    // - Log errors for debugging
    
    const result: {
      addDiscussionComment: {
        comment: { id: string; url: string };
      };
    } = await octokit.graphql(`
            mutation {
              addDiscussionComment(input: { body: ${JSON.stringify(body)}, discussionId: "${discussion.id}" }) {
                comment { id, url }
              }
            }`);

    return {
      githubUrl: result.addDiscussionComment.comment.url,
    };
  } else {
    const result: {
      discussion: { id: string; url: string };
    } = await octokit.graphql(`
            mutation {
              createDiscussion(input: { repositoryId: "${destination.id}", categoryId: "${category.id}", body: ${JSON.stringify(body)}, title: ${JSON.stringify(title)} }) {
                discussion { id, url }
              }
            }`);

    return {
      githubUrl: result.discussion.url,
    };
  }
}
