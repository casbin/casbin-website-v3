import defaultMdxComponents from 'fumadocs-ui/mdx';
<<<<<<< HEAD
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
=======
>>>>>>> afa4ddb (Initial commit from Create Fumadocs App)
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
<<<<<<< HEAD
    Tabs,
    Tab,
    TabItem: Tab, // For compatibility
=======
>>>>>>> afa4ddb (Initial commit from Create Fumadocs App)
    ...components,
  };
}
