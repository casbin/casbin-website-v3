import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
import { FeedbackBlock } from '@/components/feedback/client';
import { onBlockFeedbackAction } from '@/lib/github';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Tabs,
    Tab,
    TabItem: Tab, // For compatibility
    FeedbackBlock: (props) => (
      <FeedbackBlock {...props} onSendAction={onBlockFeedbackAction}>
        {props.children}
      </FeedbackBlock>
    ),
    ...components,
  };
}
